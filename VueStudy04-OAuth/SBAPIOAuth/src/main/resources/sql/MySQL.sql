create database sbapi;

use sbapi;

/*用户表*/
create table user (
id int primary key auto_increment COMMENT "ID",
account varchar(20)  COMMENT "帐号",
password varchar(20) COMMENT "密码",
username varchar(20) COMMENT "昵称",
regtime datetime not null COMMENT "注册时间"
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT "用户表";

insert into user values(null,"admin","admin","admin",now());

