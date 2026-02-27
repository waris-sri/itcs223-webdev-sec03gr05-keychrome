DROP DATABASE IF EXISTS `Keychrome`;
CREATE DATABASE `Keychrome`;

USE `Keychrome`;

CREATE TABLE `Account`
(
    AccountID    VARCHAR(15) NOT NULL,
    FirstName    VARCHAR(50) NOT NULL,
    LastName     VARCHAR(50) NOT NULL,
    Email        VARCHAR(50) NOT NULL,
    RegisterDate DATE        NOT NULL,
    LoginTime    DATETIME    NOT NULL,
    Password     VARCHAR(16) NOT NULL,
    PRIMARY KEY (AccountID),
    CONSTRAINT CHK_PasswordLength CHECK (LENGTH(Password) >= 8)
);

CREATE TABLE `Combo`
(
    ComboID VARCHAR(15)   NOT NULL,
    Price   DECIMAL(7, 2) NOT NULL,
    PRIMARY KEY (ComboID)
);

CREATE TABLE `Product`
(
    SKU               VARCHAR(20)   NOT NULL,
    Series            VARCHAR(15)   NOT NULL,
    Description       VARCHAR(500)  NOT NULL,
    AvailableStocks   INT           NOT NULL,
    Price             DECIMAL(7, 2) NOT NULL,
    Type              VARCHAR(18)   NOT NULL,
    Color             VARCHAR(20),
    Sensor            VARCHAR(20),
    SwitchType        VARCHAR(20),
    Version           VARCHAR(20),
    LayoutKeyboard    VARCHAR(20),
    DiscountAvailable BOOLEAN       NOT NULL,
    NewArrival        BOOLEAN       NOT NULL,
    ComboID           VARCHAR(15),
    Rating            DECIMAL(2, 1) NOT NULL,
    PRIMARY KEY (SKU),
    FOREIGN KEY (ComboID) REFERENCES Combo (ComboID)
);

CREATE TABLE `ShippingAddress`
(
    AddressID   VARCHAR(15) NOT NULL,
    Region      VARCHAR(15) NOT NULL,
    HouseNumber VARCHAR(7)  NOT NULL,
    City        VARCHAR(15) NOT NULL,
    Province    VARCHAR(20) NOT NULL,
    PhoneNumber CHAR(12)    NOT NULL,
    AccountID   VARCHAR(15),
    PRIMARY KEY (AddressID),
    FOREIGN KEY (AccountID) REFERENCES Account (AccountID)
);

CREATE TABLE `Order`
(
    OrderID        VARCHAR(15) NOT NULL,
    ShippingStatus VARCHAR(50) NOT NULL,
    PaymentMethod  VARCHAR(50) NOT NULL,
    AccountID      VARCHAR(15) NOT NULL,
    PRIMARY KEY (OrderID),
    FOREIGN KEY (AccountID) REFERENCES Account (AccountID)
);

CREATE TABLE `AddToCart`
(
    CartID    VARCHAR(15) NOT NULL,
    AddedDate DATE        NOT NULL,
    AccountID VARCHAR(15) NOT NULL,
    SKU       VARCHAR(20) NOT NULL,
    PRIMARY KEY (CartID),
    FOREIGN KEY (AccountID) REFERENCES Account (AccountID),
    FOREIGN KEY (SKU) REFERENCES Product (SKU)
);
