USE `Keychrome`;

-- 1. Insert into Account (10 records)
INSERT INTO `Account` (AccountID, FirstName, LastName, Email, Password, RegisterDate, LoginTime)
VALUES ('A001', 'Warawuth', 'Ngamluea', 'warawuth@mu.edu', 'Passw0rd123!', '2025-10-01', '2026-02-28 10:15:00'),
       ('A002', 'Bobby', 'Bloom', 'bobby.b@mail.com', 'M1necr@ftF@n', '2025-11-15', '2026-02-28 12:30:00'),
       ('A003', 'Alice', 'Smith', 'alice.smith@gmail.com', 'S3cr3tP@ss', '2025-12-05', '2026-02-27 09:45:00'),
       ('A004', 'John', 'Doe', 'jdoe99@yahoo.com', 'QwertyUIOP', '2026-01-10', '2026-02-28 08:00:00'),
       ('A005', 'Emma', 'Watson', 'emma.w@outlook.com', 'Hogw@rts99', '2026-01-22', '2026-02-26 14:20:00'),
       ('A006', 'Lucas', 'Muller', 'lmuller@bscc.de', 'Bremen2026!', '2026-02-01', '2026-02-28 11:10:00'),
       ('A007', 'Sophia', 'Chen', 'schen.dev@gmail.com', 'C0d1ng!sFun', '2026-02-10', '2026-02-27 16:55:00'),
       ('A008', 'Liam', 'Johnson', 'liam.j@hotmail.com', 'L!amJ0hnson', '2026-02-14', '2026-02-28 07:30:00'),
       ('A009', 'Olivia', 'Davis', 'olivia.davis@gmail.com', '0liviaD@vis', '2026-02-18', '2026-02-25 20:10:00'),
       ('A010', 'Noah', 'Martinez', 'nmartinez@yahoo.com', 'N0@hM@rt1nez', '2026-02-20', '2026-02-28 09:05:00');

-- 2. Insert into Combo (5 records)
INSERT INTO `Combo` (ComboID, Price)
VALUES ('CB-PRO-01', 189.90),
       ('CB-STARTER', 129.50),
       ('CB-GAMER-X', 210.00),
       ('CB-OFFICE-1', 145.00),
       ('CB-LITE-01', 99.99);

-- 3. Insert into Image (12 records)
INSERT INTO `Image` (ImageID, Source)
VALUES ('IMG-K1-01', '/img/products/k1_pro_1.png'),
       ('IMG-Q1-01', '/img/products/q1_max_1.png'),
       ('IMG-V1-01', '/img/products/v1_custom.png'),
       ('IMG-M1-01', '/img/products/m1_mouse.png'),
       ('IMG-M2-01', '/img/products/m2_ergo.png'),
       ('IMG-SW-01', '/img/products/sw_red.png'),
       ('IMG-SW-02', '/img/products/sw_brown.png'),
       ('IMG-K3-01', '/img/products/k3_lite.png'),
       ('IMG-MAT-01', '/img/products/deskmat.png'),
       ('IMG-KC-01', '/img/products/keycap_wht.png'),
       ('IMG-CBL-01', '/img/products/cable_bl.png'),
       ('IMG-K8-01', '/img/products/k8_pro_wl.png');

-- 4. Insert into Stocks (12 records)
INSERT INTO `Stocks` (StockID, Color, Amount)
VALUES ('STK-K1-BLK', 'Black', 150),
       ('STK-Q1-WHT', 'White', 45),
       ('STK-V1-CBN', 'Carbon Black', 200),
       ('STK-M1-WHT', 'White', 300),
       ('STK-M2-BLK', 'Black', 80),
       ('STK-SW-RED', 'Red', 1000),
       ('STK-SW-BRN', 'Brown', 850),
       ('STK-K3-GRY', 'Grey', 120),
       ('STK-MAT-BLK', 'Black', 400),
       ('STK-KC-WHT', 'White', 60),
       ('STK-CBL-BLU', 'Blue', 250),
       ('STK-K8-BLK', 'Black', 180);

-- 5. Insert into Product (12 records)
INSERT INTO `Product` (SKU, Series, Description, Price, Type, Sensor, SwitchType, Switch, Version, LayoutVersion,
                       DiscountAvailable, NewArrival, Rating, ComboID, ImageID, StockID)
VALUES ('K1-PRO-RED', 'K Pro', 'Low profile wireless mechanical keyboard', 99.00, 'Slim Keyboards', NULL, 'Linear',
        'Gateron Red', 'V1', 'ANSI', TRUE, FALSE, 4.8, NULL, 'IMG-K1-01', 'STK-K1-BLK'),
       ('Q1-MAX-WHT', 'Q Series', 'Premium custom aluminum keyboard', 199.00, 'Custom Keyboards', NULL, 'Tactile',
        'Kailh Box Brown', 'Max', 'ISO', FALSE, TRUE, 4.9, 'CB-PRO-01', 'IMG-Q1-01', 'STK-Q1-WHT'),
       ('V1-CUSTOM', 'V Series', 'Wired custom mechanical keyboard', 89.00, 'Wired Keyboards', NULL, 'Clicky',
        'Cherry MX Blue', 'V1', 'ANSI', TRUE, FALSE, 4.5, 'CB-STARTER', 'IMG-V1-01', 'STK-V1-CBN'),
       ('M1-WL-MOUSE', 'M Series', 'Ultra-lightweight wireless mouse', 49.00, 'Mice', 'PixArt 3395', NULL, NULL, 'V2',
        NULL, FALSE, TRUE, 4.7, 'CB-PRO-01', 'IMG-M1-01', 'STK-M1-WHT'),
       ('M2-ERGO', 'M Series', 'Ergonomic vertical wireless mouse', 59.00, 'Mice', 'PixArt 3370', NULL, NULL, 'V1',
        NULL, TRUE, FALSE, 4.4, NULL, 'IMG-M2-01', 'STK-M2-BLK'),
       ('SW-GAT-RED-35', 'Switches', 'Gateron G Pro Red switches (35 pcs)', 15.00, 'Switches', NULL, 'Linear',
        'Gateron Red', 'Pro 2.0', NULL, FALSE, FALSE, 4.8, NULL, 'IMG-SW-01', 'STK-SW-RED'),
       ('SW-CHY-BRN-35', 'Switches', 'Cherry MX Brown switches (35 pcs)', 18.50, 'Switches', NULL, 'Tactile',
        'Cherry MX Brown', 'Hyperglide', NULL, FALSE, FALSE, 4.6, NULL, 'IMG-SW-02', 'STK-SW-BRN'),
       ('K3-LITE', 'K Series', 'Ultra-slim wireless keyboard', 79.00, 'Slim Keyboards', NULL, 'Clicky',
        'Low Profile Blue', 'V2', 'ANSI', TRUE, FALSE, 4.3, 'CB-LITE-01', 'IMG-K3-01', 'STK-K3-GRY'),
       ('DESKMAT-L-BLK', 'Accessories', 'Large smooth surface desk mat', 25.00, 'Z-Others', NULL, NULL, NULL, 'V1',
        NULL, TRUE, FALSE, 4.9, 'CB-STARTER', 'IMG-MAT-01', 'STK-MAT-BLK'),
       ('KC-PBT-WHT', 'Keycaps', 'Double-shot PBT keycap set', 40.00, 'Keycaps', NULL, NULL, NULL, 'OEM', 'ANSI/ISO',
        FALSE, FALSE, 4.7, NULL, 'IMG-KC-01', 'STK-KC-WHT'),
       ('CBL-COILED-BL', 'Accessories', 'Premium coiled aviator cable', 35.00, 'Z-Others', NULL, NULL, NULL, 'V1', NULL,
        FALSE, TRUE, 4.8, NULL, 'IMG-CBL-01', 'STK-CBL-BLU'),
       ('K8-PRO-WL', 'K Pro', 'Wireless TKL mechanical keyboard', 109.00, 'Wireless Keyboard', NULL, 'Tactile',
        'Gateron Brown', 'V1', 'ANSI', FALSE, TRUE, 4.8, NULL, 'IMG-K8-01', 'STK-K8-BLK');

-- 6. Insert into Manage (12 records)
INSERT INTO `Manage` (ManageID, ManageTime, ManageAction, AccountID, SKU)
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

SELECT *
FROM account;