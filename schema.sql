BEGIN TRANSACTION;
CREATE TABLE cd_to_producer (
  cd integer NOT NULL,
  producer integer NOT NULL,
  PRIMARY KEY (cd, producer)
);
INSERT INTO "cd_to_producer" VALUES(3,2);
INSERT INTO "cd_to_producer" VALUES(2,3);
CREATE TABLE artist (
  artistid INTEGER PRIMARY KEY NOT NULL,
  name varchar(100)
);
INSERT INTO "artist" VALUES(1,'John Galte');
INSERT INTO "artist" VALUES(2,'Random Boy Band');
INSERT INTO "artist" VALUES(3,'We Are Goth');
INSERT INTO "artist" VALUES(4,'Harshal Shah');
INSERT INTO "artist" VALUES(5,'Foram Harshal Shah');
INSERT INTO "artist" VALUES(6,'');
INSERT INTO "artist" VALUES(7,'');
INSERT INTO "artist" VALUES(8,'');
INSERT INTO "artist" VALUES(9,'');
INSERT INTO "artist" VALUES(10,'');
INSERT INTO "artist" VALUES(11,'');
CREATE TABLE cd (
  cdid INTEGER PRIMARY KEY NOT NULL,
  artist integer NOT NULL,
  title varchar(100) NOT NULL,
  year varchar(100) NOT NULL
);
INSERT INTO "cd" VALUES(2,1,'Forkful of bees','2009');
INSERT INTO "cd" VALUES(3,1,'Caterwaulin'' Blues','1997');
INSERT INTO "cd" VALUES(4,2,'Generic Manufactured Singles','2001');
INSERT INTO "cd" VALUES(5,2,'We like girls and stuff','2003');
INSERT INTO "cd" VALUES(6,3,'Come Be Depressed With Us','1998');
CREATE TABLE track (
  trackid INTEGER PRIMARY KEY NOT NULL,
  cd integer NOT NULL,
  position integer NOT NULL,
  title varchar(100) NULL,
  last_updated_on datetime NULL
);
INSERT INTO "track" VALUES(4,2,1,'baa',NULL);
INSERT INTO "track" VALUES(5,2,2,'Stripy',NULL);
INSERT INTO "track" VALUES(6,2,3,'Sticky Honey',NULL);
INSERT INTO "track" VALUES(7,3,1,'Yowlin',NULL);
INSERT INTO "track" VALUES(8,3,2,'Howlin',NULL);
INSERT INTO "track" VALUES(9,3,3,'Fowlin','2007-10-20 00:00:00');
INSERT INTO "track" VALUES(10,4,1,'Boring Name',NULL);
INSERT INTO "track" VALUES(11,4,2,'Boring Song',NULL);
INSERT INTO "track" VALUES(12,4,3,'No More Ideas',NULL);
INSERT INTO "track" VALUES(13,5,1,'Sad',NULL);
INSERT INTO "track" VALUES(14,5,2,'Under The Weather',NULL);
INSERT INTO "track" VALUES(15,5,3,'Suicidal',NULL);
CREATE TABLE tags (
  tagid INTEGER PRIMARY KEY NOT NULL,
  cd integer NOT NULL,
  tag varchar(100) NOT NULL
);
INSERT INTO "tags" VALUES(2,2,'Blue');
INSERT INTO "tags" VALUES(3,3,'Blue');
INSERT INTO "tags" VALUES(4,5,'Blue');
INSERT INTO "tags" VALUES(5,2,'Cheesy');
INSERT INTO "tags" VALUES(6,4,'Cheesy');
INSERT INTO "tags" VALUES(7,5,'Cheesy');
INSERT INTO "tags" VALUES(8,2,'Shiny');
INSERT INTO "tags" VALUES(9,4,'Shiny');
CREATE TABLE producer (
  producerid INTEGER PRIMARY KEY NOT NULL,
  name varchar(100) NOT NULL
);
INSERT INTO "producer" VALUES(1,'Matt S Trout');
INSERT INTO "producer" VALUES(2,'Bob The Builder');
INSERT INTO "producer" VALUES(3,'Fred The Phenotype');
COMMIT;
