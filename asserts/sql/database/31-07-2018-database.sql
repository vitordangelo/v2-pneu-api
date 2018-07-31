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
  `is_installed` tinyint(2) unsigned NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

-- Dumping data for table v2-pneu-api.pneus: ~5 rows (approximately)
/*!40000 ALTER TABLE `pneus` DISABLE KEYS */;
INSERT INTO `pneus` (`id`, `dimension`, `brand`, `pr`, `type`, `number`, `registry`, `new`, `recachutado`, `is_installed`, `created_at`) VALUES
	(1, '295', 'Pirelli', '16', 'G658', '4039', 'MUIF 85963', 0, 1, 0, '2018-07-27 13:43:55'),
	(2, '295', 'Pirelli', '16', 'GG85', '8956', 'FHT 9546', 0, 1, 0, '2018-07-27 13:50:54'),
	(4, '300', 'Good Year', '19', 'Turismo', '2356', 'BAT 8594', 1, 0, 0, '2018-07-30 14:38:59'),
	(5, '300', 'Good Year', '19', 'Turismo', '2356', 'BAT 8594', 1, 0, 0, '2018-07-30 14:45:22'),
	(8, '300', 'Pirelli', '15', 'Novo', '545', 'MCJ 5546', 1, 0, 0, '2018-07-30 17:18:29');
/*!40000 ALTER TABLE `pneus` ENABLE KEYS */;

-- Dumping structure for table v2-pneu-api.pneus_instaled
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
  KEY `FK_pneus_instaled_pneus` (`pneu_id`),
  CONSTRAINT `FK_pneus_instaled_pneus` FOREIGN KEY (`pneu_id`) REFERENCES `pneus` (`id`),
  CONSTRAINT `FK_pneus_instaled_vehicles` FOREIGN KEY (`vehicle_id`) REFERENCES `vehicles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;

-- Dumping data for table v2-pneu-api.pneus_instaled: ~5 rows (approximately)
/*!40000 ALTER TABLE `pneus_instaled` DISABLE KEYS */;
INSERT INTO `pneus_instaled` (`id`, `vehicle_id`, `pneu_id`, `date`, `eixo`, `obs`, `odometer_instaled`, `position`, `side`, `created_at`) VALUES
	(7, 7, 8, '2018-07-31', '1º Eixo Traseiro', 'Pneu furado', '135000', 'Eixo Interno', 'Direito', '2018-07-31 18:05:55'),
	(8, 7, 8, '2018-07-31', '1º Eixo Traseiro', 'Furou', '15000', 'Eixo Interno', 'Direito', '2018-07-31 18:25:52'),
	(9, 7, 8, '2018-07-31', '1º Eixo Traseiro', 'Teste', '15000', 'Eixo Interno', 'Direito', '2018-07-31 18:26:22'),
	(10, 9, 1, '2018-07-31', '1º Eixo Traseiro', 'Pneu bom', '15000', 'Eixo Interno', 'Direito', '2018-07-31 18:27:30'),
	(11, 7, 1, '2018-07-31', '2º Eixo Traseiro', 'Pneu bom', '15000', 'Eixo Interno', 'Direito', '2018-07-31 18:29:32');
/*!40000 ALTER TABLE `pneus_instaled` ENABLE KEYS */;

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
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

-- Dumping data for table v2-pneu-api.vehicles: ~2 rows (approximately)
/*!40000 ALTER TABLE `vehicles` DISABLE KEYS */;
INSERT INTO `vehicles` (`id`, `number_car`, `brand`, `type`, `year`, `plate`, `created_at`) VALUES
	(7, '55463', 'CJF95642', 'MCJ 5546', '2003', 'ABC 8967', '2018-07-30 17:54:19'),
	(9, '55', 'Volvo ', 'Turismo', '2002', 'RTE 5625', '2018-07-30 18:14:46');
/*!40000 ALTER TABLE `vehicles` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
