/*
	By Default
	DBNAME is cogent
	USERNAME is pratyush
	IPADDRESS is 127.0.0.1 however this must be changed to a permanent public IP on which the server will be hosted
	PASSWORD is 12345678
	INVENTORY is inventory
	CUSTOMERTABLE is customer
*/


create database if not exists 'DBNAME';

create user if not exists 'USERNAME'@'IPADDRESS' identified by 'PASSWORD';

use 'DBNAME';

create table if not exists `INVENTORYTABLE` (
	inventoryId int primary key auto_increment,
	itemName varchar(50),
   	itemCode varchar(15) unique not null,
	specs varchar(255),
   	count int,
	isDeleted int default 0 not null
);
create table if not exists `CUSTOMERTABLE` (
	customerId int primary key auto_increment,
	`name` varchar(50), 
	phoneNumber varchar(15), 
	serialNumber varchar(25), 
	dateOfService date,
	problemDesc varchar(255),
	UNIQUE(serialNumber, dateOfService)
);

grant read write on `DBNAME`.* to 'USERNAME'@'IPADDRESS';