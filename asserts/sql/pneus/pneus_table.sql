CREATE TABLE IF NOT EXISTS `pneus` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `dimension` varchar(255) NOT NULL DEFAULT '0',
  `brand` varchar(255) NOT NULL DEFAULT '0',
  `pr` varchar(255) NOT NULL DEFAULT '0',
  `type` varchar(255) NOT NULL DEFAULT '0',
  `number` varchar(255) NOT NULL DEFAULT '0',
  `registry` varchar(255) NOT NULL DEFAULT '0',
  `new` tinyint(2) unsigned NOT NULL DEFAULT '0',
  `recachutado` tinyint(2) unsigned NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);