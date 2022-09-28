/*Table structure for table `activity_group` */

DROP TABLE IF EXISTS `activity_group`;

CREATE TABLE `activity_group` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `activity_group` */

/*Table structure for table `todo_items` */

DROP TABLE IF EXISTS `todo_items`;

CREATE TABLE `todo_items` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `activity_group_id` bigint(20) NOT NULL,
  `title` varchar(255) NOT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `priority` enum('very-low','low','medium','high','very-high') NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `activity_group_id` (`activity_group_id`),
  CONSTRAINT `todo_items_ibfk_1` FOREIGN KEY (`activity_group_id`) REFERENCES `activity_group` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `todo_items` */

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
