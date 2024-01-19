CREATE DATABASE IF NOT EXISTS thecannon;

USE thecannon;

CREATE TABLE IF NOT EXISTS users (
  id_user INT(11) NOT NULL AUTO_INCREMENT,
  user_name VARCHAR(25) DEFAULT NULL,
  last_name VARCHAR(25) DEFAULT NULL,
  email VARCHAR(80) UNIQUE NOT NULL,
  pass VARCHAR(100) NOT NULL,
  is_admin TINYINT(1) DEFAULT 0,
  active TINYINT(1) DEFAULT 0,
  PRIMARY KEY (id_user)
);

INSERT INTO users VALUES 
 (1, 'Mario', 'Puebla', 'mario@mail.com', '13035474',1 , 1),
 (2, 'Joaco', 'Puebla', 'joaco@mail.com', '123456',0 , 1),
 (3, 'Javier', 'Sola', 'javier@mail.com', '987654',0 , 1),
 (4, 'Alberto', 'Delpir', 'ardelpir@mail.com', '123456',0 , 1);

DESCRIBE users;

CREATE TABLE IF NOT EXISTS products (
  id_prod INT(11) NOT NULL AUTO_INCREMENT,
  barcode VARCHAR(20) DEFAULT NULL,
  prod_name VARCHAR(50) DEFAULT NULL,
  measures VARCHAR(40) DEFAULT NULL,
  prod_type VARCHAR(40) DEFAULT NULL,
  id_categ INT(11) NOT NULL DEFAULT 1,
  detail TEXT DEFAULT NULL,
  url_img1 VARCHAR(150) DEFAULT NULL,
  url_img2 VARCHAR(150) DEFAULT NULL,
  url_img3 VARCHAR(150) DEFAULT NULL,
  url_img4 VARCHAR(150) DEFAULT NULL,
  url_img5 VARCHAR(150) DEFAULT NULL,
  price FLOAT DEFAULT 0,
  destacade TINYINT(1) DEFAULT 0,
  active TINYINT(1) DEFAULT 1,
  PRIMARY KEY (id_prod)
);

DESCRIBE products;

CREATE TABLE IF NOT EXISTS categories (
  id_categ INT(11) NOT NULL AUTO_INCREMENT,
  categ_name VARCHAR(40) NOT NULL,
  url_img VARCHAR(150) DEFAULT NULL,
  PRIMARY KEY (id_categ)
);

INSERT INTO categories VALUES 
  (1, 'Carpeta Magnética', ''),
  (2, 'Carpeta Magnética Profesional', ''),
  (3, 'Tablero Magnético', ''),
  (4, 'Pizarrón Magnético', '');

DESCRIBE categories;

CREATE TABLE IF NOT EXISTS promos (
  id_promo INTEGER(11) NOT NULL AUTO_INCREMENT,
  first_date DATE DEFAULT NULL,
  last_date DATE DEFAULT NULL,
  url_img VARCHAR(150) NOT NULL,
  title VARCHAR(80) DEFAULT NULL,
  sub_title VARCHAR(90) DEFAULT NULL,
  position TINYINT DEFAULT 1,
  active TINYINT(1) DEFAULT 1,
  PRIMARY KEY (id_promo)
);

DESCRIBE promos;

