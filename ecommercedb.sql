USE aking_cs355fa21;

DROP TABLE IF EXISTS Customer_Emails;
DROP TABLE IF EXISTS Cart_Product;
DROP TABLE IF EXISTS Product;
DROP TABLE IF EXISTS Customer_Orders;
DROP TABLE IF EXISTS Orders;
DROP TABLE IF EXISTS Cart;
DROP TABLE IF EXISTS Customer;


create table Customer
    (id            varchar(20),
     _password   varchar(32) NOT NULL,
     primary key(id)
     );
     
create table Cart
( id  varchar (20) UNIQUE,
  customer_id  varchar(20),
 primary key (id, customer_id),
 foreign key (customer_id) references Customer (id) on delete cascade
);

create table Orders
    (cart_id  varchar(20) UNIQUE,
     customer_id  varchar(20),
     id  varchar(20) UNIQUE,
     primary key (id, cart_id, customer_id),
     foreign key (cart_id) references Cart (id) on delete cascade,
     foreign key (customer_id) references Customer (id) on delete cascade
     ); 

create table Customer_Orders
    (customer_id varchar(20),
     order_id varchar (20) UNIQUE,
     _time TIMESTAMP,
     primary key (customer_id, order_id),
     foreign key (customer_id) references Customer (id) on delete cascade,
     foreign key (order_id) references Orders (id) on delete cascade
    );

create table Product
    (id varchar(20),
      description text(100),
       price decimal(13,2),
      primary key (id)
    );

create table Cart_Product
(
  cart_id varchar(20),
  product_id varchar(20),
  quantity int(3),
  primary key (cart_id, product_id),
  foreign key (cart_id) references Cart (id) on delete cascade,
  foreign key (product_id) references Product (id) on delete cascade

);

create table Customer_Emails
    (customer_id varchar(20),
     emails varchar(254),
       primary key (customer_id, emails),
       foreign key (customer_id) references Customer (id) on delete cascade
    );

insert into Customer values 
    ('User 1', 'pasword1'), 
    ('User 2', 'pasword2'),
    ('User 3', 'pasword3'),
    ('User 4', 'pasword4'),
    ('User 5', 'pasword5'),
    ('User 6', 'pasword6'),
    ('User 7', 'pasword7');
    
insert into Cart values 
    ('Cart 1', 'User 1'), 
    ('Cart 2', 'User 2'),
    ('Cart 3', 'User 3'),
    ('Cart 4', 'User 3'),
    ('Cart 5', 'User 4'),
    ('Cart 6', 'User 5'),
    ('Cart 7', 'User 6');
    
insert into Orders values 
    ('Cart 1', 'User 1', 'Order 1'), 
    ('Cart 2', 'User 2', 'Order 2'),
    ('Cart 3', 'User 3', 'Order 3'),
    ('Cart 4', 'User 3', 'Order 4'),
    ('Cart 5', 'User 4', 'Order 5');
    
insert into Customer_Orders values 
    ('User 1', 'Order 1', '2021-10-22 9:58:07'), 
    ('User 2', 'Order 2', '2021-10-22 9:01:07'),
    ('User 3', 'Order 3', '2021-12-25 10:56:45'),
    ('User 3', 'Order 4', '2021-11-21 01:04:45'),
    ('User 4', 'Order 5', '2021-10-22 09:21:50');
    
 insert into Product values 
    ('Product 1', 'Silk Shirt', 22.50), 
    ('Product 2', 'Mini Dress', 32.99),
    ('Product 3', 'Sandals', 12.99),
    ('Product 4', 'Vintage 70s Checkered Pants', 100.00),
    ('Product 5', 'Hot Pink Face Mask', 17.99),
    ('Product 6', 'Wrist Band', 5.99),
    ('Product 7', 'Necklace', 2.99),
    ('Product 8', 'Hat', 9.99);

insert into Cart_Product values 
    ('Cart 1', 'Product 1', 2), 
    ('Cart 1', 'Product 2', 1),
    ('Cart 1', 'Product 3', 2),
    ('Cart 2', 'Product 4', 1),
    ('Cart 3', 'Product 6', 1),
    ('Cart 4', 'Product 5', 3),
    ('Cart 5', 'Product 7', 1);
    
insert into Customer_Emails values    
    ('User 1', 'user1A@email.com'),
    ('User 1', 'user1B@email.com'), 
    ('User 2', 'user2@email.com'),
    ('User 3', 'user3B@email.com'), 
    ('User 4', 'user4B@email.com'), 
    ('User 5', 'user5B@email.com'), 
    ('User 6', 'user6B@email.com'),
    ('User 7', 'user7B@email.com');
    
    DELIMITER //
CREATE OR REPLACE FUNCTION fn_productTotal
(
      quantity int, 
     price decimal(13,2)
)
RETURNS decimal(13,2)
BEGIN
    DECLARE total decimal(13,2);

    SET total = quantity*price;

    RETURN total;
END; //
DELIMITER ;
    
   CREATE OR REPLACE VIEW Product_Total AS
SELECT customer_id, Cart_Product.cart_id, description, quantity,
price, fn_productTotal(quantity, price) AS total FROM Product 
JOIN Cart_Product ON Product.id = Cart_Product.product_id
JOIN Orders on Cart_Product.cart_id = Orders.cart_id ORDER BY cart_id;

CREATE OR REPLACE VIEW Cart_Total AS
SELECT customer_id, cart_id, SUM(total) AS cart_total 
FROM Product_Total 
GROUP BY customer_id, cart_id;

DELIMITER //
CREATE OR REPLACE PROCEDURE total (IN customer varchar(20)) 
BEGIN
    SELECT SUM(cart_total) AS total_spent
    FROM Cart_Total
    WHERE customer = Cart_Total.customer_id;
END; //
DELIMITER ;