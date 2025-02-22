from concurrent.futures import ThreadPoolExecutor, as_completed
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
from selenium.common.exceptions import TimeoutException, NoSuchElementException, StaleElementReferenceException
import random
import time
import pandas as pd

USER_AGENTS = [
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:89.0) Gecko/20100101 Firefox/89.0",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Safari/605.1.15"
]

def get_driver():
    """Configure Chrome driver with anti-detection measures"""
    chrome_options = Options()
    chrome_options.add_argument("--headless=new")
    chrome_options.add_argument("--disable-gpu")
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    chrome_options.add_argument(f"user-agent={random.choice(USER_AGENTS)}")
    chrome_options.add_argument("--disable-blink-features=AutomationControlled")
    chrome_options.add_experimental_option("excludeSwitches", ["enable-automation"])
    chrome_options.add_experimental_option("useAutomationExtension", False)
    
    driver = webdriver.Chrome(options=chrome_options)
    driver.set_page_load_timeout(30)
    return driver

def scrape_page(page):
    """Scrape products using div.css-qoklea containers with enhanced stability"""
    driver = get_driver()
    try:
        # Randomized browsing pattern
        time.sleep(random.uniform(0.7, 1.5))
        driver.get(f"https://www.nofrills.ca/en/food/c/27985/?page={page}")

        # Handle cookie popup
        try:
            WebDriverWait(driver, 3).until(
                EC.element_to_be_clickable((By.ID, "onetrust-accept-btn-handler"))
            ).click()
            time.sleep(0.3)
        except (TimeoutException, NoSuchElementException):
            pass

        # Wait for product containers with retry logic
        WebDriverWait(driver, 15).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, "div.css-qoklea"))
        )

        # Scroll to ensure all products load
        last_height = driver.execute_script("return document.body.scrollHeight")
        for _ in range(2):
            driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
            time.sleep(random.uniform(0.5, 1.2))
            new_height = driver.execute_script("return document.body.scrollHeight")
            if new_height == last_height:
                break
            last_height = new_height

        products = []
        product_containers = driver.find_elements(By.CSS_SELECTOR, "div.css-qoklea")
        
        # Process containers with index-based access
        for idx in range(len(product_containers)):
            retries = 0
            while retries < 2:
                try:
                    # Refresh elements to prevent staleness
                    container = driver.find_elements(By.CSS_SELECTOR, "div.css-qoklea")[idx]
                    
                    # Extract product name
                    name = container.find_element(By.CSS_SELECTOR, 'h3[data-testid="product-title"]').text.strip()
                    
                    # Price extraction with fallback
                    price_selector = 'span[data-testid="regular-price"], span[data-testid="sale-price"]'
                    price_elements = container.find_elements(By.CSS_SELECTOR, price_selector)
                    
                    if price_elements:
                        price = price_elements[0].text.strip()
                        price_type = 'sale' if 'sale-price' in price_elements[0].get_attribute("data-testid") else 'regular'
                    else:
                        price = None
                        price_type = None

                    products.append({
                        'name': name,
                        'price': price,
                        'price_type': price_type,
                        'page': page
                    })
                    break
                    
                except StaleElementReferenceException:
                    print(f"Stale element at index {idx}, retrying...")
                    retries += 1
                    time.sleep(0.3)
                    product_containers = driver.find_elements(By.CSS_SELECTOR, "div.css-qoklea")
                except NoSuchElementException as e:
                    print(f"Missing element in container {idx}: {str(e)[:50]}")
                    break

        return {"page": page, "products": products, "status": "success"}

    except Exception as e:
        return {"page": page, "products": [], "status": str(e)}
    finally:
        driver.quit()

def main():
    total_pages = 209
    workers = 3  # Reduced for stability
    
    print(f"Scraping {total_pages} pages with {workers} workers...")
    all_products = []
    
    with ThreadPoolExecutor(max_workers=workers) as executor:
        futures = {executor.submit(scrape_page, p): p for p in range(1, total_pages+1)}
        
        for future in as_completed(futures):
            result = future.result()
            if result["status"] == "success":
                all_products.extend(result["products"])
                print(f"Page {result['page']}: {len(result['products'])} products")
            else:
                print(f"Page {result['page']} failed: {result['status'][:50]}...")

    df = pd.DataFrame(all_products)
    df.to_csv("no_frills.csv", index=False)
    print(f"\nTotal products collected: {len(df)}")

if __name__ == "__main__":
    start_time = time.time()
    main()
    print(f"Execution time: {time.time() - start_time:.2f}s")