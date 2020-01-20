CREATE DATABASE IF NOT EXISTS twe DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;

USE twe;

CREATE TABLE IF NOT EXISTS accounts (
  id int NOT NULL AUTO_INCREMENT,
  username varchar(50) NOT NULL,
  password varchar(255) NOT NULL,
  email varchar(100) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB CHARSET=utf8;

CREATE TABLE IF NOT EXISTS maps (
    id int NOT NULL AUTO_INCREMENT,
    id_account int NOT NULL,
    filepath varchar(50) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (id_account) REFERENCES accounts(id)
) ENGINE = InnoDB CHARSET=utf8;