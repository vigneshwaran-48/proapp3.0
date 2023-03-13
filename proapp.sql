-- MySQL dump 10.13  Distrib 8.0.32, for Linux (x86_64)
--
-- Host: localhost    Database: proapp
-- ------------------------------------------------------
-- Server version	8.0.32-0ubuntu0.20.04.2

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
-- Table structure for table `messages`
--
DROP DATABASE IF EXISTS `proapp`;
CREATE DATABASE `proapp`;
USE `proapp`;

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `messages` (
  `mid` int NOT NULL AUTO_INCREMENT,
  `messageDate` date NOT NULL,
  `messageTime` time NOT NULL,
  `fromUser` int NOT NULL,
  `toUser` int NOT NULL,
  `message` text NOT NULL,
  PRIMARY KEY (`mid`),
  KEY `fromUser` (`fromUser`),
  KEY `toUser` (`toUser`),
  CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`fromUser`) REFERENCES `users` (`uid`),
  CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`toUser`) REFERENCES `users` (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=276 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
INSERT INTO `messages` VALUES (261,'2023-03-08','18:36:18',1,2,'hi'),(262,'2023-03-08','18:36:34',2,1,'enna da'),(263,'2023-03-09','10:00:34',2,1,'hello bro'),(264,'2023-03-09','14:02:23',1,2,'hu'),(265,'2023-03-09','14:02:30',1,2,'dd'),(266,'2023-03-09','14:02:43',1,2,'ddgfdg'),(267,'2023-03-09','14:02:58',1,2,'kjnkjhbjvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv'),(268,'2023-03-09','18:25:29',2,1,'helo'),(269,'2023-03-10','12:10:37',2,1,'hello'),(270,'2023-03-10','12:10:40',2,1,'hi'),(271,'2023-03-10','12:10:47',2,1,'hi'),(272,'2023-03-10','12:10:51',2,1,'hkjjh'),(273,'2023-03-10','12:10:56',1,2,'ghfy'),(274,'2023-03-10','18:38:59',39,2,'hi bro'),(275,'2023-03-10','18:39:09',39,2,'hlo bro');
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
  `message` varchar(60) NOT NULL,
  `n_time` time NOT NULL,
  `n_date` date NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`nid`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `notification_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notification`
--

LOCK TABLES `notification` WRITE;
/*!40000 ALTER TABLE `notification` DISABLE KEYS */;
/*!40000 ALTER TABLE `notification` ENABLE KEYS */;
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
INSERT INTO `project_relation` VALUES (158,1),(158,2),(159,1),(159,38),(159,2),(160,1),(160,38),(160,2),(161,1),(161,38),(162,1),(162,38),(163,38),(163,2),(164,1),(164,38),(166,1),(166,2),(166,39);
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
  `pname` varchar(30) NOT NULL,
  `status` enum('Yet To Start','On Progress','Completed','Cancelled') DEFAULT 'Yet To Start',
  `fromdate` date NOT NULL,
  `todate` date NOT NULL,
  `comment` text,
  `created_by` int NOT NULL,
  PRIMARY KEY (`pid`),
  KEY `created_by` (`created_by`),
  CONSTRAINT `projects_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `users` (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=167 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projects`
--

LOCK TABLES `projects` WRITE;
/*!40000 ALTER TABLE `projects` DISABLE KEYS */;
INSERT INTO `projects` VALUES (158,'Testing','Completed','2023-03-09','2023-03-11','cdsv',2),(159,'veeb','Yet To Start','2023-03-09','2023-03-09','vrbe',2),(160,'vrrww','Yet To Start','2023-03-09','2023-03-24','vrv',2),(161,'vrbwr','Yet To Start','2023-03-01','2023-03-03','cev',2),(162,'ewwvqveq','Yet To Start','2023-02-28','2023-03-02','ve',2),(163,'fdbrbe','Yet To Start','2023-03-09','2023-03-09','vwe',2),(164,'brr','Yet To Start','2023-02-28','2023-03-01','brnr',2),(165,'tesr','Yet To Start','2023-03-09','2023-03-09','dgdgd',2),(166,'Trip','On Progress','2023-03-10','2023-03-18','Task to test',39);
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
  `IsCompleted` enum('true','false') DEFAULT 'false',
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
INSERT INTO `task_relation` VALUES (114,1,'true'),(114,2,'true'),(115,1,'true'),(115,2,'true'),(116,1,'false'),(116,39,'true');
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
  `tname` varchar(25) NOT NULL,
  `fromdate` date NOT NULL,
  `todate` date NOT NULL,
  `status` enum('Yet To Start','On Progress','Completed','Cancelled') DEFAULT 'Yet To Start',
  `pid` int NOT NULL,
  `description` text,
  `created_by` int NOT NULL,
  PRIMARY KEY (`tid`),
  KEY `pid` (`pid`),
  KEY `created_by` (`created_by`),
  CONSTRAINT `tasks_ibfk_1` FOREIGN KEY (`pid`) REFERENCES `projects` (`pid`),
  CONSTRAINT `tasks_ibfk_2` FOREIGN KEY (`created_by`) REFERENCES `users` (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=117 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tasks`
--

LOCK TABLES `tasks` WRITE;
/*!40000 ALTER TABLE `tasks` DISABLE KEYS */;
INSERT INTO `tasks` VALUES (114,'Tetsing task','2023-03-02','2023-03-09','Completed',158,'vberdb',2),(115,'Testing task 22','2023-03-09','2023-03-09','Completed',158,'vdfn',2),(116,'React','2023-03-10','2023-03-12','On Progress',166,'task 1',39);
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
  `uname` varchar(25) NOT NULL,
  `firstname` varchar(25) NOT NULL,
  `lastname` varchar(25) NOT NULL,
  `emailid` varchar(40) NOT NULL,
  `password` blob NOT NULL,
  `imagePath` varchar(255) DEFAULT 'default.png',
  PRIMARY KEY (`uid`),
  UNIQUE KEY `emailid` (`emailid`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Bharath','Bharath','L','bharath@proapp.com',_binary '\�\�8�0k�\�ud\�1','1.png'),(2,'Basith','Basith','Ahamed','basith@proapp.com',_binary '\�\�8�0k�\�ud\�1','2.jpeg'),(38,'vicky','vicky','p','vicky@proapp.com',_binary '\�\�8�0k�\�ud\�1','default.png'),(39,'Tester','Tester','Case','test@gmail.com',_binary 't5ی��\�N~B�z��','default.png'),(40,'tester','tester','mee','testerme@proapp.com',_binary '\�\�8�0k�\�ud\�1','default.png');
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

-- Dump completed on 2023-03-10 19:15:38
