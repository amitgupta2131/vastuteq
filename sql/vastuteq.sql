-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jul 04, 2020 at 11:42 AM
-- Server version: 10.4.10-MariaDB
-- PHP Version: 7.2.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vastuteq`
--

-- --------------------------------------------------------

--
-- Table structure for table `clientdetails`
--

DROP TABLE IF EXISTS `clientdetails`;
CREATE TABLE IF NOT EXISTS `clientdetails` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cId` varchar(50) NOT NULL,
  `name` varchar(100) NOT NULL,
  `mobileNo` varchar(12) NOT NULL,
  `email` varchar(100) NOT NULL,
  `address` varchar(500) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `clientdetails`
--

INSERT INTO `clientdetails` (`id`, `cId`, `name`, `mobileNo`, `email`, `address`) VALUES
(1, 'C-200704001', 'Yatharth Sharma', '1234567890', 'yatharth@sample.com', 'Ghaziabad');

-- --------------------------------------------------------

--
-- Table structure for table `login`
--

DROP TABLE IF EXISTS `login`;
CREATE TABLE IF NOT EXISTS `login` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `isAdmin` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `login`
--

INSERT INTO `login` (`id`, `userId`, `email`, `password`, `isAdmin`) VALUES
(1, '0123456', 'yatharth@sample.com', '123456', 0);

-- --------------------------------------------------------

--
-- Table structure for table `propertydetails`
--

DROP TABLE IF EXISTS `propertydetails`;
CREATE TABLE IF NOT EXISTS `propertydetails` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `clientId` varchar(50) NOT NULL,
  `name` varchar(100) NOT NULL,
  `category` varchar(100) NOT NULL,
  `type` varchar(100) NOT NULL,
  `address` varchar(500) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `propertydetails`
--

INSERT INTO `propertydetails` (`id`, `clientId`, `name`, `category`, `type`, `address`) VALUES
(1, 'C-200704001', 'Sharma Bhavan', 'Residential', 'Bunglaw', 'Ghaziabad,Shalimar Garden, Gali-no.-5'),
(2, 'C-200704001', 'Sharma Bhavan', 'Commercial', 'Hotel/Resort/Club', 'Ghaziabad');

-- --------------------------------------------------------

--
-- Table structure for table `property_category`
--

DROP TABLE IF EXISTS `property_category`;
CREATE TABLE IF NOT EXISTS `property_category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `property_category`
--

INSERT INTO `property_category` (`id`, `category`) VALUES
(1, 'Residential '),
(2, 'Commercial '),
(3, 'Industrial'),
(4, 'Religion ');

-- --------------------------------------------------------

--
-- Table structure for table `property_type`
--

DROP TABLE IF EXISTS `property_type`;
CREATE TABLE IF NOT EXISTS `property_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `categoryId` int(11) NOT NULL,
  `type` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `property_type`
--

INSERT INTO `property_type` (`id`, `categoryId`, `type`) VALUES
(1, 1, 'Bunglaw'),
(2, 1, ' Multi Story'),
(3, 1, 'Plot'),
(4, 1, 'Flat'),
(5, 2, 'Office'),
(6, 2, 'Shop/ShowRoom'),
(7, 2, ' Hotel/Resort/Club'),
(8, 2, 'Hospital/Nursing Home/Educational Institute'),
(9, 3, 'Cottage Industry/Small Scale Industry'),
(10, 3, 'Large Scale Industry'),
(11, 4, 'Temple'),
(12, 4, 'Ashram/Matha');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` varchar(50) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
