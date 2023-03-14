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
  `message` mediumblob NOT NULL,
  PRIMARY KEY (`mid`),
  KEY `fromUser` (`fromUser`),
  KEY `toUser` (`toUser`),
  CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`fromUser`) REFERENCES `users` (`uid`),
  CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`toUser`) REFERENCES `users` (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=317 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
INSERT INTO `messages` VALUES (298,'2023-02-23','18:33:02',2,1,_binary '�T�\���~\�tl�O\�2\�\0B�\�\�\�\��\�\�'),(299,'2023-03-13','19:12:54',1,2,_binary '*\�\�\��9J\��~\�\�PD'),(300,'2023-03-13','19:12:59',2,1,_binary '�$\"0��\�U��\�\�\��\�'),(301,'2023-03-13','19:13:20',2,1,_binary 'i\�K\�E�I\�\�\\�=\"\�'),(302,'2023-03-13','19:13:26',2,1,_binary '\���\�!�G{�lɸ\�'),(303,'2023-03-13','19:13:28',2,1,_binary '>oRё��D��EnDF'),(304,'2023-03-13','19:13:29',2,1,_binary 'k�jX-V^\��U\�\�5\�'),(305,'2023-03-13','19:13:30',2,1,_binary 'k�jX-V^\��U\�\�5\�'),(306,'2023-03-13','19:13:31',2,1,_binary 'oN?]�4\�Z��\��#\�'),(307,'2023-03-13','19:13:31',2,1,_binary 'oN?]�4\�Z��\��#\�'),(308,'2023-03-13','19:13:32',2,1,_binary 'g\�\"xu&3\�:\�,am�'),(309,'2023-03-13','19:13:38',2,1,_binary 'g\�\"xu&3\�:\�,am�'),(310,'2023-03-13','19:13:38',2,1,_binary 'g\�\"xu&3\�:\�,am�'),(311,'2023-03-13','19:13:38',2,1,_binary 'g\�\"xu&3\�:\�,am�'),(312,'2023-03-13','19:13:39',2,1,_binary 'g\�\"xu&3\�:\�,am�'),(313,'2023-03-13','19:13:39',2,1,_binary 'g\�\"xu&3\�:\�,am�'),(314,'2023-03-13','19:13:51',1,2,_binary 'g\�\"xu&3\�:\�,am�'),(315,'2023-03-13','19:14:03',2,1,_binary '\�\�\�Z\�Թ�vO\�HIS'),(316,'2023-03-13','19:14:12',1,2,_binary '�Hӵ{�ǂ�\�x\�\�D\�');
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
) ENGINE=InnoDB AUTO_INCREMENT=71 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notification`
--

LOCK TABLES `notification` WRITE;
/*!40000 ALTER TABLE `notification` DISABLE KEYS */;
INSERT INTO `notification` VALUES (28,'Vicky has Added you in Project','14:59:58','2023-03-13'),(29,'You have been assigned to a task by Vicky','15:00:44','2023-03-13'),(31,'Vicky exited from the task Chatting Reciver module','15:51:54','2023-03-13'),(32,'Vicky exited from the task Urgent','15:52:03','2023-03-13'),(33,'Vicky exited from the task DO tthiss','15:52:11','2023-03-13'),(34,'Vicky exited from the task finish this','15:52:12','2023-03-13'),(35,'Vicky sent you a message','15:52:38','2023-03-13'),(36,'Basith deleted the task you Were in ','16:05:36','2023-03-13'),(37,'Basith deleted the task you Were in ','16:05:39','2023-03-13'),(38,'Basith has Added you in Project','16:07:30','2023-03-13'),(39,'You have been assigned to a task by Basith','17:23:03','2023-03-13'),(40,'Basith sent you a message','18:22:24','2023-03-13'),(41,'Bharath sent you a message','18:22:28','2023-03-13'),(42,'Bharath sent you a message','18:31:00','2023-03-13'),(43,'Bharath sent you a message','18:31:19','2023-03-13'),(44,'Bharath sent you a message','18:31:37','2023-03-13'),(45,'Bharath sent you a message','18:31:53','2023-03-13'),(46,'Bharath sent you a message','18:32:26','2023-03-13'),(47,'Bharath sent you a message','18:32:41','2023-03-13'),(48,'Bharath sent you a message','18:33:01','2023-03-13'),(49,'Bharath sent you a message','19:12:54','2023-03-13'),(50,'Basith sent you a message','19:12:59','2023-03-13'),(51,'Basith sent you a message','19:13:20','2023-03-13'),(52,'Basith sent you a message','19:13:26','2023-03-13'),(53,'Basith sent you a message','19:13:28','2023-03-13'),(54,'Basith sent you a message','19:13:29','2023-03-13'),(55,'Basith sent you a message','19:13:30','2023-03-13'),(57,'Basith sent you a message','19:13:31','2023-03-13'),(58,'Basith sent you a message','19:13:32','2023-03-13'),(60,'Basith sent you a message','19:13:38','2023-03-13'),(61,'Basith sent you a message','19:13:38','2023-03-13'),(62,'Basith sent you a message','19:13:39','2023-03-13'),(63,'Basith sent you a message','19:13:39','2023-03-13'),(64,'Bharath sent you a message','19:13:51','2023-03-13'),(65,'Basith sent you a message','19:14:03','2023-03-13'),(66,'Bharath sent you a message','19:14:12','2023-03-13'),(67,'Bharath exited from the task Chatting Reciver module','19:21:52','2023-03-13'),(68,'Bharath exited from the task Urgent','19:22:00','2023-03-13'),(69,'Bharath exited from the task CodeServer Backend','19:22:23','2023-03-13'),(70,'Basith deleted the task you Were in ','19:23:04','2023-03-13');
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
INSERT INTO `notification_relation` VALUES (28,1),(29,1),(40,1),(50,1),(51,1),(52,1),(53,1),(54,1),(55,1),(57,1),(58,1),(60,1),(61,1),(62,1),(63,1),(65,1),(41,2),(42,2),(43,2),(45,2),(46,2),(47,2),(48,2),(49,2),(64,2),(66,2),(28,39),(29,39),(28,40);
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
INSERT INTO `project_relation` VALUES (203,1),(203,38),(203,2),(205,1),(205,2),(206,1),(206,38),(206,2),(210,1),(210,2),(216,1),(216,39),(216,40),(216,2);
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
) ENGINE=InnoDB AUTO_INCREMENT=221 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projects`
--

LOCK TABLES `projects` WRITE;
/*!40000 ALTER TABLE `projects` DISABLE KEYS */;
INSERT INTO `projects` VALUES (203,'Chatting Module','On Progress','2023-03-13','2023-03-13','Finish Chatting Module ASAP!!',2),(205,'Testing Report','Yet To Start','2023-03-13','2023-03-13','For the Review',2),(206,'Module Review','Completed','2023-03-13','2023-03-13','Finish the Pending Review',2),(210,'Reciever Module For Chat','Yet To Start','2023-03-13','2023-03-14','Finish this ASAP!!',2),(216,'Testing 001','Yet To Start','2023-03-13','2023-03-13','rkbjwhv rr',2);
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
INSERT INTO `task_relation` VALUES (120,2,'true'),(121,2,'true');
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
) ENGINE=InnoDB AUTO_INCREMENT=130 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tasks`
--

LOCK TABLES `tasks` WRITE;
/*!40000 ALTER TABLE `tasks` DISABLE KEYS */;
INSERT INTO `tasks` VALUES (120,'Chatting Reciver module','2023-03-13','2023-03-13','Completed',203,'COde this',2),(121,'Urgent','2023-03-13','2023-03-13','On Progress',203,'Do this',2);
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
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Bharath','Bharath','L','bharath@proapp.com',_binary '\�\�8�0k�\�ud\�1','1.png'),(2,'Basith','Basith','Ahamed','basith@proapp.com',_binary '\�\�8�0k�\�ud\�1','2.jpeg'),(38,'Vicky','vicky','p','vicky@proapp.com',_binary '\�\�8�0k�\�ud\�1','38.jpeg'),(39,'Tester','Tester','Case','test@gmail.com',_binary 't5ی��\�N~B�z��','default.png'),(40,'tester','tester','mee','testerme@proapp.com',_binary '\�\�8�0k�\�ud\�1','default.png'),(41,'demouser','demouser','demo','demo@demo.com',_binary '\�\�8�0k�\�ud\�1','default.png'),(42,'fortesting','fortesting','fortesting','testing@tss.com',_binary '\�\�8�0k�\�ud\�1','default.png'),(43,'hibro','hibro','hellobro','hello@proapp.com',_binary '\�\�8�0k�\�ud\�1','default.png');
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

-- Dump completed on 2023-03-14  9:41:41
