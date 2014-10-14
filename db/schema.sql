CREATE DATABASE marvel_app;
\c marvel_app;

CREATE TABLE users (
id serial primary key,
name varchar(255)
);

CREATE TABLE characters (
id serial primary key,
api_id integer,
name varchar(255),
image_url text,
description text
);

CREATE TABLE comics (
id serial primary key,
api_id integer,
title varchar(255),
issue_number integer,
description text,
date_issued varchar(55),
page_count integer,
series text,
thumbnail text
);

CREATE TABLE badges (
id serial primary key,
name varchar(255),
badge_src text 
);

CREATE TABLE fav_characters (
id serial primary key,
user_id integer,
character_id integer
);

CREATE TABLE characters_comics (
id serial primary key,
character_id integer,
comic_id integer
);

CREATE TABLE users_comics (
id serial primary key,
comic_id integer,
user_id integer,
read boolean, 
bought boolean 
);

CREATE TABLE users_badges (
id serial primary key,
user_id integer,
badge_id integer
);