<<<<<<< Updated upstream
-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE account (
	accountid    CHARACTER VARYING NOT NULL,
	firstname    CHARACTER VARYING NOT NULL,
	lastname     CHARACTER VARYING NOT NULL,
	email        CHARACTER VARYING NOT NULL UNIQUE,
	password     CHARACTER VARYING NOT NULL,
	salt         CHARACTER VARYING,
	registerdate DATE              NOT NULL DEFAULT CURRENT_DATE,
	logintime    TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT account_pkey PRIMARY KEY (accountid)
);

CREATE TABLE combo (
	comboid CHARACTER VARYING NOT NULL,
	price   NUMERIC           NOT NULL,
	CONSTRAINT combo_pkey PRIMARY KEY (comboid)
);

CREATE TABLE image (
	imageid CHARACTER VARYING NOT NULL,
	source  CHARACTER VARYING NOT NULL,
	SKU     CHARACTER VARYING NOT NULL,
	CONSTRAINT image_pkey PRIMARY KEY (imageid),
	CONSTRAINT image_SKU_fkey FOREIGN KEY (SKU) REFERENCES product (sku)
);

CREATE TABLE manage (
	manageid     CHARACTER VARYING NOT NULL,
	managetime   DATE              NOT NULL DEFAULT CURRENT_DATE,
	manageaction CHARACTER VARYING NOT NULL,
	accountid    CHARACTER VARYING NOT NULL,
	sku          CHARACTER VARYING NOT NULL,
	CONSTRAINT manage_pkey PRIMARY KEY (manageid),
	CONSTRAINT manage_accountid_fkey FOREIGN KEY (accountid) REFERENCES account (accountid),
	CONSTRAINT manage_sku_fkey FOREIGN KEY (sku) REFERENCES product (sku)
);

CREATE TABLE product (
	sku               CHARACTER VARYING NOT NULL,
	series            CHARACTER VARYING NOT NULL,
	description       CHARACTER VARYING NOT NULL,
	price             NUMERIC           NOT NULL,
	type USER-DEFINED NOT NULL,
	sensor            CHARACTER VARYING,
	switchtype        CHARACTER VARYING,
	switch            CHARACTER VARYING,
	version           CHARACTER VARYING,
	layoutversion     CHARACTER VARYING,
	discountavailable boolean           NOT NULL,
	newarrival        boolean           NOT NULL,
	rating            NUMERIC           NOT NULL,
	comboid           CHARACTER VARYING,
	CONSTRAINT product_pkey PRIMARY KEY (sku),
	CONSTRAINT product_comboid_fkey FOREIGN KEY (comboid) REFERENCES combo (comboid)
);

CREATE TABLE stocks(
	stockid CHARACTER VARYING NOT NULL,
	color   CHARACTER VARYING NOT NULL,
	amount  INTEGER           NOT NULL,
	sku     CHARACTER VARYING NOT NULL,
	CONSTRAINT stocks_pkey PRIMARY KEY (stockid),
	CONSTRAINT stocks_sku_fkey FOREIGN KEY (sku) REFERENCES product (sku)
);
=======
DROP DATABASE IF EXISTS `Keychrome`;

CREATE DATABASE `Keychrome`;

USE `Keychrome`;

DROP TABLE IF EXISTS Account;
DROP TABLE IF EXISTS Combo;
DROP TABLE IF EXISTS Image;
DROP TABLE IF EXISTS Manage;
DROP TABLE IF EXISTS Product;
DROP TABLE IF EXISTS Stocks;

CREATE TABLE
    `Account` (
    AccountID    VARCHAR(15) NOT NULL,
    FirstName    VARCHAR(50) NOT NULL,
    LastName     VARCHAR(50) NOT NULL,
    Email        VARCHAR(50) NOT NULL,
    Password     VARCHAR(16) NOT NULL,
    Salt         VARCHAR(15) GENERATED ALWAYS AS (AccountID),
    RegisterDate DATE        NOT NULL,
    LoginTime    DATETIME    NOT NULL,
    PRIMARY KEY (AccountID)
);

CREATE TABLE
    `Combo` (
    ComboID VARCHAR(15)   NOT NULL,
    Price   DECIMAL(7, 2) NOT NULL,
    PRIMARY KEY (ComboID)
);

CREATE TABLE
    `Image` (
    ImageID VARCHAR(15) NOT NULL,
    Source  VARCHAR(50) NOT NULL,
    PRIMARY KEY (ImageID)
);

CREATE TABLE
    `Stocks` (
    StockID VARCHAR(15) NOT NULL,
    Color   VARCHAR(15) NOT NULL,
    Amount  INT         NOT NULL,
    PRIMARY KEY (StockID)
);

CREATE TABLE
    `Product` (
    SKU               VARCHAR(20)   NOT NULL,
    Series            VARCHAR(15)   NOT NULL,
    Description       VARCHAR(500)  NOT NULL,
    Price             DECIMAL(7, 2) NOT NULL,
    Type              ENUM (
        'Custom Keyboards',
        'Keycaps',
        'Mice',
        'Slim Keyboards',
        'Switches',
        'Wired Keyboards',
        'Wireless Keyboards',
        'Z-Others'
        )                           NOT NULL,
    Sensor            VARCHAR(20),
    SwitchType        VARCHAR(20),
    Switch            VARCHAR(20),
    Version           VARCHAR(20),
    LayoutVersion     VARCHAR(20),
    DiscountAvailable BOOLEAN       NOT NULL,
    NewArrival        BOOLEAN       NOT NULL,
    Rating            DECIMAL(2, 1) NOT NULL,
    ComboID           VARCHAR(15),
    ImageID           VARCHAR(15),
    StockID           VARCHAR(15),
    PRIMARY KEY (SKU),
    FOREIGN KEY (ComboID) REFERENCES Combo (ComboID),
    FOREIGN KEY (ImageID) REFERENCES Image (ImageID),
    FOREIGN KEY (StockID) REFERENCES Stocks (StockID)
);

CREATE TABLE
    `Manage` (
    ManageID     VARCHAR(15) NOT NULL,
    ManageTime   DATE        NOT NULL,
    ManageAction VARCHAR(15) NOT NULL,
    AccountID    VARCHAR(15) NOT NULL,
    SKU          VARCHAR(20) NOT NULL,
    PRIMARY KEY (ManageID),
    FOREIGN KEY (AccountID) REFERENCES Account (AccountID),
    FOREIGN KEY (SKU) REFERENCES Product (SKU)
);
>>>>>>> Stashed changes
