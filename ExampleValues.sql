USE `Keychrome`;

-- 1. Insert into Account (10 records)
INSERT INTO `Account` (AccountID, FirstName, LastName, Email, Password, RegisterDate, LoginTime)
VALUES
('A001', 'Warawuth', 'Ngamluea', 'warawuth@mu.edu', SHA2(CONCAT('A001', 'RBnPPEqv4Bi045i9'), 256), '2025-10-01', '2026-02-24 10:15:00'),
('A002', 'Bobby', 'Bloom', 'bobby.bloom@mail.com', SHA2(CONCAT('A002', 'BK0Sz1jsjmfX5o88'), 256), '2025-11-15', '2026-02-23 18:30:00'),
('A003', 'Alice', 'Smith', 'alice.smith@gmail.com', SHA2(CONCAT('A003', 'g4HZY7m4Ot4HaiXE'), 256), '2025-12-05', '2026-02-20 09:45:00'),
('A004', 'John', 'Doe', 'jdoe99@yahoo.com', SHA2(CONCAT('A004', '186GsOs0fGT0XNZl'), 256), '2026-01-10', '2026-02-24 08:00:00'),
('A005', 'Emma', 'Watson', 'emma.w@outlook.com', SHA2(CONCAT('A005', 'd8pE7dy1buDo43dv'), 256), '2026-01-22', '2026-02-21 14:20:00'),
('A006', 'Lucas', 'Muller', 'lmuller@bscc.de', SHA2(CONCAT('A006', 'gYY45FLQkM3Kz0H6'), 256), '2026-02-01', '2026-02-24 11:10:00'),
('A007', 'Sophia', 'Chen', 'schen.dev@gmail.com', SHA2(CONCAT('A007', 'BIYc71kvfm9XV5XM'), 256), '2026-02-10', '2026-02-22 16:55:00'),
('A008', 'Liam', 'Johnson', 'liam.j@hotmail.com', SHA2(CONCAT('A008', 'rO03hx9nrbq66E0s'), 256), '2026-02-14', '2026-02-24 07:30:00'),
('A009', 'Olivia', 'Davis', 'olivia.davis@gmail.com', SHA2(CONCAT('A009', 'pB8NI1C9QuWj4EdG'), 256), '2026-02-18', '2026-02-23 20:10:00'),
('A010', 'Noah', 'Martinez', 'nmartinez@yahoo.com', SHA2(CONCAT('A010', 'pYjZk2km4V81AA4t'), 256), '2026-02-20', '2026-02-24 09:05:00');

-- 2. Insert into Combo (10 records)
INSERT INTO `Combo` (ComboID, Price)
VALUES ('CB-PRO-01', 189.90),
       ('CB-STARTER', 129.50),
       ('CB-GAMER-X', 210.00),
       ('CB-OFFICE-1', 145.00),
       ('CB-SILENT', 160.75),
       ('CB-ERGO-01', 199.99),
       ('CB-TRAVEL', 110.00),
       ('CB-CUSTOM-A', 250.00),
       ('CB-CUSTOM-B', 275.50),
       ('CB-LITE-01', 99.99);

-- 3. Insert into Product (15 records)
INSERT INTO `Product` (SKU, Series, Description, AvailableStocks, Price, Type, Color, Sensor, SwitchType, Version,
                       LayoutKeyboard, DiscountAvailable, NewArrival, ComboID, Rating)
VALUES ('K1-PRO-RED', 'K Pro', 'Low profile wireless mechanical keyboard', 50, 99.00, 'Keyboard', 'Black', NULL,
        'Gateron Red', 'V1', 'ANSI', TRUE, FALSE, NULL, 4.8),
       ('Q1-MAX-WHT', 'Q Series', 'Premium custom aluminum keyboard', 25, 199.00, 'Keyboard', 'White', NULL,
        'Kailh Box Brown', 'Max', 'ISO', FALSE, TRUE, 'CB-PRO-01', 4.9),
       ('V1-CUSTOM', 'V Series', 'Wired custom mechanical keyboard', 100, 89.00, 'Keyboard', 'Carbon Black', NULL,
        'Cherry MX Blue', 'V1', 'ANSI', TRUE, FALSE, 'CB-STARTER', 4.5),
       ('M1-WL-MOUSE', 'M Series', 'Ultra-lightweight wireless mouse', 200, 49.00, 'Mouse', 'White', 'PixArt 3395',
        'Huano', 'V2', NULL, FALSE, TRUE, 'CB-PRO-01', 4.7),
       ('M2-ERGO', 'M Series', 'Ergonomic vertical wireless mouse', 75, 59.00, 'Mouse', 'Black', 'PixArt 3370', 'Omron',
        'V1', NULL, TRUE, FALSE, 'CB-ERGO-01', 4.4),
       ('SW-GAT-RED-35', 'Switches', 'Gateron G Pro Red switches (35 pcs)', 500, 15.00, 'Component', 'Red', NULL,
        'Linear', 'Pro 2.0', NULL, FALSE, FALSE, NULL, 4.8),
       ('SW-CHY-BRN-35', 'Switches', 'Cherry MX Brown switches (35 pcs)', 300, 18.50, 'Component', 'Brown', NULL,
        'Tactile', 'Hyperglide', NULL, FALSE, FALSE, NULL, 4.6),
       ('K3-LITE', 'K Series', 'Ultra-slim wireless keyboard', 80, 79.00, 'Keyboard', 'Grey', NULL, 'Low Profile Blue',
        'V2', 'ANSI', TRUE, FALSE, 'CB-LITE-01', 4.3),
       ('Q6-PRO-BARE', 'Q Series', '100% layout barebone keyboard kit', 15, 179.00, 'Barebone', 'Navy Blue', NULL, NULL,
        'Pro', 'ANSI', FALSE, TRUE, 'CB-CUSTOM-A', 5.0),
       ('DESKMAT-L-BLK', 'Accessories', 'Large smooth surface desk mat', 150, 25.00, 'Accessory', 'Black', NULL, NULL,
        'V1', NULL, TRUE, FALSE, 'CB-STARTER', 4.9),
       ('KC-PBT-WHT', 'Keycaps', 'Double-shot PBT keycap set', 120, 40.00, 'Component', 'White', NULL, NULL, 'OEM',
        'ANSI/ISO', FALSE, FALSE, 'CB-CUSTOM-A', 4.7),
       ('M3-MINI', 'M Series', 'Compact travel wireless mouse', 90, 39.00, 'Mouse', 'Silver', 'PixArt 3325',
        'Kailh Mute', 'V1', NULL, TRUE, FALSE, 'CB-TRAVEL', 4.2),
       ('K8-TENKEYLESS', 'K Series', 'TKL wireless mechanical keyboard', 60, 89.00, 'Keyboard', 'Black', NULL,
        'Gateron Brown', 'V2', 'ANSI', FALSE, FALSE, NULL, 4.5),
       ('CBL-COILED-BL', 'Accessories', 'Premium coiled aviator cable', 200, 35.00, 'Accessory', 'Blue', NULL, NULL,
        'V1', NULL, FALSE, TRUE, NULL, 4.8),
       ('Q0-NUMPAD', 'Q Series', 'Custom aluminum number pad', 40, 69.00, 'Keyboard', 'Silver', NULL, 'Kailh Box Red',
        'V1', 'Numpad', FALSE, FALSE, 'CB-OFFICE-1', 4.6);

-- 4. Insert into ShippingAddress (10 records)
INSERT INTO `ShippingAddress` (AddressID, Region, HouseNumber, City, Province, PhoneNumber, AccountID)
VALUES ('AD001', 'Central', '999/1', 'Salaya', 'Nakhon Pathom', '081-234-5678', 'A001'),
       ('AD002', 'Central', '123/45', 'Bangkok', 'Bangkok', '089-876-5432', 'A002'),
       ('AD003', 'North', '45', 'Chiang Mai', 'Chiang Mai', '053-111-2222', 'A003'),
       ('AD004', 'South', '88/8', 'Phuket', 'Phuket', '076-999-8888', 'A004'),
       ('AD005', 'East', '10', 'Pattaya', 'Chonburi', '038-444-5555', 'A005'),
       ('AD006', 'Europe', '12A', 'Bremen', 'Bremen', '+49123456789', 'A006'),
       ('AD007', 'West', '77', 'Hua Hin', 'Prachuap', '032-777-6666', 'A007'),
       ('AD008', 'Northeast', '555', 'Korat', 'Nakhon Ratchas', '044-555-4444', 'A008'),
       ('AD009', 'Central', '21/3', 'Nonthaburi', 'Nonthaburi', '02-333-4444', 'A009'),
       ('AD010', 'Central', '101', 'Pathum Thani', 'Pathum Thani', '02-999-1111', 'A010');

-- 5. Insert into Order (10 records)
INSERT INTO `Order` (OrderID, ShippingStatus, PaymentMethod, AccountID)
VALUES ('ORD-26-001', 'Delivered', 'Credit Card', 'A001'),
       ('ORD-26-002', 'Shipped', 'PayPal', 'A002'),
       ('ORD-26-003', 'Processing', 'Bank Transfer', 'A003'),
       ('ORD-26-004', 'Delivered', 'Credit Card', 'A004'),
       ('ORD-26-005', 'Pending', 'PromptPay', 'A001'),
       ('ORD-26-006', 'Shipped', 'Credit Card', 'A006'),
       ('ORD-26-007', 'Processing', 'Debit Card', 'A007'),
       ('ORD-26-008', 'Cancelled', 'PayPal', 'A008'),
       ('ORD-26-009', 'Delivered', 'PromptPay', 'A009'),
       ('ORD-26-010', 'Shipped', 'Credit Card', 'A010');

-- 6. Insert into AddToCart (12 records)
INSERT INTO `AddToCart` (CartID, AddedDate, AccountID, SKU)
VALUES ('CRT-001', '2026-02-22', 'A001', 'Q1-MAX-WHT'),
       ('CRT-002', '2026-02-22', 'A001', 'M1-WL-MOUSE'),
       ('CRT-003', '2026-02-23', 'A002', 'K1-PRO-RED'),
       ('CRT-004', '2026-02-20', 'A003', 'V1-CUSTOM'),
       ('CRT-005', '2026-02-24', 'A004', 'DESKMAT-L-BLK'),
       ('CRT-006', '2026-02-24', 'A004', 'SW-GAT-RED-35'),
       ('CRT-007', '2026-02-21', 'A005', 'M2-ERGO'),
       ('CRT-008', '2026-02-24', 'A006', 'Q6-PRO-BARE'),
       ('CRT-009', '2026-02-24', 'A006', 'KC-PBT-WHT'),
       ('CRT-010', '2026-02-22', 'A007', 'K3-LITE'),
       ('CRT-011', '2026-02-23', 'A008', 'M3-MINI'),
       ('CRT-012', '2026-02-24', 'A010', 'Q0-NUMPAD');

SELECT *
FROM Product;
