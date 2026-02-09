create database books;
use books;
create table arquive (
id smallint auto_increment primary key,
book_name varchar(50) not null,
author_name varchar(50) not null,
ean bigint(13) not null,
score smallint,
stats enum('Lendo', 'Lido', 'Abandonado') default 'Lendo'
);
show tables;
select * from arquive;
