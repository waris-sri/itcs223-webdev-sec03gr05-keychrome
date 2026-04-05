-- This file is for testing/ experimenting with SQL queries, hence the name.
USE `Keychrome`;

SELECT CONCAT('Keychrome ', Series, ' ', Version, ' ', SwitchType, ' ', Switch, ' ', LEFT(Type, LENGTH(Type) - 1))
FROM Product
WHERE Type LIKE '%Keyboard%';

SELECT Type
FROM Product
GROUP BY Type;