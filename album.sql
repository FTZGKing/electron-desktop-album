/*
Navicat MySQL Data Transfer

Source Server         : MySQL连接
Source Server Version : 80021
Source Host           : localhost:3306
Source Database       : gking_album

Target Server Type    : MYSQL
Target Server Version : 80021
File Encoding         : 65001

Date: 2023-05-06 15:15:13
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for album
-- ----------------------------
DROP TABLE IF EXISTS `album`;
CREATE TABLE `album` (
  `id` varchar(100) NOT NULL,
  `title` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `description` varchar(100) DEFAULT NULL,
  `cover` varchar(100) DEFAULT NULL,
  `master_id` varchar(100) NOT NULL,
  `create_time` datetime NOT NULL,
  `publish` tinyint NOT NULL DEFAULT '1' COMMENT '1下架 0 发布',
  `is_delete` tinyint NOT NULL DEFAULT '0' COMMENT '0存在 1删除',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Table structure for master
-- ----------------------------
DROP TABLE IF EXISTS `master`;
CREATE TABLE `master` (
  `id` varchar(60) NOT NULL,
  `account` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `secret_key` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `key_update_time` datetime NOT NULL ON UPDATE CURRENT_TIMESTAMP,
  `nickname` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '没有昵称哦',
  `avatar` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `home_picture` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `signature` varchar(100) DEFAULT '这个人很懒，什么都没有留下',
  `allow` varchar(100) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`,`account`,`secret_key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Table structure for photo
-- ----------------------------
DROP TABLE IF EXISTS `photo`;
CREATE TABLE `photo` (
  `id` varchar(60) NOT NULL,
  `path` varchar(255) NOT NULL,
  `description` text,
  `album_id` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `upload_time` datetime NOT NULL,
  `master_id` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `publish` tinyint NOT NULL DEFAULT '0' COMMENT '0 发布 1下架',
  `is_delete` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Table structure for uploads
-- ----------------------------
DROP TABLE IF EXISTS `uploads`;
CREATE TABLE `uploads` (
  `id` varchar(60) NOT NULL,
  `filename` varchar(50) NOT NULL,
  `originalname` varchar(50) NOT NULL,
  `upload_time` datetime NOT NULL ON UPDATE CURRENT_TIMESTAMP,
  `master_id` varchar(60) NOT NULL,
  `path` varchar(100) NOT NULL,
  `size` varchar(30) NOT NULL,
  `type` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
