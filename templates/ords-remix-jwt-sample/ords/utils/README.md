# ORDS Management Scripts - Drop Script

The ORDS Concert App Drop Script is designed to clean up and remove the ORDS Concert App Schema and its associated resources from the Oracle Database. This script is particularly useful for developers if you are making changes to the schema, something went wrong during the development process and need a fresh start or you just simply want to remove the ORDS Concert App Schema safely without having to do it manually.

Prerequisites

Before running the drop script, make sure the following prerequisites are met:

- Database Access: Ensure that you have the necessary privileges to drop users and manage schemas in the Oracle Database.

- Environment Variables: Set the following environment variables to configure the script:

```bash
ADB_ADMIN_USERNAME=username
ADB_ADMIN_PASSWORD=
ADB_ORDS_URL=example.com:8080/ords/
SCHEMA_NAME=test
SCHEMA_PASSWORD=
```

## The Drop Script Explained

The script executes a series of SQL statements to safely and thoroughly remove the ORDS Concert App Schema from the database. Below is a brief description of what each statement does: 

1. Disable Schema

```sql
BEGIN
    ORDS_ADMIN.ENABLE_SCHEMA(
        P_SCHEMA => 'CONCERT_SAMPLE_APP',
        P_ENABLED => FALSE);
    COMMIT;
END;
```

This statement disables the specified schema, preventing any further operations or access. It helps in safely deactivating the schema before dropping it.

2. Drop REST for the ORDS Concert App Schema:

```sql
BEGIN
    ORDS_ADMIN.DROP_REST_FOR_SCHEMA(
        P_SCHEMA => 'CONCERT_SAMPLE_APP'
    );
    COMMIT;
END;
```

This statement drops all RESTful services associated with the specified schema. It ensures that any RESTful endpoints and configurations linked to the schema are removed.

3. Drop Sessions

```sql
BEGIN
FOR R IN (SELECT SID,SERIAL#, INST_ID FROM GV$SESSION WHERE USERNAME='CONCERT_SAMPLE_APP')
    LOOP
        EXECUTE IMMEDIATE 
            'ALTER SYSTEM KILL SESSION ''' || R.SID || ',' || R.SERIAL# || ',@' || R.INST_ID || ''' IMMEDIATE';
    END LOOP;
END;
```

This statement kills all active sessions associated with the specified schema. It ensures that no active sessions are using the schema before it is dropped.

4. Drop the Schema

```sql
DROP USER CONCERT_SAMPLE_APP CASCADE;
```

This statement drops the specified user schema and all associated objects (tables, views, etc.). The `CASCADE` keyword ensures that all dependent objects are also removed.

## Running the Script

```bash
npm run drop

> ords-remix-jwt-sample@1.0.0 drop
> node ./ords/drop.js

id : 1
statement : begin
        ords_admin.drop_rest_for_schema(
            p_schema => 'CONCERT_SAMPLE_APP'
        );
        commit;
    end;
response:  
PL/SQL procedure successfully completed.
```