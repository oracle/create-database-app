-- Copyright (c) 2024, Oracle and/or its affiliates.
-- All rights reserved
-- Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/

CREATE TABLE TASKS ( 
     ID           NUMBER GENERATED ALWAYS AS IDENTITY ( START WITH 1 CACHE 20 ) , 
     NAME         VARCHAR2 (4000) , 
     IS_COMPLETED VARCHAR2 (1) 
);

CREATE UNIQUE INDEX TASKS_PK ON TASKS ( 
    ID ASC 
);

ALTER TABLE TASKS
    ADD CONSTRAINT TASKS_PK PRIMARY KEY ( ID ) 
    USING INDEX TASKS_PK;
