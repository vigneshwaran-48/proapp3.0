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
-- Table structure for table `api_key`
--

DROP DATABASE IF EXISTS `proapp`;
CREATE DATABASE `proapp`;
USE `proapp`;

DROP TABLE IF EXISTS `api_key`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `api_key` (
  `uid` int NOT NULL,
  `a_key` varbinary(1000) NOT NULL,
  PRIMARY KEY (`uid`,`a_key`),
  UNIQUE KEY `a_key` (`a_key`),
  CONSTRAINT `api_key_ibfk_1` FOREIGN KEY (`uid`) REFERENCES `users` (`uid`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_key`
--

LOCK TABLES `api_key` WRITE;
/*!40000 ALTER TABLE `api_key` DISABLE KEYS */;
INSERT INTO `api_key` VALUES (49,_binary '�J�n���k�3\�R�Fξ�m��.�6\�`�\�R9\�g\�\"xu&3\�:\�,am�'),(48,_binary '/M5�\Z\�L\�\�Pݗ\'�\�-7J\�?\�A�UN\�-g\�\"xu&3\�:\�,am�'),(47,_binary 'iN\Z�eS#Q��\\��D��\\�!d\�����\"\�g\�\"xu&3\�:\�,am�');
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
) ENGINE=InnoDB AUTO_INCREMENT=323 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
INSERT INTO `messages` VALUES (317,'2023-03-14','17:29:11',48,47,_binary '5���s��#\�\"�]J'),(318,'2023-03-14','17:29:13',48,47,_binary '5���s��#\�\"�]J'),(319,'2023-03-14','17:43:22',48,47,_binary 'D@\�6\�\�Q�\�6\�=U�\Z�'),(320,'2023-03-14','18:08:44',48,47,_binary 'D@\�6\�\�Q�\�6\�=U�\Z�'),(321,'2023-03-14','19:26:45',49,48,_binary '*\�\�\��9J\��~\�\�PD'),(322,'2023-03-14','19:26:52',48,49,_binary '^6v�8\�A\�\�\'��]t');
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
  PRIMARY KEY (`nid`)
) ENGINE=InnoDB AUTO_INCREMENT=99 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notification`
--

LOCK TABLES `notification` WRITE;
/*!40000 ALTER TABLE `notification` DISABLE KEYS */;
INSERT INTO `notification` VALUES (28,'Vicky has Added you in Project','14:59:58','2023-03-13'),(29,'You have been assigned to a task by Vicky','15:00:44','2023-03-13'),(31,'Vicky exited from the task Chatting Reciver module','15:51:54','2023-03-13'),(32,'Vicky exited from the task Urgent','15:52:03','2023-03-13'),(33,'Vicky exited from the task DO tthiss','15:52:11','2023-03-13'),(34,'Vicky exited from the task finish this','15:52:12','2023-03-13'),(35,'Vicky sent you a message','15:52:38','2023-03-13'),(36,'Basith deleted the task you Were in ','16:05:36','2023-03-13'),(37,'Basith deleted the task you Were in ','16:05:39','2023-03-13'),(38,'Basith has Added you in Project','16:07:30','2023-03-13'),(39,'You have been assigned to a task by Basith','17:23:03','2023-03-13'),(44,'Bharath sent you a message','18:31:37','2023-03-13'),(46,'Bharath sent you a message','18:32:26','2023-03-13'),(62,'Basith sent you a message','19:13:39','2023-03-13'),(65,'Basith sent you a message','19:14:03','2023-03-13'),(67,'Bharath exited from the task Chatting Reciver module','19:21:52','2023-03-13'),(68,'Bharath exited from the task Urgent','19:22:00','2023-03-13'),(69,'Bharath exited from the task CodeServer Backend','19:22:23','2023-03-13'),(70,'Basith deleted the task you Were in ','19:23:04','2023-03-13'),(71,'Basith has Added you in Project','16:55:34','2023-03-14'),(72,'Basith sent you a message','17:29:11','2023-03-14'),(73,'Basith sent you a message','17:29:13','2023-03-14'),(74,'Basith has Added you in Project','17:38:36','2023-03-14'),(75,'Basith has Added you in Project','17:39:53','2023-03-14'),(76,'Basith has Added you in Project','17:40:17','2023-03-14'),(77,'You have been assigned to a task by Basith','17:40:41','2023-03-14'),(78,'Basith working on JHvhrvv','17:40:44','2023-03-14'),(79,'Basith working on JHvhrvv','17:41:38','2023-03-14'),(80,'Basith working on JHvhrvv','17:42:14','2023-03-14'),(81,'Basith working on JHvhrvv','17:42:18','2023-03-14'),(82,'Basith working on JHvhrvv','17:42:20','2023-03-14'),(83,'You have been assigned to a task by Basith','17:42:32','2023-03-14'),(84,'Basith sent you a message','17:43:22','2023-03-14'),(85,'Basith has Added you in Project','17:45:10','2023-03-14'),(86,'You have been assigned to a task by Basith','17:45:26','2023-03-14'),(87,'Basith deleted the task you Were in ','17:51:02','2023-03-14'),(88,'Basith deleted the task you Were in ','17:51:04','2023-03-14'),(89,'Basith deleted the task you Were in ','17:51:06','2023-03-14'),(90,'You have been assigned to a task by Basith','18:08:25','2023-03-14'),(91,'Basith working on Testhbjrhe','18:08:29','2023-03-14'),(92,'Basith working on Testhbjrhe','18:08:30','2023-03-14'),(93,'Basith working on Testhbjrhe','18:08:33','2023-03-14'),(94,'Basith working on Testhbjrhe','18:08:35','2023-03-14'),(95,'Basith sent you a message','18:08:44','2023-03-14'),(96,'Basith deleted the task you Were in ','18:12:52','2023-03-14'),(97,'Bharath sent you a message','19:26:45','2023-03-14'),(98,'Basith sent you a message','19:26:52','2023-03-14');
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notification_relation`
--

LOCK TABLES `notification_relation` WRITE;
/*!40000 ALTER TABLE `notification_relation` DISABLE KEYS */;
INSERT INTO `notification_relation` VALUES (84,47),(85,47),(86,47),(90,47),(91,47),(92,47),(93,47),(94,47),(95,47),(97,48),(85,49),(86,49),(90,49),(91,49),(92,49),(93,49),(94,49),(98,49);
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_relation`
--

LOCK TABLES `project_relation` WRITE;
/*!40000 ALTER TABLE `project_relation` DISABLE KEYS */;
INSERT INTO `project_relation` VALUES (221,47),(221,49),(221,48),(222,47),(222,49),(222,48),(223,47),(223,49),(223,48),(224,47),(224,49),(224,48),(225,47),(225,49),(225,48),(226,47),(226,49),(226,48),(227,47),(227,49),(227,48);
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
) ENGINE=InnoDB AUTO_INCREMENT=228 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projects`
--

LOCK TABLES `projects` WRITE;
/*!40000 ALTER TABLE `projects` DISABLE KEYS */;
INSERT INTO `projects` VALUES (221,'cehvbjrem','Yet To Start','2023-03-14','2023-03-14','vmn vnwm vr',48),(222,'Testing','Yet To Start','2023-03-14','2023-03-14','i am from testing',48),(223,'Testing token','Yet To Start','2023-03-14','2023-03-14','evhw bvv',48),(224,'Testing token 002','Yet To Start','2023-03-14','2023-03-14','rhbvwjb vw',48),(225,'Tetsifw','Yet To Start','2023-03-14','2023-03-14','cvnb ner',48),(226,'JHVhjvv','On Progress','2023-03-14','2023-03-14','cv nb w',48),(227,'de nwe vrw','Yet To Start','2023-03-14','2023-03-14','mvr nbw',48);
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
) ENGINE=InnoDB AUTO_INCREMENT=134 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
  `uname` varchar(25) NOT NULL,
  `firstname` varchar(25) NOT NULL,
  `lastname` varchar(25) NOT NULL,
  `emailid` varchar(40) NOT NULL,
  `password` blob NOT NULL,
  `imagePath` varchar(255) DEFAULT 'default.png',
  PRIMARY KEY (`uid`),
  UNIQUE KEY `emailid` (`emailid`),
  UNIQUE KEY `uname` (`uname`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (47,'Vicky','Vicky','Warren','vicky@proapp.com',_binary '\�\�8�0k�\�ud\�1','default.png'),(48,'Basith','Basith','Ahamed','basith@proapp.com',_binary '\�\�8�0k�\�ud\�1','48.jpeg'),(49,'Bharath','Bharath','L','bharath@proapp.com',_binary '\�\�8�0k�\�ud\�1','49.jpeg');
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

-- Dump completed on 2023-03-14 19:41:29
