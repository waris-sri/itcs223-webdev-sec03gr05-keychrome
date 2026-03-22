DROP DATABASE IF EXISTS `Keychrome`;
CREATE DATABASE `Keychrome`;

USE `Keychrome`;

CREATE TABLE `Account`
(
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

CREATE TABLE `Combo`
(
    ComboID VARCHAR(15)   NOT NULL,
    Price   DECIMAL(7, 2) NOT NULL,
    PRIMARY KEY (ComboID)
);

CREATE TABLE `Image`
(
    ImageID VARCHAR(15) NOT NULL,
    Source  VARCHAR(50) NOT NULL,
    PRIMARY KEY (ImageID)
);

CREATE TABLE `Stocks`
(
    StockID VARCHAR(15) NOT NULL,
    Color   VARCHAR(15) NOT NULL,
    Amount  INT         NOT NULL,
    PRIMARY KEY (StockID)
);

CREATE TABLE `Product`
(
    SKU               VARCHAR(20)                                                                                                                    NOT NULL,
    Series            VARCHAR(15)                                                                                                                    NOT NULL,
    Description       VARCHAR(500)                                                                                                                   NOT NULL,
    Price             DECIMAL(7, 2)                                                                                                                  NOT NULL,
    Type              ENUM ('Custom Keyboards', 'Keycaps', 'Mice', 'Slim Keyboards', 'Switches', 'Wired Keyboards', 'Wireless Keyboard', 'Z-Others') NOT NULL,
    Sensor            VARCHAR(20),
    SwitchType        VARCHAR(20),
    Switch            VARCHAR(20),
    Version           VARCHAR(20),
    LayoutVersion     VARCHAR(20),
    DiscountAvailable BOOLEAN                                                                                                                        NOT NULL,
    NewArrival        BOOLEAN                                                                                                                        NOT NULL,
    Rating            DECIMAL(2, 1)                                                                                                                  NOT NULL,
    ComboID           VARCHAR(15),
    ImageID           VARCHAR(15),
    StockID           VARCHAR(15),
    PRIMARY KEY (SKU),
    FOREIGN KEY (ComboID) REFERENCES Combo (ComboID),
    FOREIGN KEY (ImageID) REFERENCES Image (ImageID),
    FOREIGN KEY (StockID) REFERENCES Stocks (StockID)
);

CREATE TABLE `Manage`
(
    ManageID     VARCHAR(15) NOT NULL,
    ManageTime   DATE        NOT NULL,
    ManageAction VARCHAR(15) NOT NULL,
    AccountID    VARCHAR(15) NOT NULL,
    SKU          VARCHAR(20) NOT NULL,
    PRIMARY KEY (ManageID),
    FOREIGN KEY (AccountID) REFERENCES Account (AccountID),
    FOREIGN KEY (SKU) REFERENCES Product (SKU)
);