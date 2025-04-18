-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: אפריל 18, 2025 בזמן 03:03 PM
-- גרסת שרת: 10.4.21-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ProductStore`
--
CREATE DATABASE IF NOT EXISTS `ProductStore` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `ProductStore`;

-- --------------------------------------------------------

--
-- מבנה טבלה עבור טבלה `Logs`
--

CREATE TABLE `Logs` (
  `Id` int(11) NOT NULL,
  `Message` longtext NOT NULL,
  `Timestamp` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- הוצאת מידע עבור טבלה `Logs`
--

INSERT INTO `Logs` (`Id`, `Message`, `Timestamp`) VALUES
(1, 'Product updated: כובע חדש', '2025-04-17 15:08:48.824742'),
(2, 'Product updated: כובע חדש', '2025-04-17 15:21:05.639956'),
(3, 'Product updated: כובע חדש', '2025-04-17 15:23:10.264775'),
(4, 'Product updated: כובע חדש', '2025-04-17 15:23:17.934299'),
(5, 'Product updated: כובע חדש', '2025-04-17 15:26:19.427445'),
(6, 'Product updated: כובע חדש', '2025-04-17 15:48:41.659429'),
(7, 'Product updated: כובע חדש', '2025-04-17 15:48:53.568442'),
(8, 'Product created: Test Product', '2025-04-17 15:49:18.764300'),
(9, 'Product deleted: Test Product', '2025-04-17 15:49:25.560450'),
(10, 'Product created: Test Product', '2025-04-17 16:00:12.179481'),
(11, 'Product created: Test Product', '2025-04-17 16:00:13.470851'),
(12, 'Product created: Test Product', '2025-04-17 16:00:14.193001'),
(13, 'Product deleted: Test Product', '2025-04-17 16:00:25.138492'),
(14, 'Product deleted: Test Product', '2025-04-17 16:00:31.739097'),
(15, 'Product deleted: Test Product', '2025-04-17 16:02:08.803131'),
(16, 'Product created: Test Product', '2025-04-17 16:02:15.080751'),
(17, 'Product created: Test Product', '2025-04-17 16:02:15.694122'),
(18, 'Product created: Test Product', '2025-04-17 16:02:16.342568'),
(19, 'Product deleted: Test Product', '2025-04-17 16:02:35.536437'),
(20, 'Product deleted: Test Product', '2025-04-17 16:02:48.198976'),
(21, 'Product deleted: Test Product', '2025-04-17 16:03:57.601706'),
(22, 'Product created: Test Product', '2025-04-17 16:05:58.044504'),
(23, 'Product created: Test Product', '2025-04-17 16:05:58.740541'),
(24, 'Product deleted: Test Product', '2025-04-17 16:06:05.666596'),
(25, 'Product deleted: Test Product', '2025-04-17 16:07:37.885942'),
(26, 'Product created: Test Product', '2025-04-17 16:07:49.846669'),
(27, 'Product created: Test Product', '2025-04-17 16:07:50.142203'),
(28, 'Product created: Test Product', '2025-04-17 16:07:50.710362'),
(29, 'Product deleted: Test Product', '2025-04-17 16:07:56.283322'),
(30, 'Product deleted: Test Product', '2025-04-17 16:08:02.583575'),
(31, 'Product deleted: Test Product', '2025-04-17 16:08:07.462801'),
(32, 'Product created: חדש', '2025-04-17 16:13:23.151516'),
(33, 'Product deleted: חדש', '2025-04-17 16:13:35.322888');

-- --------------------------------------------------------

--
-- מבנה טבלה עבור טבלה `Products`
--

CREATE TABLE `Products` (
  `Id` int(11) NOT NULL,
  `Name` longtext NOT NULL,
  `Description` longtext NOT NULL,
  `Price` decimal(65,30) NOT NULL,
  `Quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- הוצאת מידע עבור טבלה `Products`
--

INSERT INTO `Products` (`Id`, `Name`, `Description`, `Price`, `Quantity`) VALUES
(1, 'כובע חדש', 'כובע אדום עם לוגו', '69.990000000000000000000000000000', 20),
(2, 'Test Product', 'Just testing', '99.990000000000000000000000000000', 10);

-- --------------------------------------------------------

--
-- מבנה טבלה עבור טבלה `Users`
--

CREATE TABLE `Users` (
  `Id` int(11) NOT NULL,
  `Username` longtext NOT NULL,
  `PasswordHash` longtext NOT NULL,
  `Role` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- הוצאת מידע עבור טבלה `Users`
--

INSERT INTO `Users` (`Id`, `Username`, `PasswordHash`, `Role`) VALUES
(1, 'admin', '$2a$11$ArGG326ZP8kpOH.q7oE8GuqylCmpBSQTyTwlyR67ZYQQTa18vVaC.', 'Admin'),
(2, 'idan', '$2a$11$/X0u7MlUjZl1BH62czo.Q.xyeydWGNgrQT56NuuYWjecmuniPmj/S', 'Customer'),
(3, 'omer', '$2a$11$9CKQpKY1cOWtL0Y0ka5S4ODrjw7RWsl9h1Q8BcDaCL7zG7KYmu5Qy', 'Customer'),
(4, 'agam', '$2a$11$leZzXD9PiZD4ubecKEAYluM/5OI2Yopc2RhVV4LztUlM4IYlPdmsK', 'Customer');

-- --------------------------------------------------------

--
-- מבנה טבלה עבור טבלה `__EFMigrationsHistory`
--

CREATE TABLE `__EFMigrationsHistory` (
  `MigrationId` varchar(150) NOT NULL,
  `ProductVersion` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- הוצאת מידע עבור טבלה `__EFMigrationsHistory`
--

INSERT INTO `__EFMigrationsHistory` (`MigrationId`, `ProductVersion`) VALUES
('20250417082632_RealCreateProducts', '8.0.13'),
('20250417083054_AddUserTable', '8.0.13'),
('20250417093444_AddLogsTable', '8.0.13');

--
-- Indexes for dumped tables
--

--
-- אינדקסים לטבלה `Logs`
--
ALTER TABLE `Logs`
  ADD PRIMARY KEY (`Id`);

--
-- אינדקסים לטבלה `Products`
--
ALTER TABLE `Products`
  ADD PRIMARY KEY (`Id`);

--
-- אינדקסים לטבלה `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`Id`);

--
-- אינדקסים לטבלה `__EFMigrationsHistory`
--
ALTER TABLE `__EFMigrationsHistory`
  ADD PRIMARY KEY (`MigrationId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Logs`
--
ALTER TABLE `Logs`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `Products`
--
ALTER TABLE `Products`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `Users`
--
ALTER TABLE `Users`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
