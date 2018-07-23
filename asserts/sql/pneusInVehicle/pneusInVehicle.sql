CREATE TABLE IF NOT EXISTS `pneus_in_vehicles` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `vehicle` varchar(255) NOT NULL DEFAULT '0',
  `eixoDianteiroEsquerdo` varchar(255) NOT NULL DEFAULT '0',
  `eixoDianteiroDireito` varchar(255) NOT NULL DEFAULT '0',
  `primeiroEsquerdoExterno` varchar(255) NOT NULL DEFAULT '0',
  `primeiroDireitoInterno` varchar(255) NOT NULL DEFAULT '0',
  `primeiroDireitoExterno` varchar(255) NOT NULL DEFAULT '0',
  `primeiroEsquerdoInterno` varchar(255) NOT NULL DEFAULT '0',
  `segundoEsquerdoInterno` varchar(255) NOT NULL DEFAULT '0',
  `segundoEsquerdoExterno` varchar(255) NOT NULL DEFAULT '0',
  `sedundoDireitoInterno` varchar(255) NOT NULL DEFAULT '0',
  `segundoDireitoExterno` varchar(255) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_vehicle` (`vehicle_id`),
  CONSTRAINT `fk_vehicle` FOREIGN KEY (`vehicle_id`) REFERENCES `vehicles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1;