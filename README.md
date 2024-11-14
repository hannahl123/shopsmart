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

We will use MySQL.

**Database schema:**

### `stores`:

```
* id INT PRIMARY KEY
* name VARCHAR(30)
* logo TEXT // URL to the logo of the store
* latitude FLOAT
* longitude FLOAT
```

### `product_catalog`:

The list of **all possible items** that a grocery store can sell.

```
* id INT PRIMARY KEY
* name VARCHAR(30)
* image TEXT // URL to the product's image
```

### `products`:

The items that stores are **actively selling.** Each item must be an item from `product_catalog`.

```
* store_id INT NOT NULL
* product_catalog_id INT NOT NULL
* PRIMARY KEY (store_id, product_catalog_id)
* price FLOAT NOT NULL
```

### `shopping_list`:

```
* user_id: PRIMARY KEY
* grocery_item_id: INTEGER NOT NULL
```

### `users`:

```
* id INTEGER PRIMARY KEY
* shopping_list_id: INTEGER
```

## **Hosting**

We have two options: Amazon Web Services (AWS) or the CS Club's servers,
provided to its members for free.
