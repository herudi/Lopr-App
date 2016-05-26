-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               5.6.21 - MySQL Community Server (GPL)
-- Server OS:                    Win32
-- HeidiSQL Version:             8.3.0.4694
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Dumping database structure for lopr



-- Dumping structure for table lopr.problem
CREATE TABLE IF NOT EXISTS `problem` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` varchar(100) NOT NULL,
  `title` varchar(50) DEFAULT NULL,
  `problem` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

-- Dumping data for table lopr.problem: ~0 rows (approximately)
/*!40000 ALTER TABLE `problem` DISABLE KEYS */;
INSERT INTO `problem` (`id`, `uid`, `title`, `problem`) VALUES
	(6, 'facebook:1020987831327345', 'Restfull', 'asdasd'),
	(7, 'facebook:1020987831327345', 'Jaja', 'Herudi Ganteng');
/*!40000 ALTER TABLE `problem` ENABLE KEYS */;


-- Dumping structure for table lopr.user
CREATE TABLE IF NOT EXISTS `user` (
  `uid` varchar(100) NOT NULL,
  `displayName` varchar(50) DEFAULT NULL,
  `picture` text,
  `status` char(1) DEFAULT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table lopr.user: ~0 rows (approximately)
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` (`uid`, `displayName`, `picture`, `status`) VALUES
	('facebook:1020987831327345', 'Herudi', 'https://scontent.xx.fbcdn.net/v/t1.0-1/p100x100/10399977_1006368429455952_421965008348739055_n.jpg?oh=51316b5768bfa5b24a154b21ea2baac6&oe=579D6216', '1'),
	('google:114106017614968438715', 'zinformatika tea', 'https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg', '1');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
