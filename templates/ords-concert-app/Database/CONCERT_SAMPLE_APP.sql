-- Copyright (c) 2024, Oracle and/or its affiliates.
-- All rights reserved
-- Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/

--------------------------------------------------------
--  File created - Tuesday-August-27-2024   
--------------------------------------------------------

CREATE USER CONCERT_SAMPLE_APP IDENTIFIED BY placeholder
    DEFAULT TABLESPACE DATA
    QUOTA UNLIMITED ON DATA;

GRANT CREATE PROCEDURE,
    CREATE SEQUENCE,
    CREATE SESSION,
    CREATE SYNONYM,
    CREATE TABLE,
    CREATE TRIGGER,
    CREATE TYPE,
    CREATE VIEW
    TO CONCERT_SAMPLE_APP;

DECLARE
  L_PRIV_ROLES owa.vc_arr;
  L_PRIV_PATTERNS owa.vc_arr;
  L_PRIV_MODULES owa.vc_arr;

  BEGIN
    L_PRIV_ROLES( 1 ) := 'oracle.dbtools.autorest.any.schema';
    L_PRIV_ROLES( 2 ) := 'SQL Developer';

    ORDS.ENABLE_SCHEMA(
        P_ENABLED             => TRUE,
        P_SCHEMA              => 'CONCERT_SAMPLE_APP_4',
        P_URL_MAPPING_TYPE    => 'BASE_PATH',
        P_URL_MAPPING_PATTERN => 'concert_sample_app_4',
        P_AUTO_REST_AUTH      => FALSE
    );
    COMMIT;
  END;

--------------------------------------------------------
--  DDL for Sequence ARTIST_SEQ
--------------------------------------------------------

   CREATE SEQUENCE  "CONCERT_SAMPLE_APP"."ARTIST_SEQ"  MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 START WITH 310 CACHE 10 NOORDER  NOCYCLE  NOKEEP  NOSCALE  GLOBAL ;
--------------------------------------------------------
--  DDL for Sequence CITIES_SEQ
--------------------------------------------------------

   CREATE SEQUENCE  "CONCERT_SAMPLE_APP"."CITIES_SEQ"  MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 START WITH 210 CACHE 10 NOORDER  NOCYCLE  NOKEEP  NOSCALE  GLOBAL ;
--------------------------------------------------------
--  DDL for Sequence DBTOOLS$EXECUTION_HISTORY_SEQ
--------------------------------------------------------

   CREATE SEQUENCE  "CONCERT_SAMPLE_APP"."DBTOOLS$EXECUTION_HISTORY_SEQ"  MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 START WITH 41 CACHE 20 NOORDER  NOCYCLE  NOKEEP  NOSCALE  GLOBAL ;
--------------------------------------------------------
--  DDL for Sequence EVENTS_SEQ
--------------------------------------------------------

   CREATE SEQUENCE  "CONCERT_SAMPLE_APP"."EVENTS_SEQ"  MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 START WITH 1111 CACHE 10 NOORDER  NOCYCLE  NOKEEP  NOSCALE  GLOBAL ;
--------------------------------------------------------
--  DDL for Sequence MUSIC_GENRES_SEQ
--------------------------------------------------------

   CREATE SEQUENCE  "CONCERT_SAMPLE_APP"."MUSIC_GENRES_SEQ"  MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 START WITH 11 CACHE 10 NOORDER  NOCYCLE  NOKEEP  NOSCALE  GLOBAL ;
--------------------------------------------------------
--  DDL for Sequence VENUES_SEQ
--------------------------------------------------------

   CREATE SEQUENCE  "CONCERT_SAMPLE_APP"."VENUES_SEQ"  MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 START WITH 210 CACHE 10 NOORDER  NOCYCLE  NOKEEP  NOSCALE  GLOBAL ;
--------------------------------------------------------
--  DDL for Table ARTISTS
--------------------------------------------------------

  CREATE TABLE "CONCERT_SAMPLE_APP"."ARTISTS" 
   (	"ARTIST_ID" NUMBER(10,0), 
	"NAME" VARCHAR2(100 BYTE) COLLATE "USING_NLS_COMP", 
	"DESCRIPTION" VARCHAR2(300 BYTE) COLLATE "USING_NLS_COMP", 
	"BIO" VARCHAR2(2000 BYTE) COLLATE "USING_NLS_COMP"
   )  DEFAULT COLLATION "USING_NLS_COMP" SEGMENT CREATION IMMEDIATE 
  PCTFREE 10 PCTUSED 40 INITRANS 10 MAXTRANS 255 
 COLUMN STORE COMPRESS FOR QUERY HIGH ROW LEVEL LOCKING LOGGING
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1
  BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "DATA" ;
--------------------------------------------------------
--  DDL for Table ARTIST_CLASSIFICATIONS
--------------------------------------------------------

  CREATE TABLE "CONCERT_SAMPLE_APP"."ARTIST_CLASSIFICATIONS" 
   (	"ARTIST_ID" NUMBER(10,0), 
	"MUSIC_GENRE_ID" NUMBER(10,0)
   )  DEFAULT COLLATION "USING_NLS_COMP" SEGMENT CREATION IMMEDIATE 
  PCTFREE 10 PCTUSED 40 INITRANS 10 MAXTRANS 255 
 COLUMN STORE COMPRESS FOR QUERY HIGH ROW LEVEL LOCKING LOGGING
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1
  BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "DATA" ;
--------------------------------------------------------
--  DDL for Table CITIES
--------------------------------------------------------

  CREATE TABLE "CONCERT_SAMPLE_APP"."CITIES" 
   (	"CITY_ID" NUMBER(10,0), 
	"NAME" VARCHAR2(100 BYTE) COLLATE "USING_NLS_COMP", 
	"DESCRIPTION" VARCHAR2(500 BYTE) COLLATE "USING_NLS_COMP"
   )  DEFAULT COLLATION "USING_NLS_COMP" SEGMENT CREATION IMMEDIATE 
  PCTFREE 10 PCTUSED 40 INITRANS 10 MAXTRANS 255 
 COLUMN STORE COMPRESS FOR QUERY HIGH ROW LEVEL LOCKING LOGGING
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1
  BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "DATA" ;
--------------------------------------------------------
--  DDL for Table DBTOOLS$EXECUTION_HISTORY
--------------------------------------------------------

  CREATE TABLE "CONCERT_SAMPLE_APP"."DBTOOLS$EXECUTION_HISTORY" 
   (	"ID" NUMBER, 
	"HASH" CLOB COLLATE "USING_NLS_COMP", 
	"CREATED_BY" VARCHAR2(255 BYTE) COLLATE "USING_NLS_COMP", 
	"CREATED_ON" TIMESTAMP (6) WITH TIME ZONE, 
	"UPDATED_BY" VARCHAR2(255 BYTE) COLLATE "USING_NLS_COMP", 
	"UPDATED_ON" TIMESTAMP (6) WITH TIME ZONE, 
	"STATEMENT" CLOB COLLATE "USING_NLS_COMP", 
	"TIMES" NUMBER
   )  DEFAULT COLLATION "USING_NLS_COMP" SEGMENT CREATION IMMEDIATE 
  PCTFREE 10 PCTUSED 40 INITRANS 10 MAXTRANS 255 
 COLUMN STORE COMPRESS FOR QUERY HIGH ROW LEVEL LOCKING LOGGING
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1
  BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "DATA" 
 LOB ("HASH") STORE AS SECUREFILE (
  TABLESPACE "DATA" ENABLE STORAGE IN ROW CHUNK 8192
  NOCACHE LOGGING  NOCOMPRESS  KEEP_DUPLICATES 
  STORAGE(INITIAL 106496 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0
  BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)) 
 LOB ("STATEMENT") STORE AS SECUREFILE (
  TABLESPACE "DATA" ENABLE STORAGE IN ROW CHUNK 8192
  NOCACHE LOGGING  NOCOMPRESS  KEEP_DUPLICATES 
  STORAGE(INITIAL 106496 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0
  BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)) ;
--------------------------------------------------------
--  DDL for Table EVENTS
--------------------------------------------------------

  CREATE TABLE "CONCERT_SAMPLE_APP"."EVENTS" 
   (	"EVENT_ID" NUMBER(10,0), 
	"EVENT_DATE" DATE, 
	"ARTIST_ID" NUMBER(10,0), 
	"VENUE_ID" NUMBER(10,0), 
	"EVENT_STATUS_ID" NUMBER(10,0), 
	"EVENT_DETAILS" VARCHAR2(400 BYTE) COLLATE "USING_NLS_COMP"
   )  DEFAULT COLLATION "USING_NLS_COMP" SEGMENT CREATION IMMEDIATE 
  PCTFREE 10 PCTUSED 40 INITRANS 10 MAXTRANS 255 
 COLUMN STORE COMPRESS FOR QUERY HIGH ROW LEVEL LOCKING LOGGING
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1
  BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "DATA" ;
--------------------------------------------------------
--  DDL for Table EVENT_STATUS
--------------------------------------------------------

  CREATE TABLE "CONCERT_SAMPLE_APP"."EVENT_STATUS" 
   (	"EVENT_STATUS_ID" NUMBER(10,0), 
	"EVENT_STATUS_NAME" VARCHAR2(40 BYTE) COLLATE "USING_NLS_COMP", 
	"EVENT_STATUS_DESCRIPTION" VARCHAR2(100 BYTE) COLLATE "USING_NLS_COMP"
   )  DEFAULT COLLATION "USING_NLS_COMP" SEGMENT CREATION IMMEDIATE 
  PCTFREE 10 PCTUSED 40 INITRANS 10 MAXTRANS 255 
 COLUMN STORE COMPRESS FOR QUERY HIGH ROW LEVEL LOCKING LOGGING
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1
  BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "DATA" ;
--------------------------------------------------------
--  DDL for Table LIKED_ARTIST
--------------------------------------------------------

  CREATE TABLE "CONCERT_SAMPLE_APP"."LIKED_ARTIST" 
   (	"USER_ID" VARCHAR2(60 BYTE) COLLATE "USING_NLS_COMP", 
	"ARTIST_ID" NUMBER(10,0)
   )  DEFAULT COLLATION "USING_NLS_COMP" SEGMENT CREATION IMMEDIATE 
  PCTFREE 10 PCTUSED 40 INITRANS 10 MAXTRANS 255 
 COLUMN STORE COMPRESS FOR QUERY HIGH ROW LEVEL LOCKING LOGGING
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1
  BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "DATA" ;
--------------------------------------------------------
--  DDL for Table LIKED_EVENT
--------------------------------------------------------

  CREATE TABLE "CONCERT_SAMPLE_APP"."LIKED_EVENT" 
   (	"USER_ID" VARCHAR2(60 BYTE) COLLATE "USING_NLS_COMP", 
	"EVENT_ID" NUMBER(10,0)
   )  DEFAULT COLLATION "USING_NLS_COMP" SEGMENT CREATION IMMEDIATE 
  PCTFREE 10 PCTUSED 40 INITRANS 10 MAXTRANS 255 
 COLUMN STORE COMPRESS FOR QUERY HIGH ROW LEVEL LOCKING LOGGING
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1
  BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "DATA" ;
--------------------------------------------------------
--  DDL for Table LIKED_MUSIC_GENRES
--------------------------------------------------------

  CREATE TABLE "CONCERT_SAMPLE_APP"."LIKED_MUSIC_GENRES" 
   (	"USER_ID" VARCHAR2(60 BYTE) COLLATE "USING_NLS_COMP", 
	"MUSIC_GENRE_ID" NUMBER(10,0)
   )  DEFAULT COLLATION "USING_NLS_COMP" SEGMENT CREATION DEFERRED 
  PCTFREE 10 PCTUSED 40 INITRANS 10 MAXTRANS 255 
 COLUMN STORE COMPRESS FOR QUERY HIGH ROW LEVEL LOCKING LOGGING
  TABLESPACE "DATA" ;
--------------------------------------------------------
--  DDL for Table LIKED_VENUE
--------------------------------------------------------

  CREATE TABLE "CONCERT_SAMPLE_APP"."LIKED_VENUE" 
   (	"USER_ID" VARCHAR2(60 BYTE) COLLATE "USING_NLS_COMP", 
	"VENUE_ID" NUMBER(10,0)
   )  DEFAULT COLLATION "USING_NLS_COMP" SEGMENT CREATION DEFERRED 
  PCTFREE 10 PCTUSED 40 INITRANS 10 MAXTRANS 255 
 COLUMN STORE COMPRESS FOR QUERY HIGH ROW LEVEL LOCKING LOGGING
  TABLESPACE "DATA" ;
--------------------------------------------------------
--  DDL for Table MUSIC_GENRES
--------------------------------------------------------

  CREATE TABLE "CONCERT_SAMPLE_APP"."MUSIC_GENRES" 
   (	"MUSIC_GENRE_ID" NUMBER(10,0), 
	"NAME" VARCHAR2(100 BYTE) COLLATE "USING_NLS_COMP", 
	"DESCRIPTION" VARCHAR2(500 BYTE) COLLATE "USING_NLS_COMP"
   )  DEFAULT COLLATION "USING_NLS_COMP" SEGMENT CREATION IMMEDIATE 
  PCTFREE 10 PCTUSED 40 INITRANS 10 MAXTRANS 255 
 COLUMN STORE COMPRESS FOR QUERY HIGH ROW LEVEL LOCKING LOGGING
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1
  BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "DATA" ;
--------------------------------------------------------
--  DDL for Table TICKET
--------------------------------------------------------

  CREATE TABLE "CONCERT_SAMPLE_APP"."TICKET" 
   (	"EVENT_ID" NUMBER(10,0), 
	"USER_ID" VARCHAR2(60 BYTE) COLLATE "USING_NLS_COMP"
   )  DEFAULT COLLATION "USING_NLS_COMP" SEGMENT CREATION DEFERRED 
  PCTFREE 10 PCTUSED 40 INITRANS 10 MAXTRANS 255 
 COLUMN STORE COMPRESS FOR QUERY HIGH ROW LEVEL LOCKING LOGGING
  TABLESPACE "DATA" ;
--------------------------------------------------------
--  DDL for Table VENUES
--------------------------------------------------------

  CREATE TABLE "CONCERT_SAMPLE_APP"."VENUES" 
   (	"VENUE_ID" NUMBER(10,0), 
	"NAME" VARCHAR2(100 BYTE) COLLATE "USING_NLS_COMP", 
	"LOCATION" VARCHAR2(200 BYTE) COLLATE "USING_NLS_COMP", 
	"CITY_ID" NUMBER(10,0)
   )  DEFAULT COLLATION "USING_NLS_COMP" SEGMENT CREATION IMMEDIATE 
  PCTFREE 10 PCTUSED 40 INITRANS 10 MAXTRANS 255 
 COLUMN STORE COMPRESS FOR QUERY HIGH ROW LEVEL LOCKING LOGGING
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1
  BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "DATA" ;
--------------------------------------------------------
--  DDL for View BANNER_VIEW
--------------------------------------------------------

  CREATE OR REPLACE FORCE EDITIONABLE VIEW "CONCERT_SAMPLE_APP"."BANNER_VIEW" ("EVENTS_COUNT", "ARTISTS_COUNT", "VENUES_COUNT") DEFAULT COLLATION "USING_NLS_COMP"  AS 
  SELECT
        (SELECT COUNT(*) FROM events) AS events_count,
        (SELECT COUNT(*) FROM artists) AS artists_count,
        (SELECT COUNT(*) FROM venues) AS venues_count
    FROM DUAL
;
--------------------------------------------------------
--  DDL for View EVENTS_VIEW
--------------------------------------------------------

  CREATE OR REPLACE FORCE EDITIONABLE VIEW "CONCERT_SAMPLE_APP"."EVENTS_VIEW" ("ARTIST_NAME", "ARTIST_ID", "EVENT_ID", "EVENT_DATE", "EVENT_DETAILS", "EVENT_STATUS_NAME", "EVENT_STATUS_ID", "VENUE_ID", "VENUE_NAME", "CITY_NAME", "MUSIC_GENRES") DEFAULT COLLATION "USING_NLS_COMP"  AS 
  SELECT 
        A.NAME AS ARTIST_NAME,
        A.ARTIST_ID AS ARTIST_ID,
        E.EVENT_ID AS EVENT_ID,
        E.EVENT_DATE AS EVENT_DATE,
        E.EVENT_DETAILS AS EVENT_DETAILS,
        ES.EVENT_STATUS_NAME AS EVENT_STATUS_NAME,
        ES.EVENT_STATUS_ID AS EVENT_STATUS_ID,
        V.VENUE_ID AS VENUE_ID,
        V.NAME AS VENUE_NAME,
        C.NAME AS CITY_NAME,
        AGG.MUSIC_GENRES

    FROM 
        EVENTS E
        INNER JOIN ARTISTS A ON E.ARTIST_ID = A.ARTIST_ID
        INNER JOIN EVENT_STATUS ES ON E.EVENT_STATUS_ID = ES.EVENT_STATUS_ID
        INNER JOIN VENUES V ON E.VENUE_ID = V.VENUE_ID
        INNER JOIN CITIES C ON V.CITY_ID = C.CITY_ID
        LEFT JOIN (
          SELECT 
              AA.ARTIST_ID,
              LISTAGG(MG.NAME, ', ') WITHIN GROUP (ORDER BY MG.NAME) AS MUSIC_GENRES
          FROM 
              ARTIST_CLASSIFICATIONS AA
              INNER JOIN MUSIC_GENRES MG ON AA.MUSIC_GENRE_ID = MG.MUSIC_GENRE_ID
          GROUP BY 
              AA.ARTIST_ID
      ) AGG ON A.ARTIST_ID = AGG.ARTIST_ID
        ORDER BY E.EVENT_DATE DESC
;
--------------------------------------------------------
--  DDL for View SEARCH_ARTIST_VIEW
--------------------------------------------------------

  CREATE OR REPLACE FORCE EDITIONABLE VIEW "CONCERT_SAMPLE_APP"."SEARCH_ARTIST_VIEW" ("ARTIST_ID", "NAME", "DESCRIPTION", "MUSIC_GENRES") DEFAULT COLLATION "USING_NLS_COMP"  AS 
  SELECT
      A.ARTIST_ID,
      A.NAME,
      A.DESCRIPTION,
      LISTAGG(MG.NAME, ', ') WITHIN GROUP(
      ORDER BY
          MG.NAME
      ) AS MUSIC_GENRES
    FROM
      ARTISTS A
      LEFT JOIN ARTIST_CLASSIFICATIONS AA ON A.ARTIST_ID = AA.ARTIST_ID
      LEFT JOIN MUSIC_GENRES           MG ON AA.MUSIC_GENRE_ID = MG.MUSIC_GENRE_ID
    GROUP BY
      A.ARTIST_ID,
      A.NAME,
      A.DESCRIPTION
    ORDER BY
      A.ARTIST_ID
;
--------------------------------------------------------
--  DDL for View SEARCH_VENUES_VIEW
--------------------------------------------------------

  CREATE OR REPLACE FORCE EDITIONABLE VIEW "CONCERT_SAMPLE_APP"."SEARCH_VENUES_VIEW" ("VENUE_ID", "NAME", "LOCATION", "CITY_ID", "CITY_NAME") DEFAULT COLLATION "USING_NLS_COMP"  AS 
  SELECT V."VENUE_ID",V."NAME",V."LOCATION",V."CITY_ID", C.NAME AS CITY_NAME
    FROM VENUES V JOIN CITIES C
    ON V.CITY_ID = C.CITY_ID
;
--------------------------------------------------------
--  DDL for View SEARCH_VIEW
--------------------------------------------------------

  CREATE OR REPLACE FORCE EDITIONABLE VIEW "CONCERT_SAMPLE_APP"."SEARCH_VIEW" ("EVENT_NAME", "ARTIST_NAME", "ARTIST_ID", "EVENT_ID", "EVENT_DATE", "EVENT_DETAILS", "EVENT_STATUS_NAME", "EVENT_STATUS_ID", "VENUE_ID", "VENUE_NAME", "CITY_NAME", "MUSIC_GENRES") DEFAULT COLLATION "USING_NLS_COMP"  AS 
  SELECT 
      A.NAME || ' at ' || V.NAME || ', ' || C.NAME as EVENT_NAME,
      A.NAME AS ARTIST_NAME,
      A.ARTIST_ID AS ARTIST_ID,
      E.EVENT_ID AS EVENT_ID,
      E.EVENT_DATE AS EVENT_DATE,
      E.EVENT_DETAILS AS EVENT_DETAILS,
      ES.EVENT_STATUS_NAME AS EVENT_STATUS_NAME,
      ES.EVENT_STATUS_ID AS EVENT_STATUS_ID,
      V.VENUE_ID AS VENUE_ID,
      V.NAME AS VENUE_NAME,
      C.NAME AS CITY_NAME,
      AGG.MUSIC_GENRES
  FROM 
      EVENTS E
      INNER JOIN ARTISTS A ON E.ARTIST_ID = A.ARTIST_ID
      INNER JOIN EVENT_STATUS ES ON E.EVENT_STATUS_ID = ES.EVENT_STATUS_ID
      INNER JOIN VENUES V ON E.VENUE_ID = V.VENUE_ID
      INNER JOIN CITIES C ON V.CITY_ID = C.CITY_ID
      LEFT JOIN (
          SELECT 
              AA.ARTIST_ID,
              LISTAGG(MG.NAME, ', ') WITHIN GROUP (ORDER BY MG.NAME) AS MUSIC_GENRES
          FROM 
              ARTIST_CLASSIFICATIONS AA
              INNER JOIN MUSIC_GENRES MG ON AA.MUSIC_GENRE_ID = MG.MUSIC_GENRE_ID
          GROUP BY 
              AA.ARTIST_ID
      ) AGG ON A.ARTIST_ID = AGG.ARTIST_ID
      ORDER BY 
        E.EVENT_DATE
;
REM INSERTING into CONCERT_SAMPLE_APP.ARTISTS
SET DEFINE OFF;
Insert into CONCERT_SAMPLE_APP.ARTISTS (ARTIST_ID,NAME,DESCRIPTION,BIO) values (235,'Silver Lining','A country band known for their heartfelt lyrics and traditional sound.','Silver Lining captures the essence of country music, blending timeless stories with classic instrumentation.');
Insert into CONCERT_SAMPLE_APP.ARTISTS (ARTIST_ID,NAME,DESCRIPTION,BIO) values (236,'Starfall Serenade','An indie-pop soloist with a soft, melodic voice and dreamy compositions.','Starfall Serenade enchants with their soft vocals and dreamy, indie-pop melodies.');
Insert into CONCERT_SAMPLE_APP.ARTISTS (ARTIST_ID,NAME,DESCRIPTION,BIO) values (237,'Velvet Horizon','A jazz soloist known for their smooth, improvisational style and rich tones.','Velvet Horizon weaves together smooth jazz with a touch of improvisational magic, captivating audiences everywhere.');
Insert into CONCERT_SAMPLE_APP.ARTISTS (ARTIST_ID,NAME,DESCRIPTION,BIO) values (238,'Orion''s Light','A symphonic rock band blending classical music with rock influences.','Orion''s Light shines bright in the symphonic rock scene, merging the elegance of classical music with rock''s raw energy.');
Insert into CONCERT_SAMPLE_APP.ARTISTS (ARTIST_ID,NAME,DESCRIPTION,BIO) values (239,'Crimson Velvet','A darkwave band that combines gothic themes with modern synth sounds.','Crimson Velvet creates an atmospheric blend of gothic and synth, delivering a darkly captivating experience.');
Insert into CONCERT_SAMPLE_APP.ARTISTS (ARTIST_ID,NAME,DESCRIPTION,BIO) values (240,'Pulsefire','A techno soloist known for their high-energy, futuristic beats.','Pulsefire ignites the dance floor with their high-octane techno tracks and cutting-edge production.');
Insert into CONCERT_SAMPLE_APP.ARTISTS (ARTIST_ID,NAME,DESCRIPTION,BIO) values (241,'Midnight Sun','A blues-rock band with a soulful sound and powerful performances.','Midnight Sun burns bright on the blues-rock scene, delivering soulful tunes with a fiery passion.');
Insert into CONCERT_SAMPLE_APP.ARTISTS (ARTIST_ID,NAME,DESCRIPTION,BIO) values (242,'Lunar Echo','A dream-pop band known for their ethereal sound and introspective lyrics.','Lunar Echo''s dream-pop sound drifts through the ether, touching hearts with their introspective and delicate compositions.');
Insert into CONCERT_SAMPLE_APP.ARTISTS (ARTIST_ID,NAME,DESCRIPTION,BIO) values (243,'Fireside Muse','A folk-rock soloist with a rustic sound and poetic storytelling.','Fireside Muse brings warmth to the stage with their rustic folk-rock sound and engaging storytelling.');
Insert into CONCERT_SAMPLE_APP.ARTISTS (ARTIST_ID,NAME,DESCRIPTION,BIO) values (244,'Solaris Dreams','An electronic dance music artist known for their uplifting, euphoric tracks.','Solaris Dreams creates a world of euphoria with their uplifting EDM tracks, bringing joy to every performance.');
Insert into CONCERT_SAMPLE_APP.ARTISTS (ARTIST_ID,NAME,DESCRIPTION,BIO) values (245,'Aurora Skies','A classical crossover artist blending orchestral music with modern pop.','Aurora Skies bridges the gap between classical and pop, creating a crossover that is both grand and accessible.');
Insert into CONCERT_SAMPLE_APP.ARTISTS (ARTIST_ID,NAME,DESCRIPTION,BIO) values (246,'Prism Shatter','An experimental rock band pushing the boundaries of genre with their avant-garde approach.','Prism Shatter challenges conventions with their experimental rock sound, pushing the limits of what music can be.');
Insert into CONCERT_SAMPLE_APP.ARTISTS (ARTIST_ID,NAME,DESCRIPTION,BIO) values (247,'Radiant Echo','A synth-pop soloist known for their retro-inspired sound and vibrant stage presence.','Radiant Echo lights up the stage with their retro synth-pop sound and infectious energy, captivating audiences worldwide.');
Insert into CONCERT_SAMPLE_APP.ARTISTS (ARTIST_ID,NAME,DESCRIPTION,BIO) values (248,'test tst ','tesssssssttewsss','tessssst testtest');
Insert into CONCERT_SAMPLE_APP.ARTISTS (ARTIST_ID,NAME,DESCRIPTION,BIO) values (200,'The Echoes','A rock band known for their electric live performances and strong rhythms.','The Echoes are a powerhouse in the Rock genre, bringing high energy to every stage they play.');
Insert into CONCERT_SAMPLE_APP.ARTISTS (ARTIST_ID,NAME,DESCRIPTION,BIO) values (201,'Jazz Quintet','A group of jazz musicians who specialize in improvisation and blue notes.','Jazz Quintet are pioneers of Jazz, blending classic swing with modern improvisation.');
Insert into CONCERT_SAMPLE_APP.ARTISTS (ARTIST_ID,NAME,DESCRIPTION,BIO) values (202,'Metal Storm','A metal band with powerful vocals and heavy guitar riffs.','Metal Storm dominates the Metal scene with their aggressive sound and electrifying performances.');
Insert into CONCERT_SAMPLE_APP.ARTISTS (ARTIST_ID,NAME,DESCRIPTION,BIO) values (203,'Reggae Roots','A reggae group that brings the sounds of Jamaica to the world.','Reggae Roots keep the spirit of Reggae alive with their offbeat rhythms and conscious lyrics.');
Insert into CONCERT_SAMPLE_APP.ARTISTS (ARTIST_ID,NAME,DESCRIPTION,BIO) values (204,'Clockwork Ensemble','A steampunk-inspired band with a unique retro-futuristic sound.','Clockwork Ensemble brings the world of Steampunk to life with their instrumental soundscapes.');
Insert into CONCERT_SAMPLE_APP.ARTISTS (ARTIST_ID,NAME,DESCRIPTION,BIO) values (205,'Urban Flow','A rap artist known for their rhythmic speech and streetwise lyrics.','Urban Flow commands the Rap genre with their sharp lyrics and captivating delivery.');
Insert into CONCERT_SAMPLE_APP.ARTISTS (ARTIST_ID,NAME,DESCRIPTION,BIO) values (206,'Pop Sensation','A pop artist with a string of chart-topping hits.','Pop Sensation lights up the charts and the stage with their catchy melodies and broad appeal.');
Insert into CONCERT_SAMPLE_APP.ARTISTS (ARTIST_ID,NAME,DESCRIPTION,BIO) values (207,'Indie Vibes','An indie band that blends rock, folk, and alternative styles.','Indie Vibes represents the heart of Indie music, with their eclectic blend of sounds.');
Insert into CONCERT_SAMPLE_APP.ARTISTS (ARTIST_ID,NAME,DESCRIPTION,BIO) values (208,'Galactic Pulse','A band that fuses electronic music with rock, creating a sound that feels both futuristic and raw.','Galactic Pulse merges electronic beats with rock''s intensity, defining the cutting edge of modern music.');
Insert into CONCERT_SAMPLE_APP.ARTISTS (ARTIST_ID,NAME,DESCRIPTION,BIO) values (209,'Synthwave Collective','An ensemble known for their retro-futuristic soundscapes, inspired by the synth music of the 1980s.','Synthwave Collective channels the essence of 80s synth music, blending it with contemporary electronic styles.');
Insert into CONCERT_SAMPLE_APP.ARTISTS (ARTIST_ID,NAME,DESCRIPTION,BIO) values (210,'Crimson Eclipse','A dark metal band known for their haunting melodies and intense performances.','Crimson Eclipse delivers powerful metal anthems with an eerie, atmospheric twist.');
Insert into CONCERT_SAMPLE_APP.ARTISTS (ARTIST_ID,NAME,DESCRIPTION,BIO) values (211,'Echoes of Silence','An ambient music group that creates tranquil soundscapes, perfect for deep relaxation and meditation.','Echoes of Silence crafts ambient music that transports listeners to serene, otherworldly realms.');
Insert into CONCERT_SAMPLE_APP.ARTISTS (ARTIST_ID,NAME,DESCRIPTION,BIO) values (212,'Solar Flare','A reggae band with a modern twist, blending traditional rhythms with contemporary influences.','Solar Flare reimagines reggae with fresh beats and socially conscious lyrics.');
Insert into CONCERT_SAMPLE_APP.ARTISTS (ARTIST_ID,NAME,DESCRIPTION,BIO) values (213,'Phoenix Rise','A pop-rock band known for their anthemic songs and high-energy performances.','Phoenix Rise ignites stages with their powerful pop-rock anthems, capturing audiences worldwide.');
Insert into CONCERT_SAMPLE_APP.ARTISTS (ARTIST_ID,NAME,DESCRIPTION,BIO) values (214,'Neon Harmony','A jazz ensemble that blends classic jazz with modern electronic elements.','Neon Harmony reinvents jazz by fusing it with contemporary electronic sounds, creating a unique musical experience.');
Insert into CONCERT_SAMPLE_APP.ARTISTS (ARTIST_ID,NAME,DESCRIPTION,BIO) values (215,'Voidwalkers','A progressive metal band that explores cosmic themes through complex, dynamic compositions.','Voidwalkers push the boundaries of metal with their intricate compositions and cosmic inspirations.');
Insert into CONCERT_SAMPLE_APP.ARTISTS (ARTIST_ID,NAME,DESCRIPTION,BIO) values (216,'Starlight Reverie','A dreamy indie-pop band known for their ethereal melodies and introspective lyrics.','Starlight Reverie enchants listeners with their dreamy indie-pop sound and poetic lyrics.');
Insert into CONCERT_SAMPLE_APP.ARTISTS (ARTIST_ID,NAME,DESCRIPTION,BIO) values (217,'Quantum Drift','An experimental electronic artist who creates immersive soundscapes with a sci-fi edge.','Quantum Drift pioneers a new wave of electronic music with their sci-fi inspired soundscapes.');
Insert into CONCERT_SAMPLE_APP.ARTISTS (ARTIST_ID,NAME,DESCRIPTION,BIO) values (218,'Elysian Fields','A folk band that combines traditional acoustic instruments with modern storytelling.','Elysian Fields weaves together folk traditions and contemporary narratives in their heartfelt music.');
Insert into CONCERT_SAMPLE_APP.ARTISTS (ARTIST_ID,NAME,DESCRIPTION,BIO) values (219,'Shadow Synapse','A darkwave soloist who blends gothic elements with modern synth music.','Shadow Synapse creates a brooding, atmospheric sound that resonates deeply with fans of darkwave.');
Insert into CONCERT_SAMPLE_APP.ARTISTS (ARTIST_ID,NAME,DESCRIPTION,BIO) values (220,'Aurora Vega','A solo pop artist known for her powerful vocals and catchy, emotionally charged songs.','Aurora Vega''s powerful voice and emotional depth make her a standout in the pop music scene.');
Insert into CONCERT_SAMPLE_APP.ARTISTS (ARTIST_ID,NAME,DESCRIPTION,BIO) values (221,'Rogue Alchemist','An alternative rock band that mixes grunge, punk, and a touch of psychedelia.','Rogue Alchemist''s gritty sound and experimental edge redefine alternative rock.');
Insert into CONCERT_SAMPLE_APP.ARTISTS (ARTIST_ID,NAME,DESCRIPTION,BIO) values (222,'Lyric Fire','A rap artist known for their rapid-fire delivery and thought-provoking lyrics.','Lyric Fire sets the rap scene ablaze with their intense delivery and sharp lyrical content.');
Insert into CONCERT_SAMPLE_APP.ARTISTS (ARTIST_ID,NAME,DESCRIPTION,BIO) values (223,'Celestial Voices','A vocal ensemble that blends classical choral music with modern harmonies.','Celestial Voices brings a heavenly sound to the stage, merging classical and contemporary vocal styles.');
Insert into CONCERT_SAMPLE_APP.ARTISTS (ARTIST_ID,NAME,DESCRIPTION,BIO) values (224,'Emerald Dream','A new age soloist who creates music for relaxation and meditation, often inspired by nature.','Emerald Dream''s music soothes the soul, drawing inspiration from the natural world to create calming soundscapes.');
Insert into CONCERT_SAMPLE_APP.ARTISTS (ARTIST_ID,NAME,DESCRIPTION,BIO) values (225,'Frostbite','An industrial metal band known for their aggressive sound and dystopian themes.','Frostbite delivers industrial metal with a fierce intensity, capturing the harshness of a dystopian world.');
Insert into CONCERT_SAMPLE_APP.ARTISTS (ARTIST_ID,NAME,DESCRIPTION,BIO) values (226,'Sonic Odyssey','A band that blends world music with electronic elements, creating a global sound.','Sonic Odyssey takes listeners on a journey around the world with their eclectic mix of global influences.');
Insert into CONCERT_SAMPLE_APP.ARTISTS (ARTIST_ID,NAME,DESCRIPTION,BIO) values (227,'Nova Symphony','A symphonic metal band that combines classical orchestration with heavy metal.','Nova Symphony merges the grandeur of classical music with the power of metal in their epic performances.');
Insert into CONCERT_SAMPLE_APP.ARTISTS (ARTIST_ID,NAME,DESCRIPTION,BIO) values (228,'Prismatic Wave','An electronic soloist known for creating colorful, vibrant soundscapes.','Prismatic Wave lights up the electronic music scene with their vivid and energetic compositions.');
Insert into CONCERT_SAMPLE_APP.ARTISTS (ARTIST_ID,NAME,DESCRIPTION,BIO) values (229,'Ruby Cascade','A solo blues artist with a voice that echoes the legends of the past.','Ruby Cascade brings the soul of blues to life, with a voice that carries the weight of generations.');
Insert into CONCERT_SAMPLE_APP.ARTISTS (ARTIST_ID,NAME,DESCRIPTION,BIO) values (230,'Iron Lotus','A steampunk-inspired band that blends industrial sounds with Victorian flair.','Iron Lotus transports audiences to a retro-futuristic world with their unique blend of steampunk and music.');
Insert into CONCERT_SAMPLE_APP.ARTISTS (ARTIST_ID,NAME,DESCRIPTION,BIO) values (231,'Vortex Mirage','An ambient soloist known for creating immersive, dream-like soundscapes.','Vortex Mirage takes listeners on a journey through sound, crafting ethereal and captivating ambient music.');
Insert into CONCERT_SAMPLE_APP.ARTISTS (ARTIST_ID,NAME,DESCRIPTION,BIO) values (232,'Electric Muse','A pop-electronic band known for their catchy hooks and futuristic sound.','Electric Muse electrifies the airwaves with their catchy pop-electronic tunes and forward-thinking style.');
Insert into CONCERT_SAMPLE_APP.ARTISTS (ARTIST_ID,NAME,DESCRIPTION,BIO) values (233,'Echo Wanderer','A soloist who blends indie-folk with electronic elements, creating a unique sonic experience.','Echo Wanderer combines the intimacy of folk with the innovation of electronic music, creating a sound all their own.');
Insert into CONCERT_SAMPLE_APP.ARTISTS (ARTIST_ID,NAME,DESCRIPTION,BIO) values (234,'Dusk Rider','A rock soloist with a gritty voice and raw guitar skills.','Dusk Rider brings the spirit of rock ''n'' roll to life with their powerful voice and commanding presence.');
REM INSERTING into CONCERT_SAMPLE_APP.ARTIST_CLASSIFICATIONS
SET DEFINE OFF;
Insert into CONCERT_SAMPLE_APP.ARTIST_CLASSIFICATIONS (ARTIST_ID,MUSIC_GENRE_ID) values (239,5);
Insert into CONCERT_SAMPLE_APP.ARTIST_CLASSIFICATIONS (ARTIST_ID,MUSIC_GENRE_ID) values (240,5);
Insert into CONCERT_SAMPLE_APP.ARTIST_CLASSIFICATIONS (ARTIST_ID,MUSIC_GENRE_ID) values (241,1);
Insert into CONCERT_SAMPLE_APP.ARTIST_CLASSIFICATIONS (ARTIST_ID,MUSIC_GENRE_ID) values (242,8);
Insert into CONCERT_SAMPLE_APP.ARTIST_CLASSIFICATIONS (ARTIST_ID,MUSIC_GENRE_ID) values (243,8);
Insert into CONCERT_SAMPLE_APP.ARTIST_CLASSIFICATIONS (ARTIST_ID,MUSIC_GENRE_ID) values (243,1);
Insert into CONCERT_SAMPLE_APP.ARTIST_CLASSIFICATIONS (ARTIST_ID,MUSIC_GENRE_ID) values (244,7);
Insert into CONCERT_SAMPLE_APP.ARTIST_CLASSIFICATIONS (ARTIST_ID,MUSIC_GENRE_ID) values (245,7);
Insert into CONCERT_SAMPLE_APP.ARTIST_CLASSIFICATIONS (ARTIST_ID,MUSIC_GENRE_ID) values (245,2);
Insert into CONCERT_SAMPLE_APP.ARTIST_CLASSIFICATIONS (ARTIST_ID,MUSIC_GENRE_ID) values (246,1);
Insert into CONCERT_SAMPLE_APP.ARTIST_CLASSIFICATIONS (ARTIST_ID,MUSIC_GENRE_ID) values (246,5);
Insert into CONCERT_SAMPLE_APP.ARTIST_CLASSIFICATIONS (ARTIST_ID,MUSIC_GENRE_ID) values (247,7);
Insert into CONCERT_SAMPLE_APP.ARTIST_CLASSIFICATIONS (ARTIST_ID,MUSIC_GENRE_ID) values (200,1);
Insert into CONCERT_SAMPLE_APP.ARTIST_CLASSIFICATIONS (ARTIST_ID,MUSIC_GENRE_ID) values (201,2);
Insert into CONCERT_SAMPLE_APP.ARTIST_CLASSIFICATIONS (ARTIST_ID,MUSIC_GENRE_ID) values (202,3);
Insert into CONCERT_SAMPLE_APP.ARTIST_CLASSIFICATIONS (ARTIST_ID,MUSIC_GENRE_ID) values (203,4);
Insert into CONCERT_SAMPLE_APP.ARTIST_CLASSIFICATIONS (ARTIST_ID,MUSIC_GENRE_ID) values (204,5);
Insert into CONCERT_SAMPLE_APP.ARTIST_CLASSIFICATIONS (ARTIST_ID,MUSIC_GENRE_ID) values (205,6);
Insert into CONCERT_SAMPLE_APP.ARTIST_CLASSIFICATIONS (ARTIST_ID,MUSIC_GENRE_ID) values (206,7);
Insert into CONCERT_SAMPLE_APP.ARTIST_CLASSIFICATIONS (ARTIST_ID,MUSIC_GENRE_ID) values (207,8);
Insert into CONCERT_SAMPLE_APP.ARTIST_CLASSIFICATIONS (ARTIST_ID,MUSIC_GENRE_ID) values (208,1);
Insert into CONCERT_SAMPLE_APP.ARTIST_CLASSIFICATIONS (ARTIST_ID,MUSIC_GENRE_ID) values (208,7);
Insert into CONCERT_SAMPLE_APP.ARTIST_CLASSIFICATIONS (ARTIST_ID,MUSIC_GENRE_ID) values (209,5);
Insert into CONCERT_SAMPLE_APP.ARTIST_CLASSIFICATIONS (ARTIST_ID,MUSIC_GENRE_ID) values (209,8);
Insert into CONCERT_SAMPLE_APP.ARTIST_CLASSIFICATIONS (ARTIST_ID,MUSIC_GENRE_ID) values (210,3);
Insert into CONCERT_SAMPLE_APP.ARTIST_CLASSIFICATIONS (ARTIST_ID,MUSIC_GENRE_ID) values (211,2);
Insert into CONCERT_SAMPLE_APP.ARTIST_CLASSIFICATIONS (ARTIST_ID,MUSIC_GENRE_ID) values (211,5);
Insert into CONCERT_SAMPLE_APP.ARTIST_CLASSIFICATIONS (ARTIST_ID,MUSIC_GENRE_ID) values (212,4);
Insert into CONCERT_SAMPLE_APP.ARTIST_CLASSIFICATIONS (ARTIST_ID,MUSIC_GENRE_ID) values (212,7);
Insert into CONCERT_SAMPLE_APP.ARTIST_CLASSIFICATIONS (ARTIST_ID,MUSIC_GENRE_ID) values (213,1);
Insert into CONCERT_SAMPLE_APP.ARTIST_CLASSIFICATIONS (ARTIST_ID,MUSIC_GENRE_ID) values (213,7);
Insert into CONCERT_SAMPLE_APP.ARTIST_CLASSIFICATIONS (ARTIST_ID,MUSIC_GENRE_ID) values (214,2);
Insert into CONCERT_SAMPLE_APP.ARTIST_CLASSIFICATIONS (ARTIST_ID,MUSIC_GENRE_ID) values (214,5);
Insert into CONCERT_SAMPLE_APP.ARTIST_CLASSIFICATIONS (ARTIST_ID,MUSIC_GENRE_ID) values (215,3);
Insert into CONCERT_SAMPLE_APP.ARTIST_CLASSIFICATIONS (ARTIST_ID,MUSIC_GENRE_ID) values (216,7);
Insert into CONCERT_SAMPLE_APP.ARTIST_CLASSIFICATIONS (ARTIST_ID,MUSIC_GENRE_ID) values (216,8);
Insert into CONCERT_SAMPLE_APP.ARTIST_CLASSIFICATIONS (ARTIST_ID,MUSIC_GENRE_ID) values (217,5);
Insert into CONCERT_SAMPLE_APP.ARTIST_CLASSIFICATIONS (ARTIST_ID,MUSIC_GENRE_ID) values (218,8);
Insert into CONCERT_SAMPLE_APP.ARTIST_CLASSIFICATIONS (ARTIST_ID,MUSIC_GENRE_ID) values (219,5);
Insert into CONCERT_SAMPLE_APP.ARTIST_CLASSIFICATIONS (ARTIST_ID,MUSIC_GENRE_ID) values (220,7);
Insert into CONCERT_SAMPLE_APP.ARTIST_CLASSIFICATIONS (ARTIST_ID,MUSIC_GENRE_ID) values (221,1);
Insert into CONCERT_SAMPLE_APP.ARTIST_CLASSIFICATIONS (ARTIST_ID,MUSIC_GENRE_ID) values (221,8);
Insert into CONCERT_SAMPLE_APP.ARTIST_CLASSIFICATIONS (ARTIST_ID,MUSIC_GENRE_ID) values (222,6);
Insert into CONCERT_SAMPLE_APP.ARTIST_CLASSIFICATIONS (ARTIST_ID,MUSIC_GENRE_ID) values (223,2);
Insert into CONCERT_SAMPLE_APP.ARTIST_CLASSIFICATIONS (ARTIST_ID,MUSIC_GENRE_ID) values (224,5);
Insert into CONCERT_SAMPLE_APP.ARTIST_CLASSIFICATIONS (ARTIST_ID,MUSIC_GENRE_ID) values (225,3);
Insert into CONCERT_SAMPLE_APP.ARTIST_CLASSIFICATIONS (ARTIST_ID,MUSIC_GENRE_ID) values (226,5);
Insert into CONCERT_SAMPLE_APP.ARTIST_CLASSIFICATIONS (ARTIST_ID,MUSIC_GENRE_ID) values (226,8);
Insert into CONCERT_SAMPLE_APP.ARTIST_CLASSIFICATIONS (ARTIST_ID,MUSIC_GENRE_ID) values (227,3);
Insert into CONCERT_SAMPLE_APP.ARTIST_CLASSIFICATIONS (ARTIST_ID,MUSIC_GENRE_ID) values (228,7);
Insert into CONCERT_SAMPLE_APP.ARTIST_CLASSIFICATIONS (ARTIST_ID,MUSIC_GENRE_ID) values (229,1);
Insert into CONCERT_SAMPLE_APP.ARTIST_CLASSIFICATIONS (ARTIST_ID,MUSIC_GENRE_ID) values (230,5);
Insert into CONCERT_SAMPLE_APP.ARTIST_CLASSIFICATIONS (ARTIST_ID,MUSIC_GENRE_ID) values (231,5);
Insert into CONCERT_SAMPLE_APP.ARTIST_CLASSIFICATIONS (ARTIST_ID,MUSIC_GENRE_ID) values (232,7);
Insert into CONCERT_SAMPLE_APP.ARTIST_CLASSIFICATIONS (ARTIST_ID,MUSIC_GENRE_ID) values (233,8);
Insert into CONCERT_SAMPLE_APP.ARTIST_CLASSIFICATIONS (ARTIST_ID,MUSIC_GENRE_ID) values (234,1);
Insert into CONCERT_SAMPLE_APP.ARTIST_CLASSIFICATIONS (ARTIST_ID,MUSIC_GENRE_ID) values (235,8);
Insert into CONCERT_SAMPLE_APP.ARTIST_CLASSIFICATIONS (ARTIST_ID,MUSIC_GENRE_ID) values (236,8);
Insert into CONCERT_SAMPLE_APP.ARTIST_CLASSIFICATIONS (ARTIST_ID,MUSIC_GENRE_ID) values (236,7);
Insert into CONCERT_SAMPLE_APP.ARTIST_CLASSIFICATIONS (ARTIST_ID,MUSIC_GENRE_ID) values (237,2);
Insert into CONCERT_SAMPLE_APP.ARTIST_CLASSIFICATIONS (ARTIST_ID,MUSIC_GENRE_ID) values (238,3);
Insert into CONCERT_SAMPLE_APP.ARTIST_CLASSIFICATIONS (ARTIST_ID,MUSIC_GENRE_ID) values (238,1);
REM INSERTING into CONCERT_SAMPLE_APP.CITIES
SET DEFINE OFF;
Insert into CONCERT_SAMPLE_APP.CITIES (CITY_ID,NAME,DESCRIPTION) values (100,'NeoNexus','A sprawling metropolis, blending advanced technology with nature, where skyscrapers reach for the stars amidst lush vertical forests.');
Insert into CONCERT_SAMPLE_APP.CITIES (CITY_ID,NAME,DESCRIPTION) values (101,'Solara Prime','A solar-powered city in the desert, known for its shimmering architecture and cutting-edge renewable energy innovations.');
Insert into CONCERT_SAMPLE_APP.CITIES (CITY_ID,NAME,DESCRIPTION) values (102,'Luminara','Nestled in the mountains, this city is famous for its glowing buildings and art installations that light up the night sky.');
Insert into CONCERT_SAMPLE_APP.CITIES (CITY_ID,NAME,DESCRIPTION) values (103,'Aquapolis','A floating city on the ocean, where futuristic design meets sustainable living, with buildings that rise like crystals from the water.');
Insert into CONCERT_SAMPLE_APP.CITIES (CITY_ID,NAME,DESCRIPTION) values (104,'Virelia','An island city renowned for its harmonious blend of modern life and unspoiled nature, offering serene beaches and a high-tech lifestyle.');
Insert into CONCERT_SAMPLE_APP.CITIES (CITY_ID,NAME,DESCRIPTION) values (105,'TerraNova','A green city surrounded by dense forests, known for its eco-conscious infrastructure and commitment to environmental sustainability.');
Insert into CONCERT_SAMPLE_APP.CITIES (CITY_ID,NAME,DESCRIPTION) values (106,'Aetheris','Suspended above the clouds, this city offers breathtaking aerial views and a serene, otherworldly atmosphere.');
Insert into CONCERT_SAMPLE_APP.CITIES (CITY_ID,NAME,DESCRIPTION) values (107,'Mirage Vortex','A mysterious desert city that appears and disappears with the shifting sands, known for its holographic landscapes and hidden wonders.');
Insert into CONCERT_SAMPLE_APP.CITIES (CITY_ID,NAME,DESCRIPTION) values (108,'Nocturne','A city shrouded in perpetual twilight, where neon lights and dark alleyways create an enigmatic and intriguing atmosphere.');
Insert into CONCERT_SAMPLE_APP.CITIES (CITY_ID,NAME,DESCRIPTION) values (109,'Aurora Nova','A luxurious city of gold and glass, basking in perpetual sunlight, famed for its opulent lifestyle and cutting-edge innovations.');
Insert into CONCERT_SAMPLE_APP.CITIES (CITY_ID,NAME,DESCRIPTION) values (110,'Lyra’s End','Once thought lost to time, this city has re-emerged as a hub of culture and innovation, blending ancient architecture with futuristic design.');
REM INSERTING into CONCERT_SAMPLE_APP.DBTOOLS$EXECUTION_HISTORY
SET DEFINE OFF;
REM INSERTING into CONCERT_SAMPLE_APP.EVENTS
SET DEFINE OFF;
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (46,to_date('17/12/24','DD/MM/RR'),204,138,30,'The Steampunk magic of Clockwork Ensemble is coming to Blue Moon Stage, ready to captivate the audience with a breathtaking performance.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (47,to_date('03/04/25','DD/MM/RR'),211,127,20,'Echoes of Silence is set to electrify the stage at Solstice Pavilion with their signature Jazz sound, promising a night of unforgettable music.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (48,to_date('20/11/24','DD/MM/RR'),200,137,40,'Feel the rhythm as The Echoes takes the stage at Starlight Ballroom, delivering a Rock experience that will leave you spellbound.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (49,to_date('08/02/25','DD/MM/RR'),233,114,10,'Get ready for an evening of Indie excellence as Echo Wanderer performs live at Zephyr Lounge, where music and atmosphere collide.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (50,to_date('28/05/25','DD/MM/RR'),201,157,40,'Jazz Quintet is set to electrify the stage at Aurora Peak with their signature Jazz sound, promising a night of unforgettable music.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (51,to_date('30/04/25','DD/MM/RR'),247,187,30,'Don''t miss Radiant Echo bringing their unique Pop style to Solstice Pavilion, in what is sure to be a spectacular show.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (52,to_date('08/03/25','DD/MM/RR'),214,131,40,'The Jazz magic of Neon Harmony is coming to Celestial Plaza, ready to captivate the audience with a breathtaking performance.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (53,to_date('06/05/25','DD/MM/RR'),225,128,50,'Get ready for an evening of Metal excellence as Frostbite performs live at Horizon Stage, where music and atmosphere collide.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (54,to_date('08/12/24','DD/MM/RR'),231,169,20,'Step into the world of Steampunk with Vortex Mirage at Nova Plaza, where their musical prowess will take center stage.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (55,to_date('29/05/25','DD/MM/RR'),223,152,20,'Get ready for an evening of Jazz excellence as Celestial Voices performs live at Velocity Plaza, where music and atmosphere collide.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (56,to_date('10/10/24','DD/MM/RR'),237,162,20,'Velvet Horizon is set to electrify the stage at Solar Flare Arena with their signature Jazz sound, promising a night of unforgettable music.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (57,to_date('05/04/25','DD/MM/RR'),211,185,30,'Step into the world of Jazz with Echoes of Silence at Gravity Point, where their musical prowess will take center stage.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (58,to_date('05/12/24','DD/MM/RR'),243,158,20,'At Velocity Hall, Fireside Muse will take you on a Indie journey like no other, blending innovation with raw talent.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (59,to_date('01/02/25','DD/MM/RR'),212,107,30,'Solar Flare is set to electrify the stage at Nebula Plaza with their signature Reggae sound, promising a night of unforgettable music.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (60,to_date('20/01/25','DD/MM/RR'),227,171,30,'Feel the rhythm as Nova Symphony takes the stage at Radiant Falls, delivering a Metal experience that will leave you spellbound.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (61,to_date('09/06/25','DD/MM/RR'),238,122,40,'Orion''s Light is set to electrify the stage at Celestial Stage with their signature Metal sound, promising a night of unforgettable music.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (62,to_date('14/01/25','DD/MM/RR'),246,114,50,'Get ready for an evening of Rock excellence as Prism Shatter performs live at Zephyr Lounge, where music and atmosphere collide.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (63,to_date('21/01/25','DD/MM/RR'),201,187,10,'Jazz Quintet is set to electrify the stage at Solstice Pavilion with their signature Jazz sound, promising a night of unforgettable music.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (64,to_date('30/12/24','DD/MM/RR'),246,136,30,'The legendary Prism Shatter will be performing at Midnight Mirage, bringing their renowned Rock sound to life in an epic concert.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (65,to_date('04/07/25','DD/MM/RR'),241,187,20,'Midnight Sun is set to electrify the stage at Solstice Pavilion with their signature Rock sound, promising a night of unforgettable music.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (66,to_date('28/12/24','DD/MM/RR'),220,135,50,'Step into the world of Pop with Aurora Vega at Rift Pavilion, where their musical prowess will take center stage.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (67,to_date('05/03/25','DD/MM/RR'),220,111,20,'The legendary Aurora Vega will be performing at Aurora Pavilion, bringing their renowned Pop sound to life in an epic concert.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (68,to_date('15/12/24','DD/MM/RR'),208,177,10,'Feel the rhythm as Galactic Pulse takes the stage at Harmony Cove, delivering a Rock experience that will leave you spellbound.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (69,to_date('27/04/25','DD/MM/RR'),228,157,50,'Don''t miss Prismatic Wave bringing their unique Pop style to Aurora Peak, in what is sure to be a spectacular show.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (70,to_date('05/05/25','DD/MM/RR'),201,165,10,'Get ready for an evening of Jazz excellence as Jazz Quintet performs live at Phoenix Hall, where music and atmosphere collide.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (71,to_date('20/09/24','DD/MM/RR'),204,104,40,'Don''t miss Clockwork Ensemble bringing their unique Steampunk style to Aurora Falls Amphitheater, in what is sure to be a spectacular show.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (72,to_date('01/12/24','DD/MM/RR'),212,116,30,'Experience the powerful Reggae vibes of Solar Flare live at Celestial Stage, where the energy will be off the charts.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (73,to_date('02/03/25','DD/MM/RR'),231,158,40,'The legendary Vortex Mirage will be performing at Velocity Hall, bringing their renowned Steampunk sound to life in an epic concert.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (74,to_date('11/12/24','DD/MM/RR'),220,118,10,'The Pop magic of Aurora Vega is coming to Starlight Ballroom, ready to captivate the audience with a breathtaking performance.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (75,to_date('15/03/25','DD/MM/RR'),222,134,50,'At Zephyr Peak, Lyric Fire will take you on a Rap journey like no other, blending innovation with raw talent.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (76,to_date('28/11/24','DD/MM/RR'),232,176,50,'The legendary Electric Muse will be performing at Starlight Ballroom, bringing their renowned Pop sound to life in an epic concert.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (77,to_date('20/01/25','DD/MM/RR'),233,123,20,'The Indie magic of Echo Wanderer is coming to Radiant Peak, ready to captivate the audience with a breathtaking performance.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (78,to_date('11/05/25','DD/MM/RR'),227,157,30,'The Metal magic of Nova Symphony is coming to Aurora Peak, ready to captivate the audience with a breathtaking performance.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (79,to_date('13/01/25','DD/MM/RR'),200,101,10,'Don''t miss The Echoes bringing their unique Rock style to Celestial Plaza, in what is sure to be a spectacular show.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (80,to_date('10/04/25','DD/MM/RR'),216,153,50,'Don''t miss Starlight Reverie bringing their unique Pop style to Ember Hall, in what is sure to be a spectacular show.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (81,to_date('13/12/24','DD/MM/RR'),225,179,50,'Join us at Ethereal Pavilion for an evening of pure Metal bliss with Frostbite, delivering a performance you won''t want to miss.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (82,to_date('15/09/24','DD/MM/RR'),206,154,40,'The Pop magic of Pop Sensation is coming to Dawn Sanctuary, ready to captivate the audience with a breathtaking performance.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (83,to_date('27/11/24','DD/MM/RR'),202,144,20,'Experience the powerful Metal vibes of Metal Storm live at Elysium Stage, where the energy will be off the charts.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (84,to_date('12/01/25','DD/MM/RR'),200,172,30,'At Dawn Sanctuary, The Echoes will take you on a Rock journey like no other, blending innovation with raw talent.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (85,to_date('04/02/25','DD/MM/RR'),222,156,20,'Get ready for an evening of Rap excellence as Lyric Fire performs live at Ethereal Pavilion, where music and atmosphere collide.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (86,to_date('28/04/25','DD/MM/RR'),240,131,20,'At Celestial Plaza, Pulsefire will take you on a Steampunk journey like no other, blending innovation with raw talent.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (87,to_date('31/05/25','DD/MM/RR'),205,105,10,'Feel the rhythm as Urban Flow takes the stage at Aurora Amphitheater, delivering a Rap experience that will leave you spellbound.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (88,to_date('09/05/25','DD/MM/RR'),214,159,20,'Experience the powerful Jazz vibes of Neon Harmony live at Whispering Pines Theater, where the energy will be off the charts.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (89,to_date('30/12/24','DD/MM/RR'),242,187,40,'Get ready for an evening of Indie excellence as Lunar Echo performs live at Solstice Pavilion, where music and atmosphere collide.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (90,to_date('16/09/24','DD/MM/RR'),238,190,20,'Get ready for an evening of Metal excellence as Orion''s Light performs live at Harmonic Haven, where music and atmosphere collide.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (91,to_date('20/02/25','DD/MM/RR'),212,195,10,'Step into the world of Reggae with Solar Flare at Spectrum Point, where their musical prowess will take center stage.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (137,to_date('13/05/25','DD/MM/RR'),245,115,40,'The legendary Aurora Skies will be performing at Celestial Shores Amphitheater, bringing their renowned Pop sound to life in an epic concert.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (138,to_date('09/09/24','DD/MM/RR'),210,152,10,'At Velocity Plaza, Crimson Eclipse will take you on a Metal journey like no other, blending innovation with raw talent.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (139,to_date('11/09/24','DD/MM/RR'),242,137,40,'Lunar Echo is set to electrify the stage at Starlight Ballroom with their signature Indie sound, promising a night of unforgettable music.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (140,to_date('27/02/25','DD/MM/RR'),214,113,10,'Step into the world of Jazz with Neon Harmony at Chroma Stage, where their musical prowess will take center stage.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (141,to_date('08/10/24','DD/MM/RR'),202,183,50,'At Serenity Gardens, Metal Storm will take you on a Metal journey like no other, blending innovation with raw talent.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (142,to_date('24/06/25','DD/MM/RR'),235,168,10,'Experience the powerful Indie vibes of Silver Lining live at Twilight Grove, where the energy will be off the charts.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (143,to_date('24/09/24','DD/MM/RR'),214,124,10,'The legendary Neon Harmony will be performing at Harmonic Haven, bringing their renowned Jazz sound to life in an epic concert.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (144,to_date('09/11/24','DD/MM/RR'),222,176,20,'Get ready for an evening of Rap excellence as Lyric Fire performs live at Starlight Ballroom, where music and atmosphere collide.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (145,to_date('09/11/24','DD/MM/RR'),221,105,20,'Step into the world of Rock with Rogue Alchemist at Aurora Amphitheater, where their musical prowess will take center stage.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (146,to_date('15/05/25','DD/MM/RR'),233,134,50,'The legendary Echo Wanderer will be performing at Zephyr Peak, bringing their renowned Indie sound to life in an epic concert.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (147,to_date('29/10/24','DD/MM/RR'),232,184,10,'Get ready for an evening of Pop excellence as Electric Muse performs live at Pulse Point, where music and atmosphere collide.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (148,to_date('28/05/25','DD/MM/RR'),212,135,20,'Experience the powerful Reggae vibes of Solar Flare live at Rift Pavilion, where the energy will be off the charts.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (149,to_date('30/09/24','DD/MM/RR'),207,126,50,'Don''t miss Indie Vibes bringing their unique Indie style to Elysium Stage, in what is sure to be a spectacular show.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (150,to_date('16/11/24','DD/MM/RR'),202,125,30,'Get ready for an evening of Metal excellence as Metal Storm performs live at Blue Moon Gardens, where music and atmosphere collide.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (151,to_date('03/05/25','DD/MM/RR'),219,158,20,'Step into the world of Steampunk with Shadow Synapse at Velocity Hall, where their musical prowess will take center stage.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (152,to_date('24/11/24','DD/MM/RR'),206,184,30,'The Pop magic of Pop Sensation is coming to Pulse Point, ready to captivate the audience with a breathtaking performance.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (153,to_date('30/11/24','DD/MM/RR'),239,195,40,'Crimson Velvet is set to electrify the stage at Spectrum Point with their signature Steampunk sound, promising a night of unforgettable music.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (154,to_date('13/02/25','DD/MM/RR'),220,126,40,'Step into the world of Pop with Aurora Vega at Elysium Stage, where their musical prowess will take center stage.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (155,to_date('27/03/25','DD/MM/RR'),221,165,20,'Get ready for an evening of Rock excellence as Rogue Alchemist performs live at Phoenix Hall, where music and atmosphere collide.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (156,to_date('31/12/24','DD/MM/RR'),216,172,20,'Feel the rhythm as Starlight Reverie takes the stage at Dawn Sanctuary, delivering a Pop experience that will leave you spellbound.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (157,to_date('29/04/25','DD/MM/RR'),219,105,20,'Get ready for an evening of Steampunk excellence as Shadow Synapse performs live at Aurora Amphitheater, where music and atmosphere collide.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (158,to_date('26/01/25','DD/MM/RR'),207,106,10,'Join us at Radiant Gardens for an evening of pure Indie bliss with Indie Vibes, delivering a performance you won''t want to miss.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (159,to_date('17/01/25','DD/MM/RR'),205,145,50,'Feel the rhythm as Urban Flow takes the stage at Aurora Falls Amphitheater, delivering a Rap experience that will leave you spellbound.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (160,to_date('13/01/25','DD/MM/RR'),213,118,50,'Get ready for an evening of Rock excellence as Phoenix Rise performs live at Starlight Ballroom, where music and atmosphere collide.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (161,to_date('20/06/25','DD/MM/RR'),204,160,30,'The Steampunk magic of Clockwork Ensemble is coming to Harmony Cove, ready to captivate the audience with a breathtaking performance.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (162,to_date('28/01/25','DD/MM/RR'),231,185,20,'Step into the world of Steampunk with Vortex Mirage at Gravity Point, where their musical prowess will take center stage.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (163,to_date('18/11/24','DD/MM/RR'),203,139,30,'Feel the rhythm as Reggae Roots takes the stage at Solstice Pavilion, delivering a Reggae experience that will leave you spellbound.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (164,to_date('26/03/25','DD/MM/RR'),236,185,20,'Don''t miss Starfall Serenade bringing their unique Indie style to Gravity Point, in what is sure to be a spectacular show.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (165,to_date('15/06/25','DD/MM/RR'),246,123,10,'At Radiant Peak, Prism Shatter will take you on a Rock journey like no other, blending innovation with raw talent.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (166,to_date('11/05/25','DD/MM/RR'),245,157,10,'Feel the rhythm as Aurora Skies takes the stage at Aurora Peak, delivering a Pop experience that will leave you spellbound.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (167,to_date('02/07/25','DD/MM/RR'),243,112,10,'Get ready for an evening of Indie excellence as Fireside Muse performs live at Glimmer Amphitheater, where music and atmosphere collide.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (168,to_date('27/01/25','DD/MM/RR'),229,111,40,'Don''t miss Ruby Cascade bringing their unique Rock style to Aurora Pavilion, in what is sure to be a spectacular show.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (169,to_date('11/12/24','DD/MM/RR'),237,138,20,'Don''t miss Velvet Horizon bringing their unique Jazz style to Blue Moon Stage, in what is sure to be a spectacular show.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (170,to_date('10/06/25','DD/MM/RR'),230,193,40,'Experience the powerful Steampunk vibes of Iron Lotus live at Titanium Heights, where the energy will be off the charts.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (171,to_date('13/09/24','DD/MM/RR'),245,179,20,'Experience the powerful Pop vibes of Aurora Skies live at Ethereal Pavilion, where the energy will be off the charts.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (172,to_date('10/11/24','DD/MM/RR'),227,103,50,'Nova Symphony is set to electrify the stage at Rift Pavilion with their signature Metal sound, promising a night of unforgettable music.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (173,to_date('07/03/25','DD/MM/RR'),200,171,40,'Join us at Radiant Falls for an evening of pure Rock bliss with The Echoes, delivering a performance you won''t want to miss.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (174,to_date('24/10/24','DD/MM/RR'),247,150,50,'Experience the powerful Pop vibes of Radiant Echo live at Aurora Point, where the energy will be off the charts.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (175,to_date('20/01/25','DD/MM/RR'),218,133,40,'Step into the world of Indie with Elysian Fields at Neon Haven, where their musical prowess will take center stage.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (176,to_date('17/12/24','DD/MM/RR'),217,139,50,'Quantum Drift is set to electrify the stage at Solstice Pavilion with their signature Steampunk sound, promising a night of unforgettable music.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (177,to_date('27/11/24','DD/MM/RR'),224,119,40,'Join us at Mystic Springs Theater for an evening of pure Steampunk bliss with Emerald Dream, delivering a performance you won''t want to miss.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (178,to_date('03/05/25','DD/MM/RR'),228,176,10,'At Starlight Ballroom, Prismatic Wave will take you on a Pop journey like no other, blending innovation with raw talent.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (179,to_date('30/01/25','DD/MM/RR'),225,126,30,'Get ready for an evening of Metal excellence as Frostbite performs live at Elysium Stage, where music and atmosphere collide.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (1,to_date('19/01/25','DD/MM/RR'),209,178,20,'The Steampunk magic of Synthwave Collective is coming to Ethereal Pavilion, ready to captivate the audience with a breathtaking performance.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (2,to_date('28/05/25','DD/MM/RR'),244,103,20,'Feel the rhythm as Solaris Dreams takes the stage at Rift Pavilion, delivering a Pop experience that will leave you spellbound.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (3,to_date('29/09/24','DD/MM/RR'),212,118,20,'Get ready for an evening of Reggae excellence as Solar Flare performs live at Starlight Ballroom, where music and atmosphere collide.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (4,to_date('30/10/24','DD/MM/RR'),235,166,20,'Get ready for an evening of Indie excellence as Silver Lining performs live at Harmony Cove, where music and atmosphere collide.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (5,to_date('17/06/25','DD/MM/RR'),228,119,30,'Step into the world of Pop with Prismatic Wave at Mystic Springs Theater, where their musical prowess will take center stage.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (6,to_date('21/09/24','DD/MM/RR'),219,116,50,'The Steampunk magic of Shadow Synapse is coming to Celestial Stage, ready to captivate the audience with a breathtaking performance.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (7,to_date('02/06/25','DD/MM/RR'),217,178,10,'The Steampunk magic of Quantum Drift is coming to Ethereal Pavilion, ready to captivate the audience with a breathtaking performance.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (8,to_date('19/05/25','DD/MM/RR'),205,112,30,'The Rap magic of Urban Flow is coming to Glimmer Amphitheater, ready to captivate the audience with a breathtaking performance.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (9,to_date('18/10/24','DD/MM/RR'),231,115,40,'Vortex Mirage is set to electrify the stage at Celestial Shores Amphitheater with their signature Steampunk sound, promising a night of unforgettable music.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (10,to_date('24/12/24','DD/MM/RR'),201,190,10,'Step into the world of Jazz with Jazz Quintet at Harmonic Haven, where their musical prowess will take center stage.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (11,to_date('24/02/25','DD/MM/RR'),244,144,30,'Step into the world of Pop with Solaris Dreams at Elysium Stage, where their musical prowess will take center stage.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (12,to_date('01/10/24','DD/MM/RR'),239,126,10,'Step into the world of Steampunk with Crimson Velvet at Elysium Stage, where their musical prowess will take center stage.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (13,to_date('22/05/25','DD/MM/RR'),218,162,20,'Experience the powerful Indie vibes of Elysian Fields live at Solar Flare Arena, where the energy will be off the charts.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (14,to_date('22/11/24','DD/MM/RR'),205,109,40,'Join us at Sonic Waves Theater for an evening of pure Rap bliss with Urban Flow, delivering a performance you won''t want to miss.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (15,to_date('22/12/24','DD/MM/RR'),204,150,40,'Don''t miss Clockwork Ensemble bringing their unique Steampunk style to Aurora Point, in what is sure to be a spectacular show.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (16,to_date('06/03/25','DD/MM/RR'),228,187,40,'The Pop magic of Prismatic Wave is coming to Solstice Pavilion, ready to captivate the audience with a breathtaking performance.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (17,to_date('15/12/24','DD/MM/RR'),227,142,30,'Join us at Galactic Theater for an evening of pure Metal bliss with Nova Symphony, delivering a performance you won''t want to miss.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (18,to_date('14/10/24','DD/MM/RR'),243,138,20,'Feel the rhythm as Fireside Muse takes the stage at Blue Moon Stage, delivering a Indie experience that will leave you spellbound.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (19,to_date('30/03/25','DD/MM/RR'),209,114,20,'The legendary Synthwave Collective will be performing at Zephyr Lounge, bringing their renowned Steampunk sound to life in an epic concert.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (20,to_date('17/06/25','DD/MM/RR'),242,158,20,'At Velocity Hall, Lunar Echo will take you on a Indie journey like no other, blending innovation with raw talent.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (21,to_date('07/10/24','DD/MM/RR'),225,161,40,'Don''t miss Frostbite bringing their unique Metal style to Vortex Plaza, in what is sure to be a spectacular show.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (22,to_date('09/03/25','DD/MM/RR'),247,162,10,'Join us at Solar Flare Arena for an evening of pure Pop bliss with Radiant Echo, delivering a performance you won''t want to miss.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (23,to_date('29/11/24','DD/MM/RR'),226,118,20,'Join us at Starlight Ballroom for an evening of pure Steampunk bliss with Sonic Odyssey, delivering a performance you won''t want to miss.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (24,to_date('27/11/24','DD/MM/RR'),200,172,50,'The Rock magic of The Echoes is coming to Dawn Sanctuary, ready to captivate the audience with a breathtaking performance.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (25,to_date('30/01/25','DD/MM/RR'),244,112,20,'Don''t miss Solaris Dreams bringing their unique Pop style to Glimmer Amphitheater, in what is sure to be a spectacular show.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (26,to_date('30/12/24','DD/MM/RR'),241,107,20,'Step into the world of Rock with Midnight Sun at Nebula Plaza, where their musical prowess will take center stage.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (27,to_date('20/04/25','DD/MM/RR'),224,147,20,'The legendary Emerald Dream will be performing at Echo Plaza, bringing their renowned Steampunk sound to life in an epic concert.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (28,to_date('12/02/25','DD/MM/RR'),231,174,10,'Don''t miss Vortex Mirage bringing their unique Steampunk style to Zephyr Theater, in what is sure to be a spectacular show.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (29,to_date('22/12/24','DD/MM/RR'),209,166,50,'Don''t miss Synthwave Collective bringing their unique Steampunk style to Harmony Cove, in what is sure to be a spectacular show.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (30,to_date('11/02/25','DD/MM/RR'),227,162,10,'Step into the world of Metal with Nova Symphony at Solar Flare Arena, where their musical prowess will take center stage.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (31,to_date('12/09/24','DD/MM/RR'),213,158,40,'The legendary Phoenix Rise will be performing at Velocity Hall, bringing their renowned Rock sound to life in an epic concert.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (32,to_date('01/02/25','DD/MM/RR'),226,189,30,'Sonic Odyssey is set to electrify the stage at Mystic Springs Theater with their signature Steampunk sound, promising a night of unforgettable music.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (33,to_date('07/06/25','DD/MM/RR'),211,186,10,'Experience the powerful Jazz vibes of Echoes of Silence live at Velocity Hall, where the energy will be off the charts.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (34,to_date('17/12/24','DD/MM/RR'),204,187,50,'Clockwork Ensemble is set to electrify the stage at Solstice Pavilion with their signature Steampunk sound, promising a night of unforgettable music.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (35,to_date('30/09/24','DD/MM/RR'),246,121,30,'Step into the world of Rock with Prism Shatter at Velocity Hall, where their musical prowess will take center stage.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (36,to_date('01/07/25','DD/MM/RR'),245,158,50,'The Pop magic of Aurora Skies is coming to Velocity Hall, ready to captivate the audience with a breathtaking performance.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (37,to_date('07/10/24','DD/MM/RR'),245,141,20,'Aurora Skies is set to electrify the stage at Echo Heights with their signature Pop sound, promising a night of unforgettable music.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (38,to_date('05/11/24','DD/MM/RR'),205,128,40,'At Horizon Stage, Urban Flow will take you on a Rap journey like no other, blending innovation with raw talent.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (39,to_date('06/01/25','DD/MM/RR'),215,130,20,'Get ready for an evening of Metal excellence as Voidwalkers performs live at Nebula Lounge, where music and atmosphere collide.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (40,to_date('10/03/25','DD/MM/RR'),201,131,50,'The legendary Jazz Quintet will be performing at Celestial Plaza, bringing their renowned Jazz sound to life in an epic concert.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (41,to_date('29/06/25','DD/MM/RR'),210,195,50,'Step into the world of Metal with Crimson Eclipse at Spectrum Point, where their musical prowess will take center stage.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (42,to_date('19/10/24','DD/MM/RR'),234,173,50,'Don''t miss Dusk Rider bringing their unique Rock style to Twilight Grove, in what is sure to be a spectacular show.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (43,to_date('30/04/25','DD/MM/RR'),212,128,50,'Feel the rhythm as Solar Flare takes the stage at Horizon Stage, delivering a Reggae experience that will leave you spellbound.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (44,to_date('01/07/25','DD/MM/RR'),213,112,40,'At Glimmer Amphitheater, Phoenix Rise will take you on a Rock journey like no other, blending innovation with raw talent.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (45,to_date('12/03/25','DD/MM/RR'),211,111,40,'The legendary Echoes of Silence will be performing at Aurora Pavilion, bringing their renowned Jazz sound to life in an epic concert.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (92,to_date('02/03/25','DD/MM/RR'),244,179,30,'The legendary Solaris Dreams will be performing at Ethereal Pavilion, bringing their renowned Pop sound to life in an epic concert.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (93,to_date('19/11/24','DD/MM/RR'),206,172,10,'Pop Sensation is set to electrify the stage at Dawn Sanctuary with their signature Pop sound, promising a night of unforgettable music.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (94,to_date('11/03/25','DD/MM/RR'),230,137,20,'At Starlight Ballroom, Iron Lotus will take you on a Steampunk journey like no other, blending innovation with raw talent.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (95,to_date('21/09/24','DD/MM/RR'),237,178,20,'Join us at Ethereal Pavilion for an evening of pure Jazz bliss with Velvet Horizon, delivering a performance you won''t want to miss.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (96,to_date('19/09/24','DD/MM/RR'),234,102,40,'Dusk Rider is set to electrify the stage at Blue Moon Stage with their signature Rock sound, promising a night of unforgettable music.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (97,to_date('10/01/25','DD/MM/RR'),228,113,30,'Step into the world of Pop with Prismatic Wave at Chroma Stage, where their musical prowess will take center stage.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (98,to_date('15/12/24','DD/MM/RR'),228,105,50,'Don''t miss Prismatic Wave bringing their unique Pop style to Aurora Amphitheater, in what is sure to be a spectacular show.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (99,to_date('06/10/24','DD/MM/RR'),212,163,20,'The legendary Solar Flare will be performing at Serenity Gardens, bringing their renowned Reggae sound to life in an epic concert.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (100,to_date('30/12/24','DD/MM/RR'),247,166,30,'Join us at Harmony Cove for an evening of pure Pop bliss with Radiant Echo, delivering a performance you won''t want to miss.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (101,to_date('10/02/25','DD/MM/RR'),228,171,30,'Join us at Radiant Falls for an evening of pure Pop bliss with Prismatic Wave, delivering a performance you won''t want to miss.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (102,to_date('29/10/24','DD/MM/RR'),236,122,40,'Feel the rhythm as Starfall Serenade takes the stage at Celestial Stage, delivering a Indie experience that will leave you spellbound.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (103,to_date('15/12/24','DD/MM/RR'),210,152,30,'The legendary Crimson Eclipse will be performing at Velocity Plaza, bringing their renowned Metal sound to life in an epic concert.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (104,to_date('04/04/25','DD/MM/RR'),228,103,10,'Feel the rhythm as Prismatic Wave takes the stage at Rift Pavilion, delivering a Pop experience that will leave you spellbound.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (105,to_date('11/11/24','DD/MM/RR'),226,179,10,'The legendary Sonic Odyssey will be performing at Ethereal Pavilion, bringing their renowned Steampunk sound to life in an epic concert.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (106,to_date('15/05/25','DD/MM/RR'),232,187,30,'Feel the rhythm as Electric Muse takes the stage at Solstice Pavilion, delivering a Pop experience that will leave you spellbound.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (107,to_date('04/04/25','DD/MM/RR'),213,148,30,'The legendary Phoenix Rise will be performing at Zephyr Peak, bringing their renowned Rock sound to life in an epic concert.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (108,to_date('28/11/24','DD/MM/RR'),213,164,40,'The Rock magic of Phoenix Rise is coming to Harmony Cove, ready to captivate the audience with a breathtaking performance.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (109,to_date('22/03/25','DD/MM/RR'),211,160,40,'Step into the world of Jazz with Echoes of Silence at Harmony Cove, where their musical prowess will take center stage.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (110,to_date('24/10/24','DD/MM/RR'),217,190,10,'At Harmonic Haven, Quantum Drift will take you on a Steampunk journey like no other, blending innovation with raw talent.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (111,to_date('12/09/24','DD/MM/RR'),215,112,50,'Don''t miss Voidwalkers bringing their unique Metal style to Glimmer Amphitheater, in what is sure to be a spectacular show.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (112,to_date('28/03/25','DD/MM/RR'),224,130,30,'Join us at Nebula Lounge for an evening of pure Steampunk bliss with Emerald Dream, delivering a performance you won''t want to miss.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (113,to_date('03/01/25','DD/MM/RR'),213,168,10,'Phoenix Rise is set to electrify the stage at Twilight Grove with their signature Rock sound, promising a night of unforgettable music.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (114,to_date('24/12/24','DD/MM/RR'),222,160,10,'Step into the world of Rap with Lyric Fire at Harmony Cove, where their musical prowess will take center stage.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (115,to_date('26/12/24','DD/MM/RR'),203,165,40,'Experience the powerful Reggae vibes of Reggae Roots live at Phoenix Hall, where the energy will be off the charts.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (116,to_date('04/11/24','DD/MM/RR'),206,170,10,'Pop Sensation is set to electrify the stage at Celestial Stage with their signature Pop sound, promising a night of unforgettable music.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (117,to_date('05/01/25','DD/MM/RR'),234,124,30,'Feel the rhythm as Dusk Rider takes the stage at Harmonic Haven, delivering a Rock experience that will leave you spellbound.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (118,to_date('16/02/25','DD/MM/RR'),235,152,50,'Don''t miss Silver Lining bringing their unique Indie style to Velocity Plaza, in what is sure to be a spectacular show.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (119,to_date('24/11/24','DD/MM/RR'),247,117,10,'Step into the world of Pop with Radiant Echo at Galactic Theater, where their musical prowess will take center stage.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (120,to_date('18/12/24','DD/MM/RR'),216,180,30,'The Pop magic of Starlight Reverie is coming to Eclipse Pavilion, ready to captivate the audience with a breathtaking performance.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (121,to_date('09/09/24','DD/MM/RR'),230,133,30,'Feel the rhythm as Iron Lotus takes the stage at Neon Haven, delivering a Steampunk experience that will leave you spellbound.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (122,to_date('11/05/25','DD/MM/RR'),227,114,50,'Join us at Zephyr Lounge for an evening of pure Metal bliss with Nova Symphony, delivering a performance you won''t want to miss.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (123,to_date('14/03/25','DD/MM/RR'),216,190,30,'Starlight Reverie is set to electrify the stage at Harmonic Haven with their signature Pop sound, promising a night of unforgettable music.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (124,to_date('10/01/25','DD/MM/RR'),231,111,20,'Feel the rhythm as Vortex Mirage takes the stage at Aurora Pavilion, delivering a Steampunk experience that will leave you spellbound.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (125,to_date('27/06/25','DD/MM/RR'),210,133,20,'The legendary Crimson Eclipse will be performing at Neon Haven, bringing their renowned Metal sound to life in an epic concert.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (126,to_date('27/03/25','DD/MM/RR'),208,140,50,'The Rock magic of Galactic Pulse is coming to Ember Pavilion, ready to captivate the audience with a breathtaking performance.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (127,to_date('20/09/24','DD/MM/RR'),239,140,20,'Step into the world of Steampunk with Crimson Velvet at Ember Pavilion, where their musical prowess will take center stage.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (128,to_date('25/06/25','DD/MM/RR'),229,112,30,'The Rock magic of Ruby Cascade is coming to Glimmer Amphitheater, ready to captivate the audience with a breathtaking performance.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (129,to_date('14/02/25','DD/MM/RR'),227,166,30,'Get ready for an evening of Metal excellence as Nova Symphony performs live at Harmony Cove, where music and atmosphere collide.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (130,to_date('13/12/24','DD/MM/RR'),234,128,30,'Don''t miss Dusk Rider bringing their unique Rock style to Horizon Stage, in what is sure to be a spectacular show.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (131,to_date('04/05/25','DD/MM/RR'),213,189,10,'Feel the rhythm as Phoenix Rise takes the stage at Mystic Springs Theater, delivering a Rock experience that will leave you spellbound.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (132,to_date('15/12/24','DD/MM/RR'),225,139,10,'Step into the world of Metal with Frostbite at Solstice Pavilion, where their musical prowess will take center stage.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (133,to_date('11/02/25','DD/MM/RR'),239,141,50,'Get ready for an evening of Steampunk excellence as Crimson Velvet performs live at Echo Heights, where music and atmosphere collide.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (134,to_date('11/03/25','DD/MM/RR'),215,147,50,'Don''t miss Voidwalkers bringing their unique Metal style to Echo Plaza, in what is sure to be a spectacular show.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (135,to_date('11/03/25','DD/MM/RR'),212,117,50,'Experience the powerful Reggae vibes of Solar Flare live at Galactic Theater, where the energy will be off the charts.');
Insert into CONCERT_SAMPLE_APP.EVENTS (EVENT_ID,EVENT_DATE,ARTIST_ID,VENUE_ID,EVENT_STATUS_ID,EVENT_DETAILS) values (136,to_date('25/05/25','DD/MM/RR'),206,108,40,'Get ready for an evening of Pop excellence as Pop Sensation performs live at Ether Dome, where music and atmosphere collide.');
REM INSERTING into CONCERT_SAMPLE_APP.EVENT_STATUS
SET DEFINE OFF;
Insert into CONCERT_SAMPLE_APP.EVENT_STATUS (EVENT_STATUS_ID,EVENT_STATUS_NAME,EVENT_STATUS_DESCRIPTION) values (10,'Scheduled','The event is scheduled and set to take place.');
Insert into CONCERT_SAMPLE_APP.EVENT_STATUS (EVENT_STATUS_ID,EVENT_STATUS_NAME,EVENT_STATUS_DESCRIPTION) values (20,'Cancelled','The event has been cancelled.');
Insert into CONCERT_SAMPLE_APP.EVENT_STATUS (EVENT_STATUS_ID,EVENT_STATUS_NAME,EVENT_STATUS_DESCRIPTION) values (30,'Postponed','The event has been postponed to a later date.');
Insert into CONCERT_SAMPLE_APP.EVENT_STATUS (EVENT_STATUS_ID,EVENT_STATUS_NAME,EVENT_STATUS_DESCRIPTION) values (40,'Sold Out','The event is sold out and no more tickets are available.');
Insert into CONCERT_SAMPLE_APP.EVENT_STATUS (EVENT_STATUS_ID,EVENT_STATUS_NAME,EVENT_STATUS_DESCRIPTION) values (50,'Completed','The event has successfully taken place.');
REM INSERTING into CONCERT_SAMPLE_APP.LIKED_ARTIST
SET DEFINE OFF;
REM INSERTING into CONCERT_SAMPLE_APP.LIKED_EVENT
SET DEFINE OFF;
Insert into CONCERT_SAMPLE_APP.LIKED_EVENT (USER_ID,EVENT_ID) values ('google-oauth2|114711911759490630088',138);
REM INSERTING into CONCERT_SAMPLE_APP.LIKED_MUSIC_GENRES
SET DEFINE OFF;
REM INSERTING into CONCERT_SAMPLE_APP.LIKED_VENUE
SET DEFINE OFF;
REM INSERTING into CONCERT_SAMPLE_APP.MUSIC_GENRES
SET DEFINE OFF;
Insert into CONCERT_SAMPLE_APP.MUSIC_GENRES (MUSIC_GENRE_ID,NAME,DESCRIPTION) values (1,'Rock','A genre characterized by strong rhythms and often revolves around the electric guitar.');
Insert into CONCERT_SAMPLE_APP.MUSIC_GENRES (MUSIC_GENRE_ID,NAME,DESCRIPTION) values (2,'Jazz','A genre known for its swing and blue notes, improvisation, and complex chords.');
Insert into CONCERT_SAMPLE_APP.MUSIC_GENRES (MUSIC_GENRE_ID,NAME,DESCRIPTION) values (3,'Metal','A genre known for its heavy guitar riffs, powerful vocals, and aggressive sound.');
Insert into CONCERT_SAMPLE_APP.MUSIC_GENRES (MUSIC_GENRE_ID,NAME,DESCRIPTION) values (4,'Reggae','A genre originating from Jamaica, known for its offbeat rhythms and socially conscious lyrics.');
Insert into CONCERT_SAMPLE_APP.MUSIC_GENRES (MUSIC_GENRE_ID,NAME,DESCRIPTION) values (5,'Steampunk','A genre that combines retro-futuristic elements with Victorian aesthetics, often instrumental.');
Insert into CONCERT_SAMPLE_APP.MUSIC_GENRES (MUSIC_GENRE_ID,NAME,DESCRIPTION) values (6,'Rap','A genre characterized by rhythmic speech, with themes often revolving around street life and social issues.');
Insert into CONCERT_SAMPLE_APP.MUSIC_GENRES (MUSIC_GENRE_ID,NAME,DESCRIPTION) values (7,'Pop','A genre known for its catchy melodies and broad appeal, often topping the charts.');
Insert into CONCERT_SAMPLE_APP.MUSIC_GENRES (MUSIC_GENRE_ID,NAME,DESCRIPTION) values (8,'Indie','A genre that embraces independent artists and often features a blend of rock, folk, and alternative styles.');
REM INSERTING into CONCERT_SAMPLE_APP.TICKET
SET DEFINE OFF;
REM INSERTING into CONCERT_SAMPLE_APP.VENUES
SET DEFINE OFF;
Insert into CONCERT_SAMPLE_APP.VENUES (VENUE_ID,NAME,LOCATION,CITY_ID) values (100,'Nebula Lounge','Main St, NeoNexus',100);
Insert into CONCERT_SAMPLE_APP.VENUES (VENUE_ID,NAME,LOCATION,CITY_ID) values (101,'Celestial Plaza','Ocean Dr, Aquapolis',103);
Insert into CONCERT_SAMPLE_APP.VENUES (VENUE_ID,NAME,LOCATION,CITY_ID) values (102,'Blue Moon Stage','Park Blvd, Solara Prime',101);
Insert into CONCERT_SAMPLE_APP.VENUES (VENUE_ID,NAME,LOCATION,CITY_ID) values (103,'Rift Pavilion','Sunset Rd, Aetheris',106);
Insert into CONCERT_SAMPLE_APP.VENUES (VENUE_ID,NAME,LOCATION,CITY_ID) values (104,'Aurora Falls Amphitheater','2nd Ave, Mirage Vortex',107);
Insert into CONCERT_SAMPLE_APP.VENUES (VENUE_ID,NAME,LOCATION,CITY_ID) values (105,'Aurora Amphitheater','Sunset Rd, Aquapolis',103);
Insert into CONCERT_SAMPLE_APP.VENUES (VENUE_ID,NAME,LOCATION,CITY_ID) values (106,'Radiant Gardens','Park Blvd, Luminara',102);
Insert into CONCERT_SAMPLE_APP.VENUES (VENUE_ID,NAME,LOCATION,CITY_ID) values (107,'Nebula Plaza','2nd Ave, TerraNova',105);
Insert into CONCERT_SAMPLE_APP.VENUES (VENUE_ID,NAME,LOCATION,CITY_ID) values (108,'Ether Dome','Sunset Rd, Virelia',104);
Insert into CONCERT_SAMPLE_APP.VENUES (VENUE_ID,NAME,LOCATION,CITY_ID) values (109,'Sonic Waves Theater','Park Blvd, Solara Prime',101);
Insert into CONCERT_SAMPLE_APP.VENUES (VENUE_ID,NAME,LOCATION,CITY_ID) values (110,'Aurora Amphitheater','Park Blvd, Aetheris',106);
Insert into CONCERT_SAMPLE_APP.VENUES (VENUE_ID,NAME,LOCATION,CITY_ID) values (111,'Aurora Pavilion','2nd Ave, NeoNexus',100);
Insert into CONCERT_SAMPLE_APP.VENUES (VENUE_ID,NAME,LOCATION,CITY_ID) values (112,'Glimmer Amphitheater','Sunset Rd, Lyra’s End',110);
Insert into CONCERT_SAMPLE_APP.VENUES (VENUE_ID,NAME,LOCATION,CITY_ID) values (113,'Chroma Stage','Park Blvd, Mirage Vortex',107);
Insert into CONCERT_SAMPLE_APP.VENUES (VENUE_ID,NAME,LOCATION,CITY_ID) values (114,'Zephyr Lounge','Ocean Dr, NeoNexus',100);
Insert into CONCERT_SAMPLE_APP.VENUES (VENUE_ID,NAME,LOCATION,CITY_ID) values (115,'Celestial Shores Amphitheater','2nd Ave, Luminara',102);
Insert into CONCERT_SAMPLE_APP.VENUES (VENUE_ID,NAME,LOCATION,CITY_ID) values (116,'Celestial Stage','2nd Ave, Virelia',104);
Insert into CONCERT_SAMPLE_APP.VENUES (VENUE_ID,NAME,LOCATION,CITY_ID) values (117,'Galactic Theater','2nd Ave, Virelia',104);
Insert into CONCERT_SAMPLE_APP.VENUES (VENUE_ID,NAME,LOCATION,CITY_ID) values (118,'Starlight Ballroom','Sunset Rd, Aetheris',106);
Insert into CONCERT_SAMPLE_APP.VENUES (VENUE_ID,NAME,LOCATION,CITY_ID) values (119,'Mystic Springs Theater','Main St, Mirage Vortex',107);
Insert into CONCERT_SAMPLE_APP.VENUES (VENUE_ID,NAME,LOCATION,CITY_ID) values (120,'Prism Point','Main St, TerraNova',105);
Insert into CONCERT_SAMPLE_APP.VENUES (VENUE_ID,NAME,LOCATION,CITY_ID) values (121,'Velocity Hall','Sunset Rd, Mirage Vortex',107);
Insert into CONCERT_SAMPLE_APP.VENUES (VENUE_ID,NAME,LOCATION,CITY_ID) values (122,'Celestial Stage','Main St, Nocturne',108);
Insert into CONCERT_SAMPLE_APP.VENUES (VENUE_ID,NAME,LOCATION,CITY_ID) values (123,'Radiant Peak','2nd Ave, Aurora Nova',109);
Insert into CONCERT_SAMPLE_APP.VENUES (VENUE_ID,NAME,LOCATION,CITY_ID) values (124,'Harmonic Haven','Main St, TerraNova',105);
Insert into CONCERT_SAMPLE_APP.VENUES (VENUE_ID,NAME,LOCATION,CITY_ID) values (125,'Blue Moon Gardens','Park Blvd, Nocturne',108);
Insert into CONCERT_SAMPLE_APP.VENUES (VENUE_ID,NAME,LOCATION,CITY_ID) values (126,'Elysium Stage','Ocean Dr, Virelia',104);
Insert into CONCERT_SAMPLE_APP.VENUES (VENUE_ID,NAME,LOCATION,CITY_ID) values (127,'Solstice Pavilion','2nd Ave, Aurora Nova',109);
Insert into CONCERT_SAMPLE_APP.VENUES (VENUE_ID,NAME,LOCATION,CITY_ID) values (128,'Horizon Stage','Park Blvd, Virelia',104);
Insert into CONCERT_SAMPLE_APP.VENUES (VENUE_ID,NAME,LOCATION,CITY_ID) values (129,'Quantum Gardens','Ocean Dr, Solara Prime',101);
Insert into CONCERT_SAMPLE_APP.VENUES (VENUE_ID,NAME,LOCATION,CITY_ID) values (130,'Nebula Lounge','Main St, Solara Prime',101);
Insert into CONCERT_SAMPLE_APP.VENUES (VENUE_ID,NAME,LOCATION,CITY_ID) values (131,'Celestial Plaza','Main St, Aetheris',106);
Insert into CONCERT_SAMPLE_APP.VENUES (VENUE_ID,NAME,LOCATION,CITY_ID) values (132,'Aurora Pavilion','2nd Ave, Virelia',104);
Insert into CONCERT_SAMPLE_APP.VENUES (VENUE_ID,NAME,LOCATION,CITY_ID) values (133,'Neon Haven','Sunset Rd, Lyra’s End',110);
Insert into CONCERT_SAMPLE_APP.VENUES (VENUE_ID,NAME,LOCATION,CITY_ID) values (134,'Zephyr Peak','Main St, Lyra’s End',110);
Insert into CONCERT_SAMPLE_APP.VENUES (VENUE_ID,NAME,LOCATION,CITY_ID) values (135,'Rift Pavilion','Ocean Dr, TerraNova',105);
Insert into CONCERT_SAMPLE_APP.VENUES (VENUE_ID,NAME,LOCATION,CITY_ID) values (136,'Midnight Mirage','Ocean Dr, Lyra’s End',110);
Insert into CONCERT_SAMPLE_APP.VENUES (VENUE_ID,NAME,LOCATION,CITY_ID) values (137,'Starlight Ballroom','Main St, Mirage Vortex',107);
Insert into CONCERT_SAMPLE_APP.VENUES (VENUE_ID,NAME,LOCATION,CITY_ID) values (138,'Blue Moon Stage','2nd Ave, Aurora Nova',109);
Insert into CONCERT_SAMPLE_APP.VENUES (VENUE_ID,NAME,LOCATION,CITY_ID) values (139,'Solstice Pavilion','Park Blvd, Aetheris',106);
Insert into CONCERT_SAMPLE_APP.VENUES (VENUE_ID,NAME,LOCATION,CITY_ID) values (140,'Ember Pavilion','Ocean Dr, Luminara',102);
Insert into CONCERT_SAMPLE_APP.VENUES (VENUE_ID,NAME,LOCATION,CITY_ID) values (141,'Echo Heights','Main St, Aurora Nova',109);
Insert into CONCERT_SAMPLE_APP.VENUES (VENUE_ID,NAME,LOCATION,CITY_ID) values (142,'Galactic Theater','Main St, Solara Prime',101);
Insert into CONCERT_SAMPLE_APP.VENUES (VENUE_ID,NAME,LOCATION,CITY_ID) values (143,'Spectrum Theater','Park Blvd, Virelia',104);
Insert into CONCERT_SAMPLE_APP.VENUES (VENUE_ID,NAME,LOCATION,CITY_ID) values (144,'Elysium Stage','2nd Ave, Aetheris',106);
Insert into CONCERT_SAMPLE_APP.VENUES (VENUE_ID,NAME,LOCATION,CITY_ID) values (145,'Aurora Falls Amphitheater','Sunset Rd, Mirage Vortex',107);
Insert into CONCERT_SAMPLE_APP.VENUES (VENUE_ID,NAME,LOCATION,CITY_ID) values (146,'Radiant Falls','Park Blvd, Mirage Vortex',107);
Insert into CONCERT_SAMPLE_APP.VENUES (VENUE_ID,NAME,LOCATION,CITY_ID) values (147,'Echo Plaza','Sunset Rd, Mirage Vortex',107);
Insert into CONCERT_SAMPLE_APP.VENUES (VENUE_ID,NAME,LOCATION,CITY_ID) values (148,'Zephyr Peak','Main St, TerraNova',105);
Insert into CONCERT_SAMPLE_APP.VENUES (VENUE_ID,NAME,LOCATION,CITY_ID) values (149,'Chroma Cove','Main St, Mirage Vortex',107);
Insert into CONCERT_SAMPLE_APP.VENUES (VENUE_ID,NAME,LOCATION,CITY_ID) values (150,'Aurora Point','Main St, Luminara',102);
Insert into CONCERT_SAMPLE_APP.VENUES (VENUE_ID,NAME,LOCATION,CITY_ID) values (151,'Prism Palace','Sunset Rd, Luminara',102);
Insert into CONCERT_SAMPLE_APP.VENUES (VENUE_ID,NAME,LOCATION,CITY_ID) values (152,'Velocity Plaza','2nd Ave, Nocturne',108);
Insert into CONCERT_SAMPLE_APP.VENUES (VENUE_ID,NAME,LOCATION,CITY_ID) values (153,'Ember Hall','Sunset Rd, NeoNexus',100);
Insert into CONCERT_SAMPLE_APP.VENUES (VENUE_ID,NAME,LOCATION,CITY_ID) values (154,'Dawn Sanctuary','Main St, Solara Prime',101);
Insert into CONCERT_SAMPLE_APP.VENUES (VENUE_ID,NAME,LOCATION,CITY_ID) values (155,'Aurora Amphitheater','Sunset Rd, NeoNexus',100);
Insert into CONCERT_SAMPLE_APP.VENUES (VENUE_ID,NAME,LOCATION,CITY_ID) values (156,'Ethereal Pavilion','2nd Ave, NeoNexus',100);
Insert into CONCERT_SAMPLE_APP.VENUES (VENUE_ID,NAME,LOCATION,CITY_ID) values (157,'Aurora Peak','Sunset Rd, Mirage Vortex',107);
Insert into CONCERT_SAMPLE_APP.VENUES (VENUE_ID,NAME,LOCATION,CITY_ID) values (158,'Velocity Hall','2nd Ave, Aurora Nova',109);
Insert into CONCERT_SAMPLE_APP.VENUES (VENUE_ID,NAME,LOCATION,CITY_ID) values (159,'Whispering Pines Theater','Park Blvd, Aquapolis',103);
Insert into CONCERT_SAMPLE_APP.VENUES (VENUE_ID,NAME,LOCATION,CITY_ID) values (160,'Harmony Cove','Park Blvd, Solara Prime',101);
Insert into CONCERT_SAMPLE_APP.VENUES (VENUE_ID,NAME,LOCATION,CITY_ID) values (161,'Vortex Plaza','Ocean Dr, Aetheris',106);
Insert into CONCERT_SAMPLE_APP.VENUES (VENUE_ID,NAME,LOCATION,CITY_ID) values (162,'Solar Flare Arena','Sunset Rd, Aquapolis',103);
Insert into CONCERT_SAMPLE_APP.VENUES (VENUE_ID,NAME,LOCATION,CITY_ID) values (163,'Serenity Gardens','Sunset Rd, Luminara',102);
Insert into CONCERT_SAMPLE_APP.VENUES (VENUE_ID,NAME,LOCATION,CITY_ID) values (164,'Harmony Cove','2nd Ave, Nocturne',108);
Insert into CONCERT_SAMPLE_APP.VENUES (VENUE_ID,NAME,LOCATION,CITY_ID) values (165,'Phoenix Hall','Park Blvd, Aquapolis',103);
Insert into CONCERT_SAMPLE_APP.VENUES (VENUE_ID,NAME,LOCATION,CITY_ID) values (166,'Harmony Cove','Park Blvd, Virelia',104);
Insert into CONCERT_SAMPLE_APP.VENUES (VENUE_ID,NAME,LOCATION,CITY_ID) values (167,'Nova Stage','Ocean Dr, Nocturne',108);
Insert into CONCERT_SAMPLE_APP.VENUES (VENUE_ID,NAME,LOCATION,CITY_ID) values (168,'Twilight Grove','Sunset Rd, Aetheris',106);
Insert into CONCERT_SAMPLE_APP.VENUES (VENUE_ID,NAME,LOCATION,CITY_ID) values (169,'Nova Plaza','2nd Ave, NeoNexus',100);
Insert into CONCERT_SAMPLE_APP.VENUES (VENUE_ID,NAME,LOCATION,CITY_ID) values (170,'Celestial Stage','Ocean Dr, Aurora Nova',109);
Insert into CONCERT_SAMPLE_APP.VENUES (VENUE_ID,NAME,LOCATION,CITY_ID) values (171,'Radiant Falls','Sunset Rd, Aquapolis',103);
Insert into CONCERT_SAMPLE_APP.VENUES (VENUE_ID,NAME,LOCATION,CITY_ID) values (172,'Dawn Sanctuary','Ocean Dr, Aetheris',106);
Insert into CONCERT_SAMPLE_APP.VENUES (VENUE_ID,NAME,LOCATION,CITY_ID) values (173,'Twilight Grove','Sunset Rd, Mirage Vortex',107);
Insert into CONCERT_SAMPLE_APP.VENUES (VENUE_ID,NAME,LOCATION,CITY_ID) values (174,'Zephyr Theater','Ocean Dr, Aetheris',106);
Insert into CONCERT_SAMPLE_APP.VENUES (VENUE_ID,NAME,LOCATION,CITY_ID) values (175,'Spectrum Theater','Main St, Virelia',104);
Insert into CONCERT_SAMPLE_APP.VENUES (VENUE_ID,NAME,LOCATION,CITY_ID) values (176,'Starlight Ballroom','Main St, Solara Prime',101);
Insert into CONCERT_SAMPLE_APP.VENUES (VENUE_ID,NAME,LOCATION,CITY_ID) values (177,'Harmony Cove','Ocean Dr, Mirage Vortex',107);
Insert into CONCERT_SAMPLE_APP.VENUES (VENUE_ID,NAME,LOCATION,CITY_ID) values (178,'Ethereal Pavilion','Ocean Dr, Luminara',102);
Insert into CONCERT_SAMPLE_APP.VENUES (VENUE_ID,NAME,LOCATION,CITY_ID) values (179,'Ethereal Pavilion','2nd Ave, TerraNova',105);
Insert into CONCERT_SAMPLE_APP.VENUES (VENUE_ID,NAME,LOCATION,CITY_ID) values (180,'Eclipse Pavilion','Ocean Dr, Luminara',102);
Insert into CONCERT_SAMPLE_APP.VENUES (VENUE_ID,NAME,LOCATION,CITY_ID) values (181,'Crimson Plaza','Main St, Aurora Nova',109);
Insert into CONCERT_SAMPLE_APP.VENUES (VENUE_ID,NAME,LOCATION,CITY_ID) values (182,'Dawn Sanctuary','Sunset Rd, Mirage Vortex',107);
Insert into CONCERT_SAMPLE_APP.VENUES (VENUE_ID,NAME,LOCATION,CITY_ID) values (183,'Serenity Gardens','Sunset Rd, Solara Prime',101);
Insert into CONCERT_SAMPLE_APP.VENUES (VENUE_ID,NAME,LOCATION,CITY_ID) values (184,'Pulse Point','Ocean Dr, Virelia',104);
Insert into CONCERT_SAMPLE_APP.VENUES (VENUE_ID,NAME,LOCATION,CITY_ID) values (185,'Gravity Point','Park Blvd, Aetheris',106);
Insert into CONCERT_SAMPLE_APP.VENUES (VENUE_ID,NAME,LOCATION,CITY_ID) values (186,'Velocity Hall','Sunset Rd, Aetheris',106);
Insert into CONCERT_SAMPLE_APP.VENUES (VENUE_ID,NAME,LOCATION,CITY_ID) values (187,'Solstice Pavilion','Sunset Rd, Solara Prime',101);
Insert into CONCERT_SAMPLE_APP.VENUES (VENUE_ID,NAME,LOCATION,CITY_ID) values (188,'Glimmer Amphitheater','Park Blvd, Solara Prime',101);
Insert into CONCERT_SAMPLE_APP.VENUES (VENUE_ID,NAME,LOCATION,CITY_ID) values (189,'Mystic Springs Theater','Park Blvd, Aetheris',106);
Insert into CONCERT_SAMPLE_APP.VENUES (VENUE_ID,NAME,LOCATION,CITY_ID) values (190,'Harmonic Haven','Park Blvd, Aurora Nova',109);
Insert into CONCERT_SAMPLE_APP.VENUES (VENUE_ID,NAME,LOCATION,CITY_ID) values (191,'Ethereal Pavilion','2nd Ave, Aquapolis',103);
Insert into CONCERT_SAMPLE_APP.VENUES (VENUE_ID,NAME,LOCATION,CITY_ID) values (192,'Mystic Springs Theater','Ocean Dr, TerraNova',105);
Insert into CONCERT_SAMPLE_APP.VENUES (VENUE_ID,NAME,LOCATION,CITY_ID) values (193,'Titanium Heights','2nd Ave, Mirage Vortex',107);
Insert into CONCERT_SAMPLE_APP.VENUES (VENUE_ID,NAME,LOCATION,CITY_ID) values (194,'Aurora Pavilion','Main St, NeoNexus',100);
Insert into CONCERT_SAMPLE_APP.VENUES (VENUE_ID,NAME,LOCATION,CITY_ID) values (195,'Spectrum Point','2nd Ave, Aurora Nova',109);
Insert into CONCERT_SAMPLE_APP.VENUES (VENUE_ID,NAME,LOCATION,CITY_ID) values (196,'Phoenix Stage','Main St, Aurora Nova',109);
--------------------------------------------------------
--  DDL for Index ARTISTS_PK
--------------------------------------------------------

  CREATE UNIQUE INDEX "CONCERT_SAMPLE_APP"."ARTISTS_PK" ON "CONCERT_SAMPLE_APP"."ARTISTS" ("ARTIST_ID") 
  PCTFREE 10 INITRANS 20 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1
  BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "DATA" ;
--------------------------------------------------------
--  DDL for Index EVENT_STATUS_PK
--------------------------------------------------------

  CREATE UNIQUE INDEX "CONCERT_SAMPLE_APP"."EVENT_STATUS_PK" ON "CONCERT_SAMPLE_APP"."EVENT_STATUS" ("EVENT_STATUS_ID") 
  PCTFREE 10 INITRANS 20 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1
  BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "DATA" ;
--------------------------------------------------------
--  DDL for Index CITIES_CITY_ID_PK
--------------------------------------------------------

  CREATE UNIQUE INDEX "CONCERT_SAMPLE_APP"."CITIES_CITY_ID_PK" ON "CONCERT_SAMPLE_APP"."CITIES" ("CITY_ID") 
  PCTFREE 10 INITRANS 20 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1
  BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "DATA" ;
--------------------------------------------------------
--  DDL for Index LIKED_ARTISTS_PK
--------------------------------------------------------

  CREATE UNIQUE INDEX "CONCERT_SAMPLE_APP"."LIKED_ARTISTS_PK" ON "CONCERT_SAMPLE_APP"."LIKED_ARTIST" ("USER_ID", "ARTIST_ID") 
  PCTFREE 10 INITRANS 20 MAXTRANS 255 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1
  BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "DATA" ;
--------------------------------------------------------
--  DDL for Index LIKED_VENUE_PK
--------------------------------------------------------

  CREATE UNIQUE INDEX "CONCERT_SAMPLE_APP"."LIKED_VENUE_PK" ON "CONCERT_SAMPLE_APP"."LIKED_VENUE" ("USER_ID", "VENUE_ID") 
  PCTFREE 10 INITRANS 20 MAXTRANS 255 
  TABLESPACE "DATA" ;
--------------------------------------------------------
--  DDL for Index VENUES_VENUE_ID_PK
--------------------------------------------------------

  CREATE UNIQUE INDEX "CONCERT_SAMPLE_APP"."VENUES_VENUE_ID_PK" ON "CONCERT_SAMPLE_APP"."VENUES" ("VENUE_ID") 
  PCTFREE 10 INITRANS 20 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1
  BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "DATA" ;
--------------------------------------------------------
--  DDL for Index LIKED_MUSIC_GENRES_PK
--------------------------------------------------------

  CREATE UNIQUE INDEX "CONCERT_SAMPLE_APP"."LIKED_MUSIC_GENRES_PK" ON "CONCERT_SAMPLE_APP"."LIKED_MUSIC_GENRES" ("USER_ID", "MUSIC_GENRE_ID") 
  PCTFREE 10 INITRANS 20 MAXTRANS 255 
  TABLESPACE "DATA" ;
--------------------------------------------------------
--  DDL for Index TICKET_PK
--------------------------------------------------------

  CREATE UNIQUE INDEX "CONCERT_SAMPLE_APP"."TICKET_PK" ON "CONCERT_SAMPLE_APP"."TICKET" ("EVENT_ID", "USER_ID") 
  PCTFREE 10 INITRANS 20 MAXTRANS 255 
  TABLESPACE "DATA" ;
--------------------------------------------------------
--  DDL for Index LIKED_EVENT_PK
--------------------------------------------------------

  CREATE UNIQUE INDEX "CONCERT_SAMPLE_APP"."LIKED_EVENT_PK" ON "CONCERT_SAMPLE_APP"."LIKED_EVENT" ("USER_ID", "EVENT_ID") 
  PCTFREE 10 INITRANS 20 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1
  BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "DATA" ;
--------------------------------------------------------
--  DDL for Index DBTOOLS$EXECUTION_HISTORY_PK
--------------------------------------------------------

  CREATE UNIQUE INDEX "CONCERT_SAMPLE_APP"."DBTOOLS$EXECUTION_HISTORY_PK" ON "CONCERT_SAMPLE_APP"."DBTOOLS$EXECUTION_HISTORY" ("ID") 
  PCTFREE 10 INITRANS 20 MAXTRANS 255 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1
  BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "DATA" ;
--------------------------------------------------------
--  DDL for Index EVENTS_EVENT_ID_PK
--------------------------------------------------------

  CREATE UNIQUE INDEX "CONCERT_SAMPLE_APP"."EVENTS_EVENT_ID_PK" ON "CONCERT_SAMPLE_APP"."EVENTS" ("EVENT_ID") 
  PCTFREE 10 INITRANS 20 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1
  BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "DATA" ;
--------------------------------------------------------
--  DDL for Index MUSIC_GENRES_MUSIC_GENRE_ID_PK
--------------------------------------------------------

  CREATE UNIQUE INDEX "CONCERT_SAMPLE_APP"."MUSIC_GENRES_MUSIC_GENRE_ID_PK" ON "CONCERT_SAMPLE_APP"."MUSIC_GENRES" ("MUSIC_GENRE_ID") 
  PCTFREE 10 INITRANS 20 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1
  BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "DATA" ;
--------------------------------------------------------
--  DDL for Trigger ARTIST_TRIG
--------------------------------------------------------

  CREATE OR REPLACE EDITIONABLE TRIGGER "CONCERT_SAMPLE_APP"."ARTIST_TRIG" 
      BEFORE INSERT ON ARTISTS
      FOR EACH ROW
      BEGIN
          SELECT ARTIST_SEQ.NEXTVAL
          INTO   :NEW.ARTIST_ID
          FROM   DUAL;
      END;

/
ALTER TRIGGER "CONCERT_SAMPLE_APP"."ARTIST_TRIG" ENABLE;
--------------------------------------------------------
--  DDL for Trigger CITIES_TRIG
--------------------------------------------------------

  CREATE OR REPLACE EDITIONABLE TRIGGER "CONCERT_SAMPLE_APP"."CITIES_TRIG" 
    BEFORE INSERT ON CITIES
    FOR EACH ROW
    
    BEGIN
        SELECT CITIES_SEQ.NEXTVAL
        INTO   :NEW.CITY_ID
        FROM   DUAL;
    END;

/
ALTER TRIGGER "CONCERT_SAMPLE_APP"."CITIES_TRIG" ENABLE;
--------------------------------------------------------
--  DDL for Trigger EVENTS_TRIG
--------------------------------------------------------

  CREATE OR REPLACE EDITIONABLE TRIGGER "CONCERT_SAMPLE_APP"."EVENTS_TRIG" 
      BEFORE INSERT ON EVENTS
      FOR EACH ROW
      BEGIN
        SELECT EVENTS_SEQ.NEXTVAL
        INTO   :NEW.EVENT_ID
        FROM   DUAL;
      END;

/
ALTER TRIGGER "CONCERT_SAMPLE_APP"."EVENTS_TRIG" ENABLE;
--------------------------------------------------------
--  DDL for Trigger MUSIC_GENRE_TRIG
--------------------------------------------------------

  CREATE OR REPLACE EDITIONABLE TRIGGER "CONCERT_SAMPLE_APP"."MUSIC_GENRE_TRIG" 
    BEFORE INSERT ON MUSIC_GENRES
    FOR EACH ROW
    
    BEGIN
        SELECT MUSIC_GENRES_SEQ.NEXTVAL
        INTO   :NEW.MUSIC_GENRE_ID
        FROM   DUAL;
    END;

/
ALTER TRIGGER "CONCERT_SAMPLE_APP"."MUSIC_GENRE_TRIG" ENABLE;
--------------------------------------------------------
--  DDL for Trigger VENUES_TRIG
--------------------------------------------------------

  CREATE OR REPLACE EDITIONABLE TRIGGER "CONCERT_SAMPLE_APP"."VENUES_TRIG" 
      BEFORE INSERT ON VENUES
      FOR EACH ROW
      BEGIN
        SELECT VENUES_SEQ.NEXTVAL
        INTO   :NEW.VENUE_ID
        FROM   DUAL;
      END;

/
ALTER TRIGGER "CONCERT_SAMPLE_APP"."VENUES_TRIG" ENABLE;
--------------------------------------------------------
--  Constraints for Table MUSIC_GENRES
--------------------------------------------------------

  ALTER TABLE "CONCERT_SAMPLE_APP"."MUSIC_GENRES" MODIFY ("MUSIC_GENRE_ID" NOT NULL ENABLE);
  ALTER TABLE "CONCERT_SAMPLE_APP"."MUSIC_GENRES" MODIFY ("NAME" NOT NULL ENABLE);
  ALTER TABLE "CONCERT_SAMPLE_APP"."MUSIC_GENRES" MODIFY ("DESCRIPTION" NOT NULL ENABLE);
  ALTER TABLE "CONCERT_SAMPLE_APP"."MUSIC_GENRES" ADD CONSTRAINT "MUSIC_GENRES_MUSIC_GENRE_ID_PK" PRIMARY KEY ("MUSIC_GENRE_ID")
  USING INDEX PCTFREE 10 INITRANS 20 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1
  BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "DATA"  ENABLE;
--------------------------------------------------------
--  Constraints for Table TICKET
--------------------------------------------------------

  ALTER TABLE "CONCERT_SAMPLE_APP"."TICKET" MODIFY ("EVENT_ID" NOT NULL ENABLE);
  ALTER TABLE "CONCERT_SAMPLE_APP"."TICKET" MODIFY ("USER_ID" NOT NULL ENABLE);
  ALTER TABLE "CONCERT_SAMPLE_APP"."TICKET" ADD CONSTRAINT "TICKET_PK" PRIMARY KEY ("EVENT_ID", "USER_ID")
  USING INDEX PCTFREE 10 INITRANS 20 MAXTRANS 255 
  TABLESPACE "DATA"  ENABLE;
--------------------------------------------------------
--  Constraints for Table ARTISTS
--------------------------------------------------------

  ALTER TABLE "CONCERT_SAMPLE_APP"."ARTISTS" MODIFY ("ARTIST_ID" NOT NULL ENABLE);
  ALTER TABLE "CONCERT_SAMPLE_APP"."ARTISTS" MODIFY ("NAME" NOT NULL ENABLE);
  ALTER TABLE "CONCERT_SAMPLE_APP"."ARTISTS" MODIFY ("DESCRIPTION" NOT NULL ENABLE);
  ALTER TABLE "CONCERT_SAMPLE_APP"."ARTISTS" MODIFY ("BIO" NOT NULL ENABLE);
  ALTER TABLE "CONCERT_SAMPLE_APP"."ARTISTS" ADD CONSTRAINT "ARTISTS_PK" PRIMARY KEY ("ARTIST_ID")
  USING INDEX PCTFREE 10 INITRANS 20 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1
  BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "DATA"  ENABLE;
--------------------------------------------------------
--  Constraints for Table LIKED_MUSIC_GENRES
--------------------------------------------------------

  ALTER TABLE "CONCERT_SAMPLE_APP"."LIKED_MUSIC_GENRES" MODIFY ("USER_ID" NOT NULL ENABLE);
  ALTER TABLE "CONCERT_SAMPLE_APP"."LIKED_MUSIC_GENRES" MODIFY ("MUSIC_GENRE_ID" NOT NULL ENABLE);
  ALTER TABLE "CONCERT_SAMPLE_APP"."LIKED_MUSIC_GENRES" ADD CONSTRAINT "LIKED_MUSIC_GENRES_PK" PRIMARY KEY ("USER_ID", "MUSIC_GENRE_ID")
  USING INDEX PCTFREE 10 INITRANS 20 MAXTRANS 255 
  TABLESPACE "DATA"  ENABLE;
--------------------------------------------------------
--  Constraints for Table DBTOOLS$EXECUTION_HISTORY
--------------------------------------------------------

  ALTER TABLE "CONCERT_SAMPLE_APP"."DBTOOLS$EXECUTION_HISTORY" MODIFY ("ID" NOT NULL ENABLE);
  ALTER TABLE "CONCERT_SAMPLE_APP"."DBTOOLS$EXECUTION_HISTORY" ADD CONSTRAINT "DBTOOLS$EXECUTION_HISTORY_PK" PRIMARY KEY ("ID")
  USING INDEX PCTFREE 10 INITRANS 20 MAXTRANS 255 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1
  BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "DATA"  ENABLE;
--------------------------------------------------------
--  Constraints for Table VENUES
--------------------------------------------------------

  ALTER TABLE "CONCERT_SAMPLE_APP"."VENUES" MODIFY ("VENUE_ID" NOT NULL ENABLE);
  ALTER TABLE "CONCERT_SAMPLE_APP"."VENUES" MODIFY ("NAME" NOT NULL ENABLE);
  ALTER TABLE "CONCERT_SAMPLE_APP"."VENUES" MODIFY ("LOCATION" NOT NULL ENABLE);
  ALTER TABLE "CONCERT_SAMPLE_APP"."VENUES" MODIFY ("CITY_ID" NOT NULL ENABLE);
  ALTER TABLE "CONCERT_SAMPLE_APP"."VENUES" ADD CONSTRAINT "VENUES_VENUE_ID_PK" PRIMARY KEY ("VENUE_ID")
  USING INDEX PCTFREE 10 INITRANS 20 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1
  BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "DATA"  ENABLE;
--------------------------------------------------------
--  Constraints for Table ARTIST_CLASSIFICATIONS
--------------------------------------------------------

  ALTER TABLE "CONCERT_SAMPLE_APP"."ARTIST_CLASSIFICATIONS" MODIFY ("ARTIST_ID" NOT NULL ENABLE);
  ALTER TABLE "CONCERT_SAMPLE_APP"."ARTIST_CLASSIFICATIONS" MODIFY ("MUSIC_GENRE_ID" NOT NULL ENABLE);
--------------------------------------------------------
--  Constraints for Table LIKED_EVENT
--------------------------------------------------------

  ALTER TABLE "CONCERT_SAMPLE_APP"."LIKED_EVENT" MODIFY ("USER_ID" NOT NULL ENABLE);
  ALTER TABLE "CONCERT_SAMPLE_APP"."LIKED_EVENT" MODIFY ("EVENT_ID" NOT NULL ENABLE);
  ALTER TABLE "CONCERT_SAMPLE_APP"."LIKED_EVENT" ADD CONSTRAINT "LIKED_EVENT_PK" PRIMARY KEY ("USER_ID", "EVENT_ID")
  USING INDEX PCTFREE 10 INITRANS 20 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1
  BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "DATA"  ENABLE;
--------------------------------------------------------
--  Constraints for Table EVENT_STATUS
--------------------------------------------------------

  ALTER TABLE "CONCERT_SAMPLE_APP"."EVENT_STATUS" MODIFY ("EVENT_STATUS_NAME" NOT NULL ENABLE);
  ALTER TABLE "CONCERT_SAMPLE_APP"."EVENT_STATUS" MODIFY ("EVENT_STATUS_DESCRIPTION" NOT NULL ENABLE);
  ALTER TABLE "CONCERT_SAMPLE_APP"."EVENT_STATUS" ADD CONSTRAINT "EVENT_STATUS_PK" PRIMARY KEY ("EVENT_STATUS_ID")
  USING INDEX PCTFREE 10 INITRANS 20 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1
  BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "DATA"  ENABLE;
--------------------------------------------------------
--  Constraints for Table LIKED_ARTIST
--------------------------------------------------------

  ALTER TABLE "CONCERT_SAMPLE_APP"."LIKED_ARTIST" MODIFY ("USER_ID" NOT NULL ENABLE);
  ALTER TABLE "CONCERT_SAMPLE_APP"."LIKED_ARTIST" MODIFY ("ARTIST_ID" NOT NULL ENABLE);
  ALTER TABLE "CONCERT_SAMPLE_APP"."LIKED_ARTIST" ADD CONSTRAINT "LIKED_ARTISTS_PK" PRIMARY KEY ("USER_ID", "ARTIST_ID")
  USING INDEX PCTFREE 10 INITRANS 20 MAXTRANS 255 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1
  BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "DATA"  ENABLE;
--------------------------------------------------------
--  Constraints for Table LIKED_VENUE
--------------------------------------------------------

  ALTER TABLE "CONCERT_SAMPLE_APP"."LIKED_VENUE" MODIFY ("USER_ID" NOT NULL ENABLE);
  ALTER TABLE "CONCERT_SAMPLE_APP"."LIKED_VENUE" MODIFY ("VENUE_ID" NOT NULL ENABLE);
  ALTER TABLE "CONCERT_SAMPLE_APP"."LIKED_VENUE" ADD CONSTRAINT "LIKED_VENUE_PK" PRIMARY KEY ("USER_ID", "VENUE_ID")
  USING INDEX PCTFREE 10 INITRANS 20 MAXTRANS 255 
  TABLESPACE "DATA"  ENABLE;
--------------------------------------------------------
--  Constraints for Table CITIES
--------------------------------------------------------

  ALTER TABLE "CONCERT_SAMPLE_APP"."CITIES" MODIFY ("CITY_ID" NOT NULL ENABLE);
  ALTER TABLE "CONCERT_SAMPLE_APP"."CITIES" MODIFY ("NAME" NOT NULL ENABLE);
  ALTER TABLE "CONCERT_SAMPLE_APP"."CITIES" MODIFY ("DESCRIPTION" NOT NULL ENABLE);
  ALTER TABLE "CONCERT_SAMPLE_APP"."CITIES" ADD CONSTRAINT "CITIES_CITY_ID_PK" PRIMARY KEY ("CITY_ID")
  USING INDEX PCTFREE 10 INITRANS 20 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1
  BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "DATA"  ENABLE;
--------------------------------------------------------
--  Constraints for Table EVENTS
--------------------------------------------------------

  ALTER TABLE "CONCERT_SAMPLE_APP"."EVENTS" MODIFY ("EVENT_ID" NOT NULL ENABLE);
  ALTER TABLE "CONCERT_SAMPLE_APP"."EVENTS" MODIFY ("EVENT_DATE" NOT NULL ENABLE);
  ALTER TABLE "CONCERT_SAMPLE_APP"."EVENTS" MODIFY ("ARTIST_ID" NOT NULL ENABLE);
  ALTER TABLE "CONCERT_SAMPLE_APP"."EVENTS" MODIFY ("VENUE_ID" NOT NULL ENABLE);
  ALTER TABLE "CONCERT_SAMPLE_APP"."EVENTS" MODIFY ("EVENT_STATUS_ID" NOT NULL ENABLE);
  ALTER TABLE "CONCERT_SAMPLE_APP"."EVENTS" MODIFY ("EVENT_DETAILS" NOT NULL ENABLE);
  ALTER TABLE "CONCERT_SAMPLE_APP"."EVENTS" ADD CONSTRAINT "EVENTS_EVENT_ID_PK" PRIMARY KEY ("EVENT_ID")
  USING INDEX PCTFREE 10 INITRANS 20 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1
  BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "DATA"  ENABLE;
--------------------------------------------------------
--  Ref Constraints for Table ARTIST_CLASSIFICATIONS
--------------------------------------------------------

  ALTER TABLE "CONCERT_SAMPLE_APP"."ARTIST_CLASSIFICATIONS" ADD CONSTRAINT "ARTIST_CLASSIFICATIONS_ARTIST_ID_FK" FOREIGN KEY ("ARTIST_ID")
	  REFERENCES "CONCERT_SAMPLE_APP"."ARTISTS" ("ARTIST_ID") ENABLE;
  ALTER TABLE "CONCERT_SAMPLE_APP"."ARTIST_CLASSIFICATIONS" ADD CONSTRAINT "ARTIST_CLASSIFICATIONS_MUSIC_GENRE_ID_FK" FOREIGN KEY ("MUSIC_GENRE_ID")
	  REFERENCES "CONCERT_SAMPLE_APP"."MUSIC_GENRES" ("MUSIC_GENRE_ID") ENABLE;
--------------------------------------------------------
--  Ref Constraints for Table EVENTS
--------------------------------------------------------

  ALTER TABLE "CONCERT_SAMPLE_APP"."EVENTS" ADD CONSTRAINT "EVENTS_ARTIST_ID_FK" FOREIGN KEY ("ARTIST_ID")
	  REFERENCES "CONCERT_SAMPLE_APP"."ARTISTS" ("ARTIST_ID") ENABLE;
  ALTER TABLE "CONCERT_SAMPLE_APP"."EVENTS" ADD CONSTRAINT "EVENTS_VENUE_ID_FK" FOREIGN KEY ("VENUE_ID")
	  REFERENCES "CONCERT_SAMPLE_APP"."VENUES" ("VENUE_ID") ENABLE;
  ALTER TABLE "CONCERT_SAMPLE_APP"."EVENTS" ADD CONSTRAINT "EVENTS_EVENT_STATUS_ID_FK" FOREIGN KEY ("EVENT_STATUS_ID")
	  REFERENCES "CONCERT_SAMPLE_APP"."EVENT_STATUS" ("EVENT_STATUS_ID") ENABLE;
--------------------------------------------------------
--  Ref Constraints for Table LIKED_ARTIST
--------------------------------------------------------

  ALTER TABLE "CONCERT_SAMPLE_APP"."LIKED_ARTIST" ADD CONSTRAINT "LIKED_ARTIST_ARTIST_ID_FK" FOREIGN KEY ("ARTIST_ID")
	  REFERENCES "CONCERT_SAMPLE_APP"."ARTISTS" ("ARTIST_ID") ENABLE;
--------------------------------------------------------
--  Ref Constraints for Table LIKED_EVENT
--------------------------------------------------------

  ALTER TABLE "CONCERT_SAMPLE_APP"."LIKED_EVENT" ADD CONSTRAINT "LIKED_EVENT_EVENT_ID_FK" FOREIGN KEY ("EVENT_ID")
	  REFERENCES "CONCERT_SAMPLE_APP"."EVENTS" ("EVENT_ID") ENABLE;
--------------------------------------------------------
--  Ref Constraints for Table LIKED_MUSIC_GENRES
--------------------------------------------------------

  ALTER TABLE "CONCERT_SAMPLE_APP"."LIKED_MUSIC_GENRES" ADD CONSTRAINT "LIKED_MUSIC_GENRE_ARTIST_ID_FK" FOREIGN KEY ("MUSIC_GENRE_ID")
	  REFERENCES "CONCERT_SAMPLE_APP"."MUSIC_GENRES" ("MUSIC_GENRE_ID") ENABLE;
--------------------------------------------------------
--  Ref Constraints for Table LIKED_VENUE
--------------------------------------------------------

  ALTER TABLE "CONCERT_SAMPLE_APP"."LIKED_VENUE" ADD CONSTRAINT "LIKED_VENUE_VENUE_ID_FK" FOREIGN KEY ("VENUE_ID")
	  REFERENCES "CONCERT_SAMPLE_APP"."VENUES" ("VENUE_ID") ENABLE;
--------------------------------------------------------
--  Ref Constraints for Table TICKET
--------------------------------------------------------

  ALTER TABLE "CONCERT_SAMPLE_APP"."TICKET" ADD CONSTRAINT "TICKET_EVENT_ID_FK" FOREIGN KEY ("EVENT_ID")
	  REFERENCES "CONCERT_SAMPLE_APP"."EVENTS" ("EVENT_ID") ENABLE;
--------------------------------------------------------
--  Ref Constraints for Table VENUES
--------------------------------------------------------

  ALTER TABLE "CONCERT_SAMPLE_APP"."VENUES" ADD CONSTRAINT "VENUES_CITY_ID_FK" FOREIGN KEY ("CITY_ID")
	  REFERENCES "CONCERT_SAMPLE_APP"."CITIES" ("CITY_ID") ENABLE;
