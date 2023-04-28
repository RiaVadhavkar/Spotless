-- Adminer 4.8.1 MySQL 5.7.14 dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;

SET NAMES utf8mb4;

CREATE TABLE `Artist` (
  `Artist_URI` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Artist_name` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Image` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`Artist_URI`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


CREATE TABLE `Collection` (
  `Collection_URI` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Collection_name` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Type` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Cover_image` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Release_date` date NOT NULL,
  PRIMARY KEY (`Collection_URI`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


CREATE TABLE `Collection_Genre` (
  `CG_collection_URI` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Collec_genre` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  UNIQUE KEY `CG_collection_URI_2` (`CG_collection_URI`,`Collec_genre`),
  KEY `CG_collection_URI` (`CG_collection_URI`),
  CONSTRAINT `Collection_Genre_ibfk_2` FOREIGN KEY (`CG_collection_URI`) REFERENCES `Collection` (`Collection_URI`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


CREATE TABLE `Has_Collection` (
  `HasC_artist_URI` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `HasC_collection_URI` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  UNIQUE KEY `HasC_collection_URI_2` (`HasC_collection_URI`,`HasC_artist_URI`),
  KEY `HasC_collection_URI` (`HasC_collection_URI`),
  KEY `HasC_artist_URI` (`HasC_artist_URI`),
  CONSTRAINT `Has_Collection_ibfk_3` FOREIGN KEY (`HasC_collection_URI`) REFERENCES `Collection` (`Collection_URI`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Has_Collection_ibfk_4` FOREIGN KEY (`HasC_artist_URI`) REFERENCES `Artist` (`Artist_URI`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


CREATE TABLE `Has_Track` (
  `HasT_artist_URI` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `HasT_track_URI` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  UNIQUE KEY `HasT_artist_URI_2` (`HasT_artist_URI`,`HasT_track_URI`),
  KEY `HasT_artist_URI` (`HasT_artist_URI`),
  KEY `HasT_track_URI` (`HasT_track_URI`),
  CONSTRAINT `Has_Track_ibfk_3` FOREIGN KEY (`HasT_artist_URI`) REFERENCES `Artist` (`Artist_URI`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Has_Track_ibfk_4` FOREIGN KEY (`HasT_track_URI`) REFERENCES `Track` (`Track_URI`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


CREATE TABLE `Track` (
  `Track_URI` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Track_name` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Track_length` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Track_no` int(11) NOT NULL,
  PRIMARY KEY (`Track_URI`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


CREATE TABLE `Track_Genre` (
  `TG_track_URI` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Track_genre` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  UNIQUE KEY `TG_track_URI_2` (`TG_track_URI`,`Track_genre`),
  KEY `TG_track_URI` (`TG_track_URI`),
  CONSTRAINT `Track_Genre_ibfk_2` FOREIGN KEY (`TG_track_URI`) REFERENCES `Track` (`Track_URI`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


CREATE TABLE `Track_In_Collection` (
  `TiC_track_URI` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `TiC_collect_URI` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  UNIQUE KEY `TiC_track_URI_2` (`TiC_track_URI`,`TiC_collect_URI`),
  KEY `TiC_track_URI` (`TiC_track_URI`),
  KEY `TiC_collect_URI` (`TiC_collect_URI`),
  CONSTRAINT `Track_In_Collection_ibfk_3` FOREIGN KEY (`TiC_track_URI`) REFERENCES `Track` (`Track_URI`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Track_In_Collection_ibfk_4` FOREIGN KEY (`TiC_collect_URI`) REFERENCES `Collection` (`Collection_URI`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


CREATE TABLE `User` (
  `Username` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Password` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `User_profile_pic` blob NOT NULL,
  PRIMARY KEY (`Username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


CREATE TABLE `U_admin` (
  `U_admin` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  KEY `U_admin` (`U_admin`),
  CONSTRAINT `U_admin_ibfk_1` FOREIGN KEY (`U_admin`) REFERENCES `User` (`Username`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


CREATE TABLE `U_Collection` (
  `Collection_username` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `Collection_URI` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `Date_added` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY `Collection_username_Collection_URI` (`Collection_username`,`Collection_URI`),
  KEY `Collection_username` (`Collection_username`),
  KEY `Collection_URI` (`Collection_URI`),
  CONSTRAINT `U_Collection_ibfk_3` FOREIGN KEY (`Collection_URI`) REFERENCES `Collection` (`Collection_URI`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `U_Collection_ibfk_4` FOREIGN KEY (`Collection_username`) REFERENCES `User` (`Username`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


CREATE TABLE `U_Collection_Status` (
  `Collection_username` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Collection_URI` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Status` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Planning',
  UNIQUE KEY `Collection_username_Collection_URI` (`Collection_username`,`Collection_URI`),
  KEY `Collection_URI` (`Collection_URI`),
  CONSTRAINT `U_Collection_Status_ibfk_1` FOREIGN KEY (`Collection_username`) REFERENCES `User` (`Username`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `U_Collection_Status_ibfk_2` FOREIGN KEY (`Collection_URI`) REFERENCES `Collection` (`Collection_URI`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


CREATE TABLE `U_Favorite` (
  `Favorite_username` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Favorite_track_URI` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Favoriate_collection_URI` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  UNIQUE KEY `Favorite_username_Favorite_track_URI_Favoriate_collection_URI` (`Favorite_username`,`Favorite_track_URI`,`Favoriate_collection_URI`),
  KEY `Favorite_username` (`Favorite_username`),
  KEY `Favorite_track_URI` (`Favorite_track_URI`),
  KEY `Favoriate_collection_URI` (`Favoriate_collection_URI`),
  CONSTRAINT `U_Favorite_ibfk_5` FOREIGN KEY (`Favorite_track_URI`) REFERENCES `Track` (`Track_URI`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `U_Favorite_ibfk_6` FOREIGN KEY (`Favorite_username`) REFERENCES `User` (`Username`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `U_Favorite_ibfk_7` FOREIGN KEY (`Favoriate_collection_URI`) REFERENCES `Collection` (`Collection_URI`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


CREATE TABLE `U_Follow` (
  `Follower_username` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Followed_username` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  UNIQUE KEY `Follower_username_Followed_username` (`Follower_username`,`Followed_username`),
  KEY `Follower_username` (`Follower_username`),
  KEY `Followed_username` (`Followed_username`),
  CONSTRAINT `U_Follow_ibfk_3` FOREIGN KEY (`Follower_username`) REFERENCES `User` (`Username`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `U_Follow_ibfk_4` FOREIGN KEY (`Followed_username`) REFERENCES `User` (`Username`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


CREATE TABLE `U_Rate` (
  `Rate_username` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Rate_collection_URI` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Rating` float NOT NULL,
  UNIQUE KEY `Rate_username_Rate_collection_URI` (`Rate_username`,`Rate_collection_URI`),
  KEY `Rate_username` (`Rate_username`),
  KEY `Rate_collection_URI` (`Rate_collection_URI`),
  CONSTRAINT `U_Rate_ibfk_3` FOREIGN KEY (`Rate_username`) REFERENCES `User` (`Username`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `U_Rate_ibfk_4` FOREIGN KEY (`Rate_collection_URI`) REFERENCES `Collection` (`Collection_URI`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


CREATE TABLE `U_Review` (
  `U_Review` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Reivew_collection_URI` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Review` text COLLATE utf8mb4_unicode_ci NOT NULL,
  UNIQUE KEY `U_Review_Reivew_collection_URI` (`U_Review`,`Reivew_collection_URI`),
  KEY `U_Review` (`U_Review`),
  KEY `Reivew_collection_URI` (`Reivew_collection_URI`),
  CONSTRAINT `U_Review_ibfk_3` FOREIGN KEY (`U_Review`) REFERENCES `User` (`Username`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `U_Review_ibfk_5` FOREIGN KEY (`Reivew_collection_URI`) REFERENCES `Collection` (`Collection_URI`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- 2023-04-28 15:50:11