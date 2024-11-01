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

grocery_items:
* name: VARCHAR(30)

shopping_list:
* user_id: PRIMARY KEY
* grocery_item_id: INTEGER NOT NULL

users:
* id INTEGER PRIMARY KEY
* shopping_list_id: INTEGER

## **Hosting**
We have two options: Amazon Web Services (AWS) or the CS Club's servers,
provided to its members for free.