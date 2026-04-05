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