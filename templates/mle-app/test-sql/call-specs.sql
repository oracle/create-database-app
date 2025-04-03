
CREATE OR REPLACE PACKAGE user_package AS
    PROCEDURE newUserFunc(name IN VARCHAR2);
    FUNCTION getUser(id IN NUMBER) RETURN VARCHAR2;
    PROCEDURE updateUser(id IN NUMBER, name IN VARCHAR2);
    PROCEDURE deleteUser(id IN NUMBER);
END user_package;
/

CREATE OR REPLACE PACKAGE BODY user_package AS
    PROCEDURE
    newUserFunc(name IN VARCHAR2)
    AS MLE MODULE MLEAPP
    SIGNATURE 'newUser(string)';

    FUNCTION
    getUser(id IN NUMBER) RETURN VARCHAR2
    AS MLE MODULE MLEAPP
    SIGNATURE 'getUser(number)';

    PROCEDURE
    updateUser(id IN NUMBER, name IN VARCHAR2)
    AS MLE MODULE MLEAPP
    SIGNATURE 'updateUser(number, string)';

    PROCEDURE
    deleteUser(id IN NUMBER)
    AS MLE MODULE MLEAPP
    SIGNATURE 'deleteUser(number)';
END user_package;
/


EXECUTE USER_PACKAGE.NEWUSERFUNC('BLABLA');

SELECT USER_PACKAGE.GETUSER(5);

EXECUTE USER_PACKAGE.UPDATEUSER(5,'BLABLA');

SELECT USER_PACKAGE.GETUSER(5);

EXECUTE USER_PACKAGE.DELETEUSER(5);

SELECT USER_PACKAGE.GETUSER(5);

-- select * from users;

-- TRUNCATE table users;

CREATE OR REPLACE PACKAGE category_package AS
    PROCEDURE newCategory(name IN VARCHAR2, priority IN VARCHAR2);
    FUNCTION getCategory(id IN NUMBER) RETURN VARCHAR2;
    PROCEDURE updateCategory(id IN NUMBER, newName IN VARCHAR2, newPrio IN VARCHAR2);
    PROCEDURE deleteCategory(id IN NUMBER);
END category_package;
/

CREATE OR REPLACE PACKAGE BODY category_package AS
    PROCEDURE
    newCategory(name IN VARCHAR2, priority IN VARCHAR2)
    AS MLE MODULE MLEAPP
    SIGNATURE 'newCategory(string,string)';

    FUNCTION
    getCategory(id IN NUMBER) RETURN VARCHAR2
    AS MLE MODULE MLEAPP
    SIGNATURE 'getCategory(number)';

    PROCEDURE
    updateCategory(id IN NUMBER, newName IN VARCHAR2, newPrio IN VARCHAR2)
    AS MLE MODULE MLEAPP
    SIGNATURE 'updateCategory(number, string, string)';

    PROCEDURE
    deleteCategory(id IN NUMBER)
    AS MLE MODULE MLEAPP
    SIGNATURE 'deleteCategory(number)';
END category_package;
/

EXECUTE CATEGORY_PACKAGE.NEWCATEGORY('BLABLA','high');

SELECT CATEGORY_PACKAGE.GETCATEGORY(2);

EXECUTE CATEGORY_PACKAGE.UPDATECATEGORY(2,'NEW','low');

EXECUTE CATEGORY_PACKAGE.DELETECATEGORY(2);

SELECT CATEGORY_PACKAGE.GETCATEGORY(2);


CREATE OR REPLACE PACKAGE todo_package AS
    PROCEDURE newTodoItem(userId in NUMBER, categoryId in NUMBER, name IN VARCHAR2, completed IN BOOLEAN);
    FUNCTION getTodoItem(id IN NUMBER) RETURN VARCHAR2;
    PROCEDURE updateTodoItem(id IN NUMBER, newName IN VARCHAR2, newCompleted IN BOOLEAN);
    PROCEDURE deleteTodoItem(id IN NUMBER);
END todo_package;
/

CREATE OR REPLACE PACKAGE BODY todo_package AS
    PROCEDURE
    newTodoItem(userId in NUMBER, categoryId in NUMBER, name IN VARCHAR2, completed IN BOOLEAN)
    AS MLE MODULE MLEAPP
    SIGNATURE 'newTodoItem(number,number,string,boolean)';

    FUNCTION
    getTodoItem(id IN NUMBER) RETURN VARCHAR2
    AS MLE MODULE MLEAPP
    SIGNATURE 'getTodoItem(number)';

    PROCEDURE
    updateTodoItem(id IN NUMBER, newName IN VARCHAR2, newCompleted IN BOOLEAN)
    AS MLE MODULE MLEAPP
    SIGNATURE 'updateTodoItem(number, string, boolean)';

    PROCEDURE
    deleteTodoItem(id IN NUMBER)
    AS MLE MODULE MLEAPP
    SIGNATURE 'deleteTodoItem(number)';
END todo_package;
/


select * from users;
select * from CATEGORIES;

EXECUTE TODO_PACKAGE.NEWTODOITEM(6,3,'GROCERIES',TRUE);

select * from TODO_LIST;

select TODO_PACKAGE.GETTODOITEM(1);

EXECUTE TODO_PACKAGE.UPDATETODOITEM(1,'ERRANDS',FALSE);

select TODO_PACKAGE.GETTODOITEM(1);

EXECUTE TODO_PACKAGE.DELETETODOITEM(1);