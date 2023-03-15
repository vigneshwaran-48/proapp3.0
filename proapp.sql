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
INSERT INTO `api_key` VALUES (49,_binary 'Jˆn…ùk¼3\ãRªFÎ¾ªmŸÁ.Á6\÷`±\à¥R9\ág\İ\"xu&3\Æ:\å,am'),(48,_binary '/M5…\Z\åL\ä\èPİ—\'Š\Â-7J\Â?\áA‡UN\Æ-g\İ\"xu&3\Æ:\å,am'),(50,_binary '1J ­\×şD)\Ê-™b>‘\å8\Ø\ÌQ\ÓÕ¯\ç>`g\İ\"xu&3\Æ:\å,am'),(51,_binary 'E\Şı“¦\å\Zr\ÓKúR±~fHHO–ƒ&‹bmÉµee{g\İ\"xu&3\Æ:\å,am'),(47,_binary 'iN\Z§eS#QÀ¯\\ü»Dıº\\‘!d\Ã­Á¹¡\"\Çg\İ\"xu&3\Æ:\å,am'),(52,_binary 'lÜ»?\ÆÀ\Ü6\Ş NrŒ²!·¦\Ş\Öø\ÏY3^\îVEg\İ\"xu&3\Æ:\å,am');
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
) ENGINE=InnoDB AUTO_INCREMENT=396 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
INSERT INTO `messages` VALUES (329,'2023-03-15','12:08:11',48,47,_binary 'oÀ’~¬\âÁ|¡©	ã³‚,'),(330,'2023-03-15','12:32:11',48,47,_binary '=X\èt\êsf¶\Å\÷cÈ‘~'),(331,'2023-03-15','12:32:21',47,48,_binary '\Ø\ê\ÒpšSÄ¯c\é\n#­9'),(332,'2023-03-15','12:56:34',51,49,_binary 'iªN@zZ\ßù|­\òœPmZÜ’\ô’¨\í\Å{‰]2}o?\òO\Ó²F\İ\'\áY'),(333,'2023-03-15','12:56:38',51,49,_binary 'g\İ\"xu&3\Æ:\å,am'),(334,'2023-03-15','13:39:12',48,49,_binary '>\ß,\Ô\ÕøD²´@0=A{8\õ<W\â–v^\Zš¦<*/&\é\Íby\nˆ`™%jèŸ’`\Å\Û)'),(335,'2023-03-15','13:39:24',48,49,_binary 'PÒ«i*…³\Êªl;}µ'),(336,'2023-03-15','13:50:47',48,49,_binary '*\ó\å\Åü9J\Èú~\è\á´PD'),(337,'2023-03-15','13:50:59',49,48,_binary '0á…€\ËGÁ\"\Â\Å'),(338,'2023-03-15','13:57:50',48,49,_binary 'oÀ’~¬\âÁ|¡©	ã³‚,'),(339,'2023-03-15','13:58:00',49,48,_binary '¸HÓµ{“Ç‚¦\Êx\Û\ãD\Â'),(340,'2023-03-15','14:33:39',48,49,_binary 'ºdÍ‘‘f\âa|9—À41\Ñ'),(341,'2023-03-15','14:33:47',49,48,_binary 'YŠ¥o,\öŠV/\Òo´\èú'),(342,'2023-03-15','14:37:56',49,48,_binary '1Aa¬\â\÷•¸¡c\á“Ò˜W\Ë'),(343,'2023-03-15','14:38:08',48,49,_binary '¸HÓµ{“Ç‚¦\Êx\Û\ãD\Â'),(344,'2023-03-15','14:44:47',48,49,_binary 'oÀ’~¬\âÁ|¡©	ã³‚,'),(345,'2023-03-15','14:44:52',49,48,_binary '¸HÓµ{“Ç‚¦\Êx\Û\ãD\Â'),(346,'2023-03-15','14:48:54',48,49,_binary '¸HÓµ{“Ç‚¦\Êx\Û\ãD\Â'),(347,'2023-03-15','14:48:59',49,48,_binary '\Úw\å\ëHû\Ô3I\óˆA•\È\é'),(348,'2023-03-15','14:54:00',48,49,_binary 'C©\Û|¢\ê\ç-Ï´a®+–†%'),(349,'2023-03-15','14:54:02',49,48,_binary '¸HÓµ{“Ç‚¦\Êx\Û\ãD\Â'),(350,'2023-03-15','14:57:10',48,49,_binary '¸HÓµ{“Ç‚¦\Êx\Û\ãD\Â'),(351,'2023-03-15','14:57:13',49,48,_binary '¸HÓµ{“Ç‚¦\Êx\Û\ãD\Â'),(352,'2023-03-15','15:01:36',48,49,_binary 'D@\Ô6\ë\ØQş\Î6\Ì=U‰\Z„'),(353,'2023-03-15','15:01:42',49,48,_binary '¸HÓµ{“Ç‚¦\Êx\Û\ãD\Â'),(354,'2023-03-15','15:17:48',48,49,_binary '1Aa¬\â\÷•¸¡c\á“Ò˜W\Ë'),(355,'2023-03-15','15:17:56',49,48,_binary '¼!\Şüß°\\&H \Å\È'),(356,'2023-03-15','15:39:14',48,49,_binary '¸HÓµ{“Ç‚¦\Êx\Û\ãD\Â'),(357,'2023-03-15','15:47:27',48,49,_binary '¡5¹0ƒ™ˆd/U5\İ\Æ™'),(358,'2023-03-15','15:47:34',49,48,_binary 'D@\Ô6\ë\ØQş\Î6\Ì=U‰\Z„'),(359,'2023-03-15','15:50:08',48,49,_binary 'l³\Ë^<³Ld\Â<\ë\ãŸ'),(360,'2023-03-15','15:50:19',49,48,_binary '¸HÓµ{“Ç‚¦\Êx\Û\ãD\Â'),(361,'2023-03-15','15:57:40',48,49,_binary 'w¡e&\åJ›¨Ï©w>¿'),(362,'2023-03-15','15:57:52',49,48,_binary 'D@\Ô6\ë\ØQş\Î6\Ì=U‰\Z„'),(363,'2023-03-15','16:16:14',48,49,_binary '\'em*Å¹°qÜƒhİ£V'),(364,'2023-03-15','16:16:20',49,48,_binary '¸HÓµ{“Ç‚¦\Êx\Û\ãD\Â'),(365,'2023-03-15','16:34:24',48,49,_binary '¸HÓµ{“Ç‚¦\Êx\Û\ãD\Â'),(366,'2023-03-15','16:34:30',49,48,_binary '\ó\r„\èlb$tqÀ{Ÿ®'),(367,'2023-03-15','16:48:23',48,49,_binary '/`îº«\Zü¼AM}\ó™X\Ş\È'),(368,'2023-03-15','16:48:31',49,48,_binary '\Í\ñEÀr¸iÖ©\n/|ø'),(369,'2023-03-15','16:48:37',48,49,_binary '<\Í\È[”G‰\ÏÉ°şW¥'),(370,'2023-03-15','17:03:25',49,48,_binary 'E8\×ú\æB\ßKiZ\Ë\ãl'),(371,'2023-03-15','17:05:31',48,49,_binary '¸HÓµ{“Ç‚¦\Êx\Û\ãD\Â'),(372,'2023-03-15','17:05:33',49,48,_binary '‚>B&\ğb H\0’²½}'),(373,'2023-03-15','17:18:35',49,48,_binary '*\ó\å\Åü9J\Èú~\è\á´PD'),(374,'2023-03-15','17:18:39',48,49,_binary '›ÔŸ¾…¬ƒû\çv\0\ÖS'),(375,'2023-03-15','17:23:13',49,48,_binary '\ğÙ‹¬	B¹\ÍIf\çÁ@3µ'),(376,'2023-03-15','17:23:19',48,49,_binary 'D@\Ô6\ë\ØQş\Î6\Ì=U‰\Z„'),(377,'2023-03-15','17:23:28',49,48,_binary '\Í\ñEÀr¸iÖ©\n/|ø'),(378,'2023-03-15','17:28:28',49,48,_binary '¸HÓµ{“Ç‚¦\Êx\Û\ãD\Â'),(379,'2023-03-15','17:28:36',48,49,_binary 'D@\Ô6\ë\ØQş\Î6\Ì=U‰\Z„'),(380,'2023-03-15','17:32:47',48,49,_binary '¸HÓµ{“Ç‚¦\Êx\Û\ãD\Â'),(381,'2023-03-15','17:33:12',48,49,_binary '¸HÓµ{“Ç‚¦\Êx\Û\ãD\Â'),(382,'2023-03-15','17:33:20',48,49,_binary 'D@\Ô6\ë\ØQş\Î6\Ì=U‰\Z„'),(383,'2023-03-15','17:33:30',49,48,_binary '¸HÓµ{“Ç‚¦\Êx\Û\ãD\Â'),(384,'2023-03-15','17:35:56',49,48,_binary '¸HÓµ{“Ç‚¦\Êx\Û\ãD\Â'),(385,'2023-03-15','17:37:23',48,49,_binary 'l³\Ë^<³Ld\Â<\ë\ãŸ'),(386,'2023-03-15','17:37:30',49,48,_binary '´ªSŸ¦ˆ­\ã[U]\ê—'),(387,'2023-03-15','17:40:57',48,47,_binary '\ÔIP¾\â\Ú…)ø\ÚSxùQûjyœƒ\ì\nNhFx’\Õ\Ã=d\Ë\Ö\æ>Š\Ä\êıv@ËœYI\ã\Û\í0\ßk\ì¬\æ¹X8\ß\î¯\ï\İ\'j\Ì9¤˜u¸Š+-\á\É!\Û>2¡‰o¤q{\Ô3>yµ#O\ö\Çp¨½Ê„\ê»{ˆu™™\0×»5«\ã¥\Ç1'),(388,'2023-03-15','17:43:45',48,52,_binary '0\÷Q\Û\ç·\æ5\ë\å<Ÿ‹‘'),(389,'2023-03-15','17:44:14',48,52,_binary '1±IgÃ²¢‚\èš\õ9v±\Ûznc\Ä\"|w\"ÿ„'),(390,'2023-03-15','17:44:18',48,52,_binary '/q|«Á®Ï™Œ\íŸ\Ç\÷\Í\ò'),(391,'2023-03-15','17:51:56',49,48,_binary '¸HÓµ{“Ç‚¦\Êx\Û\ãD\Â'),(392,'2023-03-15','17:52:09',48,49,_binary '1Aa¬\â\÷•¸¡c\á“Ò˜W\Ë'),(393,'2023-03-15','18:04:51',48,49,_binary '¸HÓµ{“Ç‚¦\Êx\Û\ãD\Â'),(394,'2023-03-15','18:04:58',48,49,_binary '¸HÓµ{“Ç‚¦\Êx\Û\ãD\Â'),(395,'2023-03-15','18:05:11',49,48,_binary '\Z—iÉ¦\ô&m°=\ä\î%');
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
) ENGINE=InnoDB AUTO_INCREMENT=315 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notification`
--

LOCK TABLES `notification` WRITE;
/*!40000 ALTER TABLE `notification` DISABLE KEYS */;
INSERT INTO `notification` VALUES (106,'Basith has Added you in Project','11:10:32','2023-03-15'),(107,'Basith has Added you in Project','11:14:23','2023-03-15'),(108,'Basith sent you a message','12:08:12','2023-03-15'),(109,'You have been assigned to a task by Vicky','12:29:43','2023-03-15'),(110,'Vicky working on Do the Assignments','12:29:55','2023-03-15'),(111,'Vicky deleted the task you Were in ','12:30:10','2023-03-15'),(112,'Basith has Added you in Project','12:32:03','2023-03-15'),(113,'Basith sent you a message','12:32:12','2023-03-15'),(114,'Vicky sent you a message','12:32:21','2023-03-15'),(115,'You have been assigned to a task by Basith','12:33:57','2023-03-15'),(116,'Basith working on Do documentation','12:34:56','2023-03-15'),(117,'Basith updated a project in which you have been participated','12:38:20','2023-03-15'),(118,'basi has Added you in Project','12:52:54','2023-03-15'),(119,'basi has Added you in Project','12:55:41','2023-03-15'),(120,'Sivasankar sent you a message','12:56:36','2023-03-15'),(121,'Sivasankar sent you a message','12:56:40','2023-03-15'),(122,'basi has Added you in Project','12:56:57','2023-03-15'),(123,'basi has Added you in Project','12:57:25','2023-03-15'),(124,'Sivasankar working on Meaner leaner','12:59:46','2023-03-15'),(125,'Sivasankar deleted the task you Were in ','13:00:04','2023-03-15'),(126,'basi has Added you in Project','13:05:20','2023-03-15'),(127,'basi has Added you in Project','13:07:35','2023-03-15'),(128,'basi has Added you in Project','13:10:51','2023-03-15'),(129,'Siva has Added you in Project','13:11:52','2023-03-15'),(130,'basi has Added you in Project','13:12:39','2023-03-15'),(131,'You have been assigned to a task by Siva','13:15:11','2023-03-15'),(132,'basi has Added you in Project','13:15:48','2023-03-15'),(133,'basi deleted the project you were in ','13:15:50','2023-03-15'),(134,'Bharath has Added you in Project','13:32:40','2023-03-15'),(135,'Bharath has Added you in Project','13:33:32','2023-03-15'),(136,'Bharath deleted the project you were in ','13:33:41','2023-03-15'),(137,'Siva has Added you in Project','13:35:03','2023-03-15'),(138,'basi has Added you in Project','13:38:07','2023-03-15'),(139,'You have been assigned to a task by basi','13:38:50','2023-03-15'),(140,'basi sent you a message','13:39:12','2023-03-15'),(142,'basi sent you a message','13:39:24','2023-03-15'),(143,'basi has Added you in Project','13:50:21','2023-03-15'),(144,'basi sent you a message','13:50:47','2023-03-15'),(145,'Bharath sent you a message','13:50:59','2023-03-15'),(146,'basi has Added you in Project','13:56:24','2023-03-15'),(148,'basi working on Feature Development','13:56:47','2023-03-15'),(149,'basi has Added you in Project','13:56:54','2023-03-15'),(150,'basi sent you a message','13:57:50','2023-03-15'),(151,'Bharath sent you a message','13:58:00','2023-03-15'),(152,'basi has Added you in Project','14:32:54','2023-03-15'),(153,'You have been assigned to a task by basi','14:33:29','2023-03-15'),(154,'basi sent you a message','14:33:39','2023-03-15'),(155,'Bharath sent you a message','14:33:47','2023-03-15'),(156,'Bharath has Added you in Project','14:37:11','2023-03-15'),(157,'You have been assigned to a task by Bharath','14:37:44','2023-03-15'),(158,'Bharath sent you a message','14:37:56','2023-03-15'),(159,'basi sent you a message','14:38:08','2023-03-15'),(160,'Bharath working on Feature Development','14:42:01','2023-03-15'),(161,'basi working on Feature Development','14:42:09','2023-03-15'),(162,'Bharath working on TestinG Task','14:42:15','2023-03-15'),(163,'basi working on DEmo Task','14:42:15','2023-03-15'),(164,'basi working on DEmo Task','14:42:21','2023-03-15'),(165,'Bharath exited from the project you were in ','14:43:05','2023-03-15'),(166,'basi has Added you in Project','14:43:59','2023-03-15'),(167,'You have been assigned to a task by basi','14:44:25','2023-03-15'),(168,'basi working on Feature Development','14:44:30','2023-03-15'),(169,'basi sent you a message','14:44:47','2023-03-15'),(170,'Bharath sent you a message','14:44:52','2023-03-15'),(171,'Bharath working on DEmo Task','14:45:59','2023-03-15'),(172,'Bharath working on deomo','14:46:06','2023-03-15'),(173,'basi working on Feature Development','14:46:55','2023-03-15'),(174,'basi has Added you in Project','14:48:07','2023-03-15'),(175,'You have been assigned to a task by basi','14:48:29','2023-03-15'),(176,'basi working on DEmo Task','14:48:39','2023-03-15'),(177,'basi sent you a message','14:48:54','2023-03-15'),(179,'basi has Added you in Project','14:53:06','2023-03-15'),(180,'You have been assigned to a task by basi','14:53:37','2023-03-15'),(181,'basi working on TestinG Task','14:53:42','2023-03-15'),(182,'basi sent you a message','14:54:00','2023-03-15'),(183,'Bharath sent you a message','14:54:02','2023-03-15'),(184,'basi has Added you in Project','14:56:26','2023-03-15'),(185,'You have been assigned to a task by basi','14:56:53','2023-03-15'),(186,'basi sent you a message','14:57:10','2023-03-15'),(187,'Bharath sent you a message','14:57:13','2023-03-15'),(188,'basi has Added you in Project','14:59:51','2023-03-15'),(189,'You have been assigned to a task by basi','15:00:26','2023-03-15'),(190,'basi working on sn','15:00:31','2023-03-15'),(191,'basi sent you a message','15:01:36','2023-03-15'),(192,'Bharath sent you a message','15:01:42','2023-03-15'),(193,'basi deleted the project you were in ','15:09:30','2023-03-15'),(194,'basi deleted the project you were in ','15:09:34','2023-03-15'),(195,'basi deleted the project you were in ','15:09:37','2023-03-15'),(196,'basi deleted the project you were in ','15:09:40','2023-03-15'),(197,'basi deleted the project you were in ','15:09:43','2023-03-15'),(198,'basi deleted the project you were in ','15:10:05','2023-03-15'),(199,'basi deleted the project you were in ','15:10:08','2023-03-15'),(200,'basi deleted the project you were in ','15:10:22','2023-03-15'),(201,'basi deleted the task you Were in ','15:10:34','2023-03-15'),(202,'basi has Added you in Project','15:17:03','2023-03-15'),(203,'You have been assigned to a task by basi','15:17:31','2023-03-15'),(204,'basi sent you a message','15:17:48','2023-03-15'),(205,'Bharath sent you a message','15:17:56','2023-03-15'),(206,'basi deleted the task you Were in ','15:21:03','2023-03-15'),(207,'basi deleted the project you were in ','15:25:40','2023-03-15'),(208,'basi has Added you in Project','15:38:42','2023-03-15'),(209,'You have been assigned to a task by basi','15:39:05','2023-03-15'),(210,'basi sent you a message','15:39:14','2023-03-15'),(211,'basi has Added you in Project','15:46:47','2023-03-15'),(212,'You have been assigned to a task by basi','15:47:08','2023-03-15'),(213,'basi working on Testi','15:47:17','2023-03-15'),(214,'basi working on Testi','15:47:19','2023-03-15'),(215,'basi sent you a message','15:47:27','2023-03-15'),(216,'Bharath sent you a message','15:47:34','2023-03-15'),(217,'basi working on Testi','15:48:47','2023-03-15'),(218,'Bharath working on Testi','15:48:54','2023-03-15'),(219,'basi sent you a message','15:50:08','2023-03-15'),(220,'Bharath sent you a message','15:50:19','2023-03-15'),(221,'Bharath exited from the task tsy','15:51:32','2023-03-15'),(222,'basi deleted the task you Were in ','15:54:09','2023-03-15'),(223,'basi deleted the task you Were in ','15:54:12','2023-03-15'),(224,'basi has Added you in Project','15:56:44','2023-03-15'),(225,'You have been assigned to a task by basi','15:57:19','2023-03-15'),(226,'basi sent you a message','15:57:40','2023-03-15'),(227,'Bharath sent you a message','15:57:52','2023-03-15'),(228,'basi working on cfmo','15:58:15','2023-03-15'),(229,'Bharath working on cfmo','15:58:40','2023-03-15'),(230,'basi working on cfmo','15:59:34','2023-03-15'),(231,'Bharath working on cfmo','16:02:19','2023-03-15'),(232,'basi working on cfmo','16:05:54','2023-03-15'),(233,'basi deleted the task you Were in ','16:05:56','2023-03-15'),(234,'Bharath working on Feature Development','16:15:03','2023-03-15'),(235,'Bharath working on Feature Development','16:15:08','2023-03-15'),(236,'basi has Added you in Project','16:15:24','2023-03-15'),(237,'You have been assigned to a task by basi','16:15:44','2023-03-15'),(238,'basi sent you a message','16:16:14','2023-03-15'),(239,'Bharath sent you a message','16:16:20','2023-03-15'),(240,'basi deleted the task you Were in ','16:29:15','2023-03-15'),(241,'basi has Added you in Project','16:31:42','2023-03-15'),(242,'You have been assigned to a task by basi','16:33:45','2023-03-15'),(243,'Bharath working on Tas1','16:33:54','2023-03-15'),(244,'basi working on Tas1','16:34:01','2023-03-15'),(245,'basi sent you a message','16:34:24','2023-03-15'),(246,'Bharath sent you a message','16:34:30','2023-03-15'),(247,'basi deleted the task you Were in ','16:36:03','2023-03-15'),(248,'basi deleted the project you were in ','16:41:35','2023-03-15'),(249,'basi deleted the project you were in ','16:41:37','2023-03-15'),(250,'basi deleted the project you were in ','16:41:47','2023-03-15'),(251,'basi deleted the project you were in ','16:41:52','2023-03-15'),(252,'basi exited from the task TestinG Task','16:43:39','2023-03-15'),(253,'Bharath deleted the task you Were in ','16:44:47','2023-03-15'),(254,'Bharath exited from the task Feature Development','16:44:49','2023-03-15'),(255,'basi has Added you in Project','16:47:36','2023-03-15'),(256,'You have been assigned to a task by basi','16:48:15','2023-03-15'),(257,'basi sent you a message','16:48:23','2023-03-15'),(258,'Bharath sent you a message','16:48:31','2023-03-15'),(259,'basi sent you a message','16:48:37','2023-03-15'),(260,'basi working on TESTV','16:49:27','2023-03-15'),(261,'Bharath working on TESTV','16:49:35','2023-03-15'),(262,'Bharath working on TESTV','16:49:37','2023-03-15'),(263,'Bharath working on TESTV','16:49:39','2023-03-15'),(264,'Bharath has Added you in Project','17:01:18','2023-03-15'),(265,'You have been assigned to a task by Bharath','17:02:02','2023-03-15'),(266,'Bharath sent you a message','17:03:25','2023-03-15'),(268,'Bharath sent you a message','17:05:33','2023-03-15'),(269,'Bharath working on DESG','17:08:14','2023-03-15'),(270,'You have been assigned to a task by Bharath','17:10:52','2023-03-15'),(271,'Bharath has Added you in Project','17:17:21','2023-03-15'),(272,'You have been assigned to a task by Bharath','17:18:18','2023-03-15'),(273,'Bharath sent you a message','17:18:35','2023-03-15'),(274,'basi sent you a message','17:18:39','2023-03-15'),(275,'Bharath deleted the task you Were in ','17:21:51','2023-03-15'),(276,'Bharath deleted the task you Were in ','17:21:52','2023-03-15'),(277,'Bharath has Added you in Project','17:22:36','2023-03-15'),(278,'You have been assigned to a task by Bharath','17:23:02','2023-03-15'),(279,'Bharath sent you a message','17:23:13','2023-03-15'),(280,'basi sent you a message','17:23:19','2023-03-15'),(281,'Bharath sent you a message','17:23:28','2023-03-15'),(282,'Bharath deleted the project you were in ','17:25:58','2023-03-15'),(283,'Bharath deleted the project you were in ','17:26:01','2023-03-15'),(284,'Bharath deleted the project you were in ','17:26:04','2023-03-15'),(285,'Bharath has Added you in Project','17:27:34','2023-03-15'),(286,'You have been assigned to a task by Bharath','17:28:06','2023-03-15'),(287,'basi working on DESG','17:28:13','2023-03-15'),(288,'Bharath sent you a message','17:28:28','2023-03-15'),(289,'basi sent you a message','17:28:36','2023-03-15'),(290,'basi has Added you in Project','17:31:03','2023-03-15'),(291,'basi sent you a message','17:32:47','2023-03-15'),(292,'basi sent you a message','17:33:12','2023-03-15'),(293,'basi sent you a message','17:33:20','2023-03-15'),(294,'Bharath sent you a message','17:33:30','2023-03-15'),(295,'Bharath sent you a message','17:35:56','2023-03-15'),(296,'basi has Added you in Project','17:36:33','2023-03-15'),(297,'You have been assigned to a task by basi','17:37:05','2023-03-15'),(298,'basi sent you a message','17:37:23','2023-03-15'),(300,'basi sent you a message','17:40:57','2023-03-15'),(301,'basi sent you a message','17:43:45','2023-03-15'),(302,'basi sent you a message','17:44:14','2023-03-15'),(303,'basi sent you a message','17:44:18','2023-03-15'),(304,'Bharath sent you a message','17:51:56','2023-03-15'),(306,'basi has Added you in Project','18:02:36','2023-03-15'),(307,'You have been assigned to a task by basi','18:03:23','2023-03-15'),(308,'basi working on task gokul','18:03:37','2023-03-15'),(309,'basi sent you a message','18:04:51','2023-03-15'),(310,'basi sent you a message','18:04:58','2023-03-15'),(311,'Bharath sent you a message','18:05:11','2023-03-15'),(312,'basi deleted the project you were in ','18:08:04','2023-03-15'),(313,'Bharath deleted the project you were in ','18:08:13','2023-03-15'),(314,'Bharath deleted the project you were in ','18:08:21','2023-03-15');
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
INSERT INTO `notification_relation` VALUES (108,47),(113,47),(123,47),(126,47),(127,47),(128,47),(129,47),(131,47),(143,47),(149,47),(152,47),(153,47),(156,47),(157,47),(162,47),(163,47),(164,47),(165,47),(166,47),(171,47),(174,47),(175,47),(176,47),(179,47),(180,47),(181,47),(184,47),(188,47),(189,47),(190,47),(202,47),(208,47),(209,47),(211,47),(221,47),(224,47),(236,47),(241,47),(242,47),(243,47),(244,47),(252,47),(255,47),(271,47),(277,47),(285,47),(290,47),(114,48),(124,48),(134,48),(135,48),(145,48),(151,48),(155,48),(156,48),(157,48),(158,48),(160,48),(170,48),(172,48),(183,48),(187,48),(192,48),(205,48),(216,48),(218,48),(220,48),(227,48),(229,48),(231,48),(234,48),(235,48),(239,48),(246,48),(254,48),(258,48),(261,48),(262,48),(263,48),(264,48),(265,48),(266,48),(268,48),(269,48),(270,48),(272,48),(273,48),(278,48),(279,48),(281,48),(286,48),(288,48),(294,48),(295,48),(304,48),(311,48),(109,49),(110,49),(115,49),(116,49),(123,49),(130,49),(132,49),(138,49),(139,49),(140,49),(142,49),(144,49),(148,49),(149,49),(150,49),(154,49),(159,49),(161,49),(167,49),(168,49),(169,49),(173,49),(177,49),(182,49),(185,49),(186,49),(191,49),(203,49),(204,49),(210,49),(212,49),(213,49),(214,49),(215,49),(217,49),(219,49),(225,49),(226,49),(228,49),(230,49),(232,49),(237,49),(238,49),(245,49),(256,49),(257,49),(259,49),(260,49),(274,49),(280,49),(287,49),(289,49),(290,49),(292,49),(293,49),(296,49),(297,49),(298,49),(310,49),(137,52);
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
INSERT INTO `project_relation` VALUES (245,48),(245,50),(245,49),(247,52),(247,51),(248,49),(248,48),(259,47),(259,49),(259,48),(264,47),(264,49),(264,50),(264,48),(265,47),(265,49),(265,48),(270,47),(270,49),(270,48),(271,49),(271,48),(272,47),(272,48),(272,50),(272,49);
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
) ENGINE=InnoDB AUTO_INCREMENT=274 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projects`
--

LOCK TABLES `projects` WRITE;
/*!40000 ALTER TABLE `projects` DISABLE KEYS */;
INSERT INTO `projects` VALUES (245,'Chat Module','Yet To Start','2023-03-15','2023-03-31','Do it ASAP!',49),(247,'Brace Yourself','Yet To Start','2023-03-15','2023-03-15','Hi',51),(248,'Marutham','On Progress','2023-03-15','2023-03-15','description',48),(259,'Test','Yet To Start','2023-03-15','2023-03-16','Testing',48),(264,'Demo','Yet To Start','2023-03-15','2023-09-25','Pro App project',48),(265,'Demo','Yet To Start','2023-03-15','2023-03-17','test',48),(270,'Demo','Yet To Start','2023-03-15','2023-03-15','ghvb',48),(271,'Demooo PROje','Yet To Start','2023-03-15','2023-03-17','demo',48),(272,'demo','On Progress','2023-03-15','2023-03-17','description',49);
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
INSERT INTO `task_relation` VALUES (138,48,'true'),(152,49,'true'),(152,48,'true'),(153,48,'true'),(153,49,'true'),(156,48,'false'),(156,49,'false'),(157,48,'false'),(157,49,'false'),(158,49,'false'),(158,48,'false'),(159,47,'false'),(159,50,'false'),(159,49,'false'),(160,47,'false'),(160,48,'false'),(160,49,'true');
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
) ENGINE=InnoDB AUTO_INCREMENT=162 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tasks`
--

LOCK TABLES `tasks` WRITE;
/*!40000 ALTER TABLE `tasks` DISABLE KEYS */;
INSERT INTO `tasks` VALUES (138,'Feature Development','2023-03-15','2023-03-15','Completed',248,'Get it done',48),(152,'TESTV','2023-03-15','2023-03-15','Completed',248,'DEMO',48),(153,'DESG','2023-03-15','2023-03-15','Completed',248,'DFSD',49),(156,'deko','2023-03-15','2023-03-15','Yet To Start',248,'doe',49),(157,'tesy','2023-03-15','2023-03-15','Yet To Start',248,'sbc',49),(158,'demooo','2023-03-15','2023-03-15','Yet To Start',248,'demo',48),(159,'sehg','2023-03-15','2023-03-24','Yet To Start',264,'ghjyf',49),(160,'demo task','2023-03-15','2023-03-15','On Progress',272,'derkjhkkh',49);
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
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (47,'Vicky','Vicky','Warren','vicky@proapp.com',_binary '\â\è8º0k€\Âud\å1','47.jpeg'),(48,'basi','Basith','Ahamed','basith@proapp.com',_binary '\â\è8º0k€\Âud\å1','48.png'),(49,'Bharath','Bharath','L','bharath@proapp.com',_binary '\â\è8º0k€\Âud\å1','49.jpeg'),(50,'Harish','Harish','M.S.','m416harish@gamil.com',_binary 'f\×&\Ôş©¢¶x+\'tJ¬','50.jpeg'),(51,'Siva','Sivasankar','G','siva17@proapp.com',_binary '\â\è8º0k€\Âud\å1','51.png'),(52,'Vigneshwaran','Vigneshwaran','P','p3487260@gmail.com',_binary 'D~ãˆ9\í?ı:5›=','52.png');
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

-- Dump completed on 2023-03-15 18:08:28
