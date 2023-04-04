-- MySQL dump 10.13  Distrib 8.0.32, for Linux (x86_64)
--
-- Host: localhost    Database: proapp
-- ------------------------------------------------------
-- Server version	8.0.32-0ubuntu0.22.04.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `api_key`
--
DROP DATABASE IF EXISTS `proapp`;
CREATE DATABASE `proapp`;
use `proapp`;
DROP TABLE IF EXISTS `api_key`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `api_key` (
  `uid` int NOT NULL,
  `a_key` varbinary(1000) NOT NULL,
  PRIMARY KEY (`uid`,`a_key`),
  UNIQUE KEY `a_key` (`a_key`),
  CONSTRAINT `api_key_ibfk_1` FOREIGN KEY (`uid`) REFERENCES `users` (`uid`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_key`
--

LOCK TABLES `api_key` WRITE;
/*!40000 ALTER TABLE `api_key` DISABLE KEYS */;
INSERT INTO `api_key` VALUES (53,_binary '�k�]`\��d\�Lc\�X�N}(T��,�\��O\0\�g\�\"xu&3\�:\�,am�'),(54,_binary '\� BRw\�9�\�?\�j莘�r\�\��\�\�1vC8�\�P\�6g\�\"xu&3\�:\�,am�');
/*!40000 ALTER TABLE `api_key` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `messages` (
  `mid` int NOT NULL AUTO_INCREMENT,
  `messageDate` date NOT NULL,
  `messageTime` time NOT NULL,
  `fromUser` int NOT NULL,
  `toUser` int NOT NULL,
  `message` mediumblob NOT NULL,
  PRIMARY KEY (`mid`),
  KEY `fromUser` (`fromUser`),
  KEY `toUser` (`toUser`),
  CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`fromUser`) REFERENCES `users` (`uid`),
  CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`toUser`) REFERENCES `users` (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=396 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notification`
--

DROP TABLE IF EXISTS `notification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notification` (
  `nid` int NOT NULL AUTO_INCREMENT,
  `message` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL,
  `n_time` time NOT NULL,
  `n_date` date NOT NULL,
  PRIMARY KEY (`nid`)
) ENGINE=InnoDB AUTO_INCREMENT=315 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notification`
--

LOCK TABLES `notification` WRITE;
/*!40000 ALTER TABLE `notification` DISABLE KEYS */;
/*!40000 ALTER TABLE `notification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notification_relation`
--

DROP TABLE IF EXISTS `notification_relation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notification_relation` (
  `nid` int NOT NULL,
  `userId` int NOT NULL,
  PRIMARY KEY (`nid`,`userId`),
  KEY `userId` (`userId`),
  CONSTRAINT `notification_relation_ibfk_1` FOREIGN KEY (`nid`) REFERENCES `notification` (`nid`) ON DELETE CASCADE,
  CONSTRAINT `notification_relation_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`uid`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notification_relation`
--

LOCK TABLES `notification_relation` WRITE;
/*!40000 ALTER TABLE `notification_relation` DISABLE KEYS */;
/*!40000 ALTER TABLE `notification_relation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project_relation`
--

DROP TABLE IF EXISTS `project_relation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project_relation` (
  `pid` int NOT NULL,
  `uid` int DEFAULT NULL,
  KEY `uid` (`uid`),
  KEY `pid` (`pid`),
  CONSTRAINT `project_relation_ibfk_1` FOREIGN KEY (`uid`) REFERENCES `users` (`uid`),
  CONSTRAINT `project_relation_ibfk_2` FOREIGN KEY (`pid`) REFERENCES `projects` (`pid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_relation`
--

LOCK TABLES `project_relation` WRITE;
/*!40000 ALTER TABLE `project_relation` DISABLE KEYS */;
/*!40000 ALTER TABLE `project_relation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projects`
--

DROP TABLE IF EXISTS `projects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `projects` (
  `pid` int NOT NULL AUTO_INCREMENT,
  `pname` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('Yet To Start','On Progress','Completed','Cancelled') COLLATE utf8mb4_unicode_ci DEFAULT 'Yet To Start',
  `fromdate` date NOT NULL,
  `todate` date NOT NULL,
  `comment` text COLLATE utf8mb4_unicode_ci,
  `created_by` int NOT NULL,
  PRIMARY KEY (`pid`),
  KEY `created_by` (`created_by`),
  CONSTRAINT `projects_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `users` (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=274 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projects`
--

LOCK TABLES `projects` WRITE;
/*!40000 ALTER TABLE `projects` DISABLE KEYS */;
/*!40000 ALTER TABLE `projects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `task_relation`
--

DROP TABLE IF EXISTS `task_relation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `task_relation` (
  `tid` int NOT NULL,
  `uid` int NOT NULL,
  `IsCompleted` enum('true','false') COLLATE utf8mb4_unicode_ci DEFAULT 'false',
  KEY `tid` (`tid`),
  KEY `uid` (`uid`),
  CONSTRAINT `task_relation_ibfk_1` FOREIGN KEY (`tid`) REFERENCES `tasks` (`tid`),
  CONSTRAINT `task_relation_ibfk_3` FOREIGN KEY (`uid`) REFERENCES `users` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `task_relation`
--

LOCK TABLES `task_relation` WRITE;
/*!40000 ALTER TABLE `task_relation` DISABLE KEYS */;
/*!40000 ALTER TABLE `task_relation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tasks`
--

DROP TABLE IF EXISTS `tasks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tasks` (
  `tid` int NOT NULL AUTO_INCREMENT,
  `tname` varchar(25) COLLATE utf8mb4_unicode_ci NOT NULL,
  `fromdate` date NOT NULL,
  `todate` date NOT NULL,
  `status` enum('Yet To Start','On Progress','Completed','Cancelled') COLLATE utf8mb4_unicode_ci DEFAULT 'Yet To Start',
  `pid` int NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `created_by` int NOT NULL,
  PRIMARY KEY (`tid`),
  KEY `pid` (`pid`),
  KEY `created_by` (`created_by`),
  CONSTRAINT `tasks_ibfk_1` FOREIGN KEY (`pid`) REFERENCES `projects` (`pid`),
  CONSTRAINT `tasks_ibfk_2` FOREIGN KEY (`created_by`) REFERENCES `users` (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=162 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tasks`
--

LOCK TABLES `tasks` WRITE;
/*!40000 ALTER TABLE `tasks` DISABLE KEYS */;
/*!40000 ALTER TABLE `tasks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `uid` int NOT NULL AUTO_INCREMENT,
  `uname` varchar(25) COLLATE utf8mb4_unicode_ci NOT NULL,
  `firstname` varchar(25) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lastname` varchar(25) COLLATE utf8mb4_unicode_ci NOT NULL,
  `emailid` varchar(40) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` blob NOT NULL,
  `imagePath` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT 'default.png',
  PRIMARY KEY (`uid`),
  UNIQUE KEY `emailid` (`emailid`),
  UNIQUE KEY `uname` (`uname`)
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (53,'basith','basith','ahamed','basith@proapp.com',_binary '\�\�8�0k�\�ud\�1','default.png'),(54,'bharath','bharath','l','bharath@proapp.com',_binary '\�\�8�0k�\�ud\�1','default.png');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-04-04 10:09:58
