# ShopSmart

A shopping app that finds the best store locations to buy groceries and the
optimial path to take based on price and convenience.

# Technology Stack

## **Frontend**

This is a mobile app, built with React Native with Expo. We use
[React Native Paper](https://reactnativepaper.com/) as the UI library.

## **Backend**

Express.js with REST API.
We can use Python for web scraping.

## **Database**

MySQL

**Database schema:**

grocery_items (grocery items within a store):

-   name: VARCHAR(30)

stores:

-   id INT PRIMARY KEY
-   name VARCHAR(30)
-   logo TEXT // URL to the logo of the store
-   latitude FLOAT
-   longitude FLOAT

products:

-   id INT PRIMARY KEY
-   name VARCHAR(30)
-   price DECIMAL(6, 2)
-   image TEXT // URL to the product's image

stores_products:

-   store_id INT
-   product_id INT
-   PRIMARY KEY (store_id, product_id)
-   FOREIGN KEY (store_id) REFERENCES stores(store_id)
-   FOREIGN KEY (product_id) REFERENCES products(product_id)

shopping_list:

-   user_id: PRIMARY KEY
-   grocery_item_id: INTEGER NOT NULL

users:

-   id INTEGER PRIMARY KEY
-   shopping_list_id: INTEGER

## **Hosting**

We have two options: Amazon Web Services (AWS) or the CS Club's servers,
provided to its members for free.
