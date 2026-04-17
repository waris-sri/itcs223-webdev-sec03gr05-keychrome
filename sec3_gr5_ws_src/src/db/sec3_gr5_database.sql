CREATE TABLE account
(
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
CREATE TABLE combo
(
	comboid CHARACTER VARYING NOT NULL,
	price   NUMERIC           NOT NULL,
	CONSTRAINT combo_pkey PRIMARY KEY (comboid)
);
CREATE TABLE image
(
	imageid CHARACTER VARYING NOT NULL,
	source  text              NOT NULL,
	sku     CHARACTER VARYING NOT NULL,
	CONSTRAINT image_pkey PRIMARY KEY (imageid),
	CONSTRAINT image_sku_fkey FOREIGN KEY (sku) REFERENCES product (sku)
);
CREATE TABLE manage
(
	manageid     CHARACTER VARYING NOT NULL,
	managetime   DATE              NOT NULL DEFAULT CURRENT_DATE,
	manageaction CHARACTER VARYING NOT NULL,
	accountid    CHARACTER VARYING NOT NULL,
	sku          CHARACTER VARYING NOT NULL,
	CONSTRAINT manage_pkey PRIMARY KEY (manageid),
	CONSTRAINT manage_accountid_fkey FOREIGN KEY (accountid) REFERENCES account (accountid),
	CONSTRAINT manage_sku_fkey FOREIGN KEY (sku) REFERENCES product (sku)
);
CREATE TABLE product
(
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
CREATE TABLE stocks
(
	stockid CHARACTER VARYING NOT NULL,
	color   CHARACTER VARYING NOT NULL,
	amount  INTEGER           NOT NULL,
	sku     CHARACTER VARYING NOT NULL,
	CONSTRAINT stocks_pkey PRIMARY KEY (stockid),
	CONSTRAINT stocks_sku_fkey FOREIGN KEY (sku) REFERENCES product (sku)
);

INSERT INTO account ("accountid", "firstname", "lastname", "email", "password", "salt", "registerdate", "logintime")
VALUES ('A001', 'Warawuth', 'Ngamluea', 'warawuth@mu.edu', 'Passw0rd123!', 'A001', '2025-10-01', '2026-02-28 10:15:00'),
       ('A002', 'Bobby', 'Bloom', 'bobby.b@mail.com', 'M1necr@ftF@n', 'A002', '2025-11-15', '2026-02-28 12:30:00'),
       ('A003', 'Alice', 'Smith', 'alice.smith@gmail.com', 'S3cr3tP@ss', 'A003', '2025-12-05', '2026-02-27 09:45:00'),
       ('A004', 'John', 'Doe', 'jdoe99@yahoo.com', 'QwertyUIOP', 'A004', '2026-01-10', '2026-02-28 08:00:00'),
       ('A005', 'Emma', 'Watson', 'emma.w@outlook.com', 'Hogw@rts99', 'A005', '2026-01-22', '2026-02-26 14:20:00'),
       ('A006', 'Lucas', 'Muller', 'lmuller@bscc.de', 'Bremen2026!', 'A006', '2026-02-01', '2026-02-28 11:10:00'),
       ('A007', 'Sophia', 'Chen', 'schen.dev@gmail.com', 'C0d1ng!sFun', 'A007', '2026-02-10', '2026-02-27 16:55:00'),
       ('A008', 'Liam', 'Johnson', 'liam.j@hotmail.com', 'L!amJ0hnson', 'A008', '2026-02-14', '2026-02-28 07:30:00'),
       ('A009', 'Olivia', 'Davis', 'olivia.davis@gmail.com', '0liviaD@vis', 'A009', '2026-02-18',
        '2026-02-25 20:10:00'),
       ('A010', 'Noah', 'Martinez', 'nmartinez@yahoo.com', 'N0@hM@rt1nez', 'A010', '2026-02-20', '2026-02-28 09:05:00');

INSERT INTO combo ("comboid", "price")
VALUES ('CB-GAMER-X', '210.00'),
       ('CB-LITE-01', '99.99'),
       ('CB-OFFICE-1', '145.00'),
       ('CB-PRO-01', '189.90'),
       ('CB-STARTER', '129.50'),
       ('CB-STREAMER', '175.50'),
       ('CB-MINIMAL', '115.00'),
       ('CB-ULTIMATE', '299.99'),
       ('CB-TRAVEL', '89.00'),
       ('CB-CUSTOM-X', '250.00');

INSERT INTO image ("imageid", "source", "sku")
VALUES ('IMG-CBL-01',
        'https://pkihtwrzvtwzmcvyfkka.supabase.co/storage/v1/object/public/product_images/Premium%20coiled%20aviator%20cable.png',
        'CBL-COILED-BL'),
       ('IMG-K1-01',
        'https://pkihtwrzvtwzmcvyfkka.supabase.co/storage/v1/object/public/product_images/Low%20profile%20wireless%20mechanical%20keyboard.png',
        'K1-PRO-RED'),
       ('IMG-K3-01',
        'https://pkihtwrzvtwzmcvyfkka.supabase.co/storage/v1/object/public/product_images/Ultra-slim%20wireless%20keyboard.png',
        'K3-LITE'),
       ('IMG-K8-01',
        'https://pkihtwrzvtwzmcvyfkka.supabase.co/storage/v1/object/public/product_images/Wireless%20TKL%20mechanical%20keyboard.png',
        'K8-PRO-WL'),
       ('IMG-KC-01',
        'https://pkihtwrzvtwzmcvyfkka.supabase.co/storage/v1/object/public/product_images/Double-shot%20PBT%20keycap%20set.png',
        'KC-PBT-WHT'),
       ('IMG-M1-01',
        'https://pkihtwrzvtwzmcvyfkka.supabase.co/storage/v1/object/public/product_images/Ultra-lightweight%20wireless%20mouse.png',
        'M1-WL-MOUSE'),
       ('IMG-M2-01',
        'https://pkihtwrzvtwzmcvyfkka.supabase.co/storage/v1/object/public/product_images/Ergonomic%20vertical%20wireless%20mouse.png',
        'M2-ERGO'),
       ('IMG-MAT-01',
        'https://pkihtwrzvtwzmcvyfkka.supabase.co/storage/v1/object/public/product_images/Large%20smooth%20surface%20desk%20mat.png',
        'DESKMAT-L-BLK'),
       ('IMG-Q1-01',
        'https://pkihtwrzvtwzmcvyfkka.supabase.co/storage/v1/object/public/product_images/Premium%20custom%20aluminum%20keyboard.png',
        'Q1-MAX-WHT'),
       ('IMG-SW-01',
        'https://pkihtwrzvtwzmcvyfkka.supabase.co/storage/v1/object/public/product_images/Gateron%20G%20Pro%20Red%20switches%20(35%20pcs)_converted.avif',
        'SW-GAT-RED-35'),
       ('IMG-SW-02',
        'https://pkihtwrzvtwzmcvyfkka.supabase.co/storage/v1/object/public/product_images/Cherry%20MX%20Brown%20switches%20(35%20pcs)_converted.avif',
        'SW-CHY-BRN-35'),
       ('IMG-V1-01',
        'https://pkihtwrzvtwzmcvyfkka.supabase.co/storage/v1/object/public/product_images/Wired%20custom%20mechanical%20keyboard.png',
        'V1-CUSTOM'),
       ('test_image', 'https://pkihtwrzvtwzmcvyfkka.supabase.co/storage/v1/object/public/product_images/test_image.png',
        'V1-CUSTOM');

INSERT INTO stocks ("stockid", "color", "amount", "sku")
VALUES ('STK-CBL-BLU', 'Blue', 250, 'CBL-COILED-BL'),
       ('STK-K1-BLK', 'Black', 150, 'K1-PRO-RED'),
       ('STK-K3-GRY', 'Grey', 120, 'K3-LITE'),
       ('STK-K8-BLK', 'Black', 180, 'K8-PRO-WL'),
       ('STK-KC-WHT', 'White', 60, 'KC-PBT-WHT'),
       ('STK-M1-WHT', 'White', 300, 'M1-WL-MOUSE'),
       ('STK-M2-BLK', 'Black', 80, 'M2-ERGO'),
       ('STK-MAT-BLK', 'Black', 400, 'DESKMAT-L-BLK'),
       ('STK-Q1-WHT', 'White', 45, 'Q1-MAX-WHT'),
       ('STK-SW-BRN', 'Brown', 850, 'SW-CHY-BRN-35'),
       ('STK-SW-RED', 'Red', 1000, 'SW-GAT-RED-35'),
       ('STK-V1-CBN', 'Carbon Black', 200, 'V1-CUSTOM');

INSERT INTO product ("sku", "series", "description", "price", "type", "sensor", "switchtype", "switch", "version",
                     "layoutversion", "discountavailable", "newarrival", "rating", "comboid")
VALUES ('CBL-COILED-BL', 'Accessories', 'Premium coiled aviator cable', '35.00', 'Z-Others', NULL, NULL, NULL, 'V1',
        NULL, FALSE, TRUE, '4.8', NULL),
       ('DESKMAT-L-BLK', 'Accessories', 'Large smooth surface desk mat', '25.00', 'Z-Others', NULL, NULL, NULL, 'V1',
        NULL, TRUE, FALSE, '4.9', 'CB-STARTER'),
       ('K1-PRO-RED', 'K Pro', 'Low profile wireless mechanical keyboard', '99.00', 'Slim Keyboards', NULL, 'Linear',
        'Gateron Red', 'V1', 'ANSI', TRUE, FALSE, '4.8', NULL),
       ('K3-LITE', 'K Series', 'Ultra-slim wireless keyboard', '79.00', 'Slim Keyboards', NULL, 'Clicky',
        'Low Profile Blue', 'V2', 'ANSI', TRUE, FALSE, '4.3', 'CB-LITE-01'),
       ('K8-PRO-WL', 'K Pro', 'Wireless TKL mechanical keyboard', '109.00', 'Wireless Keyboards', NULL, 'Tactile',
        'Gateron Brown', 'V1', 'ANSI', FALSE, TRUE, '4.8', NULL),
       ('KC-PBT-WHT', 'Keycaps', 'Double-shot PBT keycap set', '40.00', 'Keycaps', NULL, NULL, NULL, 'OEM', 'ANSI/ISO',
        FALSE, FALSE, '4.7', NULL),
       ('M1-WL-MOUSE', 'M Series', 'Ultra-lightweight wireless mouse', '49.00', 'Mice', 'PixArt 3395', NULL, NULL, 'V2',
        NULL, FALSE, TRUE, '4.7', 'CB-PRO-01'),
       ('M2-ERGO', 'M Series', 'Ergonomic vertical wireless mouse', '59.00', 'Mice', 'PixArt 3370', NULL, NULL, 'V1',
        NULL, TRUE, FALSE, '4.4', NULL),
       ('Q1-MAX-WHT', 'Q Series', 'Premium custom aluminum keyboard', '199.00', 'Custom Keyboards', NULL, 'Tactile',
        'Kailh Box Brown', 'Max', 'ISO', FALSE, TRUE, '4.9', 'CB-PRO-01'),
       ('SW-CHY-BRN-35', 'Switches', 'Cherry MX Brown switches (35 pcs)', '18.50', 'Switches', NULL, 'Tactile',
        'Cherry MX Brown', 'Hyperglide', NULL, FALSE, FALSE, '4.6', NULL),
       ('SW-GAT-RED-35', 'Switches', 'Gateron G Pro Red switches (35 pcs)', '15.00', 'Switches', NULL, 'Linear',
        'Gateron Red', 'Pro 2.0', NULL, FALSE, FALSE, '4.8', NULL),
       ('V1-CUSTOM', 'V Series', 'Wired custom mechanical keyboard', '89.00', 'Wired Keyboards', NULL, 'Clicky',
        'Cherry MX Blue', 'V1', 'ANSI', TRUE, FALSE, '4.5', 'CB-STARTER');

INSERT INTO manage ("manageid", "managetime", "manageaction", "accountid", "sku")
VALUES ('MNG-001', '2026-02-20', 'CREATE', 'A001', 'K1-PRO-RED'),
       ('MNG-002', '2026-02-21', 'UPDATE', 'A001', 'K1-PRO-RED'),
       ('MNG-003', '2026-02-22', 'CREATE', 'A002', 'Q1-MAX-WHT'),
       ('MNG-004', '2026-02-23', 'RESTOCK', 'A003', 'SW-GAT-RED-35'),
       ('MNG-005', '2026-02-24', 'CREATE', 'A004', 'M1-WL-MOUSE'),
       ('MNG-006', '2026-02-25', 'RESTOCK', 'A001', 'V1-CUSTOM'),
       ('MNG-007', '2026-02-26', 'UPDATE', 'A006', 'DESKMAT-L-BLK'),
       ('MNG-008', '2026-02-27', 'CREATE', 'A007', 'KC-PBT-WHT'),
       ('MNG-009', '2026-02-28', 'RESTOCK', 'A002', 'K3-LITE'),
       ('MNG-010', '2026-02-28', 'UPDATE', 'A001', 'M1-WL-MOUSE'),
       ('MNG-011', '2026-02-28', 'CREATE', 'A001', 'K8-PRO-WL'),
       ('MNG-012', '2026-02-28', 'UPDATE', 'A001', 'CBL-COILED-BL');
