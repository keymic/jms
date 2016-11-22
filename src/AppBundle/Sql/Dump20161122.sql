CREATE DATABASE  IF NOT EXISTS `jms` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_polish_ci */;
USE `jms`;
-- MySQL dump 10.13  Distrib 5.5.53, for debian-linux-gnu (x86_64)
--
-- Host: 127.0.0.1    Database: jms
-- ------------------------------------------------------
-- Server version	5.7.16

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `janusz`
--

DROP TABLE IF EXISTS `janusz`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `janusz` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `reason` varchar(45) COLLATE utf8_polish_ci DEFAULT NULL,
  `date` date DEFAULT NULL,
  `pearson_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_janusz_1_idx` (`pearson_id`),
  CONSTRAINT `fk_janusz_1` FOREIGN KEY (`pearson_id`) REFERENCES `pearson` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `janusz`
--

LOCK TABLES `janusz` WRITE;
/*!40000 ALTER TABLE `janusz` DISABLE KEYS */;
INSERT INTO `janusz` VALUES (1,'test reason','2016-01-01',1),(2,'reason test two','2016-02-05',1);
/*!40000 ALTER TABLE `janusz` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pearson`
--

DROP TABLE IF EXISTS `pearson`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pearson` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) COLLATE utf8_polish_ci DEFAULT NULL,
  `surname` varchar(45) COLLATE utf8_polish_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pearson`
--

LOCK TABLES `pearson` WRITE;
/*!40000 ALTER TABLE `pearson` DISABLE KEYS */;
INSERT INTO `pearson` VALUES (1,'janusz','p'),(2,'ktostam','drugiewicz');
/*!40000 ALTER TABLE `pearson` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-11-22 21:33:34
