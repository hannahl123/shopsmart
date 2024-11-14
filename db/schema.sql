-- Grocery store company
CREATE TABLE franchise (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    logo TEXT -- URL to the logo of the franchise
);

-- Individual stores of a franchise
CREATE TABLE stores (
    id INT PRIMARY KEY AUTO_INCREMENT,
    franchise_id INT NOT NULL,
    latitude FLOAT NOT NULL,
    longitude FLOAT NOT NULL,
    FOREIGN KEY (franchise_id) REFERENCES franchise(id) ON DELETE CASCADE
);

-- Product catalog table remains the same
CREATE TABLE product_catalog (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    image TEXT -- URL to the product's image
);

-- Products table references both stores and product_catalog
CREATE TABLE products (
    store_id INT NOT NULL,
    product_catalog_id INT NOT NULL,
    price FLOAT NOT NULL,
    PRIMARY KEY (store_id, product_catalog_id),
    FOREIGN KEY (store_id) REFERENCES stores(id) ON DELETE CASCADE,
    FOREIGN KEY (product_catalog_id) REFERENCES product_catalog(id) ON DELETE CASCADE
);

-- Shopping list table remains the same structure
CREATE TABLE shopping_list (
    user_id INT NOT NULL,
    grocery_item_id INT NOT NULL,
    PRIMARY KEY (user_id, grocery_item_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (grocery_item_id) REFERENCES product_catalog(id) ON DELETE CASCADE
);

-- Users table remains the same structure
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    shopping_list_id INT NOT NULL,
    FOREIGN KEY (shopping_list_id) REFERENCES shopping_list(user_id) ON DELETE SET NULL
);
