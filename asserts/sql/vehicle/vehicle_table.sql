CREATE TABLE IF NOT EXISTS `vehicles` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `number_car` varchar(255) NOT NULL DEFAULT '0',
  `brand` varchar(255) NOT NULL DEFAULT '0',
  `type` varchar(255) NOT NULL DEFAULT '0',
  `year` varchar(255) NOT NULL DEFAULT '0',
  `plate` varchar(255) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1;