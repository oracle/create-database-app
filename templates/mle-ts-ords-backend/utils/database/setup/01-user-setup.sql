ALTER SESSION SET CONTAINER = <%= serviceValue %>;

DECLARE
    v_user_count INT;
BEGIN
    SELECT COUNT(*) INTO v_user_count 
        FROM dba_users 
        WHERE username = UPPER('<%= connectionUsername %>');

    IF v_user_count = 0 THEN
        EXECUTE IMMEDIATE 'CREATE USER <%= connectionUsername %> IDENTIFIED BY "<%= connectionPassword %>"';
        EXECUTE IMMEDIATE 'GRANT CONNECT TO <%= connectionUsername %>';
        EXECUTE IMMEDIATE 'GRANT RESOURCE TO <%= connectionUsername %>';
        EXECUTE IMMEDIATE 'GRANT UNLIMITED TABLESPACE TO <%= connectionUsername %>';
        EXECUTE IMMEDIATE 'GRANT CONNECT, CREATE SESSION, CREATE PROCEDURE, CREATE TABLE TO <%= connectionUsername %>';
        EXECUTE IMMEDIATE 'GRANT EXECUTE ON JAVASCRIPT TO <%= connectionUsername %>';
        EXECUTE IMMEDIATE 'GRANT CREATE MLE TO <%= connectionUsername %>';
        EXECUTE IMMEDIATE 'GRANT CREATE ANY DIRECTORY TO <%= connectionUsername %>';
        EXECUTE IMMEDIATE 'GRANT EXECUTE DYNAMIC MLE TO <%= connectionUsername %>';
    END IF;
END;
/