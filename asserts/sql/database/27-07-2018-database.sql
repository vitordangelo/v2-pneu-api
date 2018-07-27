-- --------------------------------------------------------
-- Host:                         suplementosbelem.ddns.net
-- Server version:               5.7.16 - MySQL Community Server (GPL)
-- Server OS:                    Linux
-- HeidiSQL Version:             9.5.0.5280
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Dumping database structure for v2-pneu-api
CREATE DATABASE IF NOT EXISTS `v2-pneu-api` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `v2-pneu-api`;

-- Dumping structure for table v2-pneu-api.history_pneus
CREATE TABLE IF NOT EXISTS `history_pneus` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `pneu_id` int(10) unsigned NOT NULL DEFAULT '0',
  `vehicle_id` int(10) unsigned NOT NULL DEFAULT '0',
  `position` varchar(255) NOT NULL DEFAULT '0',
  `km_distance` varchar(255) NOT NULL DEFAULT '0',
  `recapagem` varchar(255) NOT NULL DEFAULT '0',
  `odometerInstalled` varchar(255) NOT NULL DEFAULT '0',
  `dateInstalled` date DEFAULT NULL,
  `odometerUninstalled` varchar(255) NOT NULL DEFAULT '0',
  `dateUninstalled` date DEFAULT NULL,
  `note` varchar(255) NOT NULL DEFAULT '0',
  `obs` varchar(255) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_pneu` (`pneu_id`),
  KEY `fk_vehicles` (`vehicle_id`),
  CONSTRAINT `fk_pneu` FOREIGN KEY (`pneu_id`) REFERENCES `pneus` (`id`),
  CONSTRAINT `fk_vehicles` FOREIGN KEY (`vehicle_id`) REFERENCES `vehicles` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table v2-pneu-api.history_pneus: ~0 rows (approximately)
/*!40000 ALTER TABLE `history_pneus` DISABLE KEYS */;
/*!40000 ALTER TABLE `history_pneus` ENABLE KEYS */;

-- Dumping structure for table v2-pneu-api.pneus
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- Dumping data for table v2-pneu-api.pneus: ~2 rows (approximately)
/*!40000 ALTER TABLE `pneus` DISABLE KEYS */;
INSERT INTO `pneus` (`id`, `dimension`, `brand`, `pr`, `type`, `number`, `registry`, `new`, `recachutado`, `created_at`) VALUES
	(1, '295', 'Pirelli', '16', 'G658', '4039', 'MUIF 85963', 1, 0, '2018-07-27 13:43:55'),
	(2, '295', 'Pirelli', '16', 'GG85', '8956', 'FHT 9546', 0, 1, '2018-07-27 13:50:54');
/*!40000 ALTER TABLE `pneus` ENABLE KEYS */;

-- Dumping structure for table v2-pneu-api.pneus_in_vehicles
CREATE TABLE IF NOT EXISTS `pneus_in_vehicles` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `vehicle_id` int(10) unsigned NOT NULL DEFAULT '0',
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
  KEY `fk_vehicles` (`vehicle_id`),
  CONSTRAINT `fk_vehicle` FOREIGN KEY (`vehicle_id`) REFERENCES `vehicles` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table v2-pneu-api.pneus_in_vehicles: ~0 rows (approximately)
/*!40000 ALTER TABLE `pneus_in_vehicles` DISABLE KEYS */;
/*!40000 ALTER TABLE `pneus_in_vehicles` ENABLE KEYS */;

-- Dumping structure for table v2-pneu-api.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) NOT NULL DEFAULT '0',
  `last_name` varchar(255) NOT NULL DEFAULT '0',
  `email` varchar(255) NOT NULL DEFAULT '0',
  `cpf` varchar(255) NOT NULL DEFAULT '0',
  `password` varchar(255) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table v2-pneu-api.users: ~0 rows (approximately)
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

-- Dumping structure for table v2-pneu-api.vehicles
CREATE TABLE IF NOT EXISTS `vehicles` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `number_car` varchar(255) NOT NULL DEFAULT '0',
  `brand` varchar(255) NOT NULL DEFAULT '0',
  `type` varchar(255) NOT NULL DEFAULT '0',
  `year` varchar(255) NOT NULL DEFAULT '0',
  `plate` varchar(255) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

-- Dumping data for table v2-pneu-api.vehicles: ~2 rows (approximately)
/*!40000 ALTER TABLE `vehicles` DISABLE KEYS */;
INSERT INTO `vehicles` (`id`, `number_car`, `brand`, `type`, `year`, `plate`, `created_at`) VALUES
	(3, '1010', 'Volvo', 'Turismo', '1993', 'BMX5896', '2018-07-27 16:55:03'),
	(4, '88', 'VW', 'Turismo', '2003', 'ABC123', '2018-07-27 17:03:45');
/*!40000 ALTER TABLE `vehicles` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
