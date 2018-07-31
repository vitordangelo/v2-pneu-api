CREATE TABLE IF NOT EXISTS `pneus_instaled` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `vehicle_id` int(10) unsigned NOT NULL DEFAULT '0',
  `pneu_id` int(10) unsigned NOT NULL DEFAULT '0',
  `date` date DEFAULT NULL,
  `eixo` varchar(255) NOT NULL DEFAULT '0',
  `obs` varchar(255) NOT NULL DEFAULT '0',
  `odometer_instaled` varchar(255) NOT NULL DEFAULT '0',
  `position` varchar(255) NOT NULL DEFAULT '0',
  `side` varchar(255) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `FK_pneus_instaled_vehicles` (`vehicle_id`),
  CONSTRAINT `FK_pneus_instaled_vehicles` FOREIGN KEY (`vehicle_id`) REFERENCES `vehicles` (`id`),
  KEY `FK_pneus_instaled_pneus` (`pneu_id`),
  CONSTRAINT `FK_pneus_instaled_pneus` FOREIGN KEY (`pneu_id`) REFERENCES `pneus` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1;