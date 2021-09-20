/*

## Step 1: Scaffold Application

## For a node project with a an express server, mysql db, and sequelize, here is a good base project map:

* Setup git repo and clone to local machine
    * include .gitignore and README.md
* Pseudo-code neccessary objects and routes
* Setup server and required npm modules
    * run: npm init --y
    * run: npm install express mysql2 sequelize dotenv
    * run: npm install jest --save-dev ** IF TESTING **
    * update package.json file to use/start server.js ** and jest for testing **
    * create server.js file
        * require express, routes, and sequelize
        * setup neccessary middleware
        * setup sequelize db connection
* Create '.env' file for vars: DB_NAME, DB_USER, DB_PW
* Setup mysql database with sequelize
    * create 'config' folder and setup sequeilize in connection.js
    * create 'db' folder and insert schema.sql
* Start MySQL and source db/schema.sql

## For this specific project, here is a good project map:

* Create 'models' folder and insert files and sequelize initialization
    * Category: id, category_name
    * Product: id, product_name, price, stock, category_id
    * Tag: id, tag_name
    * ProductTag: id, product_id, tag_id
    * Create index.js file and define all associations
* Create and seed db for development and testing
    * run: npm run seed
* Create 'routes' folder with an 'api' folder containing each model:
    * files: category-routes.js, product-routes.js, tag-routes.js, product-tag-routes.js
    * require api routes in index.js
    * define CRUD routes in each controller file: create, findAll, findOne, update, destroy
* Setup folders and files in Insomnia for testing and walk-through video

## User Story
AS A manager at an internet retail company
I WANT a back end for my e-commerce website that uses the latest technologies
SO THAT my company can compete with other e-commerce companies

## Reqs
* = complete

GIVEN a functional Express.js API
* WHEN I add my database name, MySQL username, and MySQL password to an environment variable file
* THEN I am able to connect to a database using Sequelize

* WHEN I enter schema and seed commands
* THEN a development database is created and is seeded with test data

* WHEN I enter the command to invoke the application
* THEN my server is started and the Sequelize models are synced to the MySQL database

* WHEN I open API GET routes in Insomnia Core for categories, products, or tags
* THEN the data for each of these routes is displayed in a formatted JSON

* WHEN I test API POST, PUT, and DELETE routes in Insomnia Core
* THEN I am able to successfully create, update, and delete data in my database

## Modules
mysql2
sequelize
dotenv

## Models
* Category
   * id              Integer    Doesn't allow null values   Set as primary key  Uses auto increment 
   * category_name   String     Doesn't allow null values
* Product
   * id              Integer    Doesn't allow null values   Set as primary key  Uses auto increment
   * product_name    String     Doesn't allow null values
   * price           Decimal    Doesn't allow null values   Validates that the value is a decimal
   * stock           Integer    Doesn't allow null values   Set a default value of 10   Validates that the value is numeric
   * category_id     Integer    References the category model's id
* Tag
   * id              Integer    Doesn't allow null values   Set as primary key  Uses auto increment
   * tag_name        String
* ProductTag
   * id              Integer    Doesn't allow null values   Set as primary key  Uses auto increment 
   * product_id      Integer    References the product model's id
   * tag_id          Integer    References the tag model's id

## Associations
* Product belongs to Category, as a category can have multiple products but a 
    product can only belong to one category.
* Category has many Product models.
* Product belongs to many Tag models. Using the ProductTag through model, allow
    products to have multiple tags and tags to have many products.
* Tag belongs to many Product models.

## Notes
* Fill out the unfinished routes in product-routes.js, tag-routes.js, and 
    category-routes.js to perform create, read, update, and delete operations 
    using your Sequelize models.
* After creating the models and routes, run npm run seed to seed data to 
    your database so that you can test your routes.
* Create the code needed in server.js to sync the Sequelize models to the MySQL 
    database on server start.


*/