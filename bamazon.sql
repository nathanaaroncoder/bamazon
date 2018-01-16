DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
  id INTEGER(10) AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  stock_quantity INTEGER(10) NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Yoga Mat", "Health & Fitness", 20.00, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Water Bottle", "Health & Fitness", 14.99, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("iPhone Charge", "Electronics", 20.00, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Micro USB Cable", "Electronics", 14.99, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("MacBook Charger", "Electronics", 80.00, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Earbuds", "Electronics", 40.00, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Yoga Towel", "Health & Fitness", 14.99, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("iPhone X", "Electronics", 1000.00, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("MacBook Shell", "Electronics", 34.99, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Yoga Shorts", "Health & Fitness", 45.00, 20);

