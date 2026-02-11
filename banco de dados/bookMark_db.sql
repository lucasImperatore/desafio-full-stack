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
INSERT INTO arquive (book_name, author_name, ean, score, stats) 
VALUES 
('Eragon', 'Christopher Paolini', '9788570414113', 10, 'Lido'),
('Eldest', 'Christopher Paolini', '9788570414694', 9, 'Lido'),
('Murtagh', 'Christopher Paolini', '9786555323832', 8, 'Lendo');

-- Conferindo os dados inseridos
SELECT * FROM arquive;
DELETE FROM arquive WHERE id = 8;