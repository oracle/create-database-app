SET ECHO ON
SET FEEDBACK 1
SET NUMWIDTH 10
SET LINESIZE 200
SET TRIMSPOOL ON
SET TAB OFF
SET PAGESIZE 100

SET SERVEROUTPUT ON;

CREATE OR REPLACE MLE MODULE MLEAPP
LANGUAGE JAVASCRIPT AS
// src/index.ts
function newUser(name) {
  const result = session.execute(
    "insert into users (name) values (:name) returning id into :id",
    {
      name: {
        dir: oracledb.BIND_IN,
        val: name,
        type: oracledb.STRING
      },
      id: {
        type: oracledb.NUMBER,
        dir: oracledb.BIND_OUT
      }
    }
  );
  const id = result.outBinds.id[0];
  return id;
}
function getUser(id) {
  const result = session.execute(
    "select name from users where id = :id",
    {
      id: {
        dir: oracledb.BIND_IN,
        val: id,
        type: oracledb.NUMBER
      }
    },
    { outFormat: oracledb.OUT_FORMAT_OBJECT }
  );
  let user = result.rows[0];
  if(user) {
    return result.rows[0].NAME;
  } else {
    return "";
  }
}
function updateUser(id, newName) {
  const result = session.execute(
    "update users set name = :name where id = :id",
    {
      id: {
        dir: oracledb.BIND_IN,
        val: id,
        type: oracledb.NUMBER
      },
      name: {
        dir: oracledb.BIND_IN,
        val: newName,
        type: oracledb.STRING
      }
    }
  );
}
function deleteUser(id) {
  const result = session.execute(
    "delete from users where id = :id",
    {
      id: {
        dir: oracledb.BIND_IN,
        val: id,
        type: oracledb.NUMBER
      }
    }
  );
}

function newCategory(name, priority) {
  const result = session.execute(
    "insert into categories (name, prio) values (:name, :prio) returning id into :id",
    {
      name: {
        dir: oracledb.BIND_IN,
        val: name,
        type: oracledb.STRING
      },
      prio: {
        dir: oracledb.BIND_IN,
        val: priority,
        type: oracledb.STRING
      },
      id: {
        type: oracledb.NUMBER,
        dir: oracledb.BIND_OUT
      }
    }
  );
}
function getCategory(id) {
  const result = session.execute(
    "select id, name, prio from categories where id = :id",
    {
      id: {
        dir: oracledb.BIND_IN,
        val: id,
        type: oracledb.NUMBER
      }
    },
    { outFormat: oracledb.OUT_FORMAT_OBJECT }
  );
  let category = result.rows[0];
  if(category) {
    return JSON.stringify(category);
  } else {
    return "";
  }
}
function updateCategory(id, newName, newPriority) {
  const result = session.execute(
    "update categories set name = :name, prio = :prio where id = :id",
    {
      id: {
        dir: oracledb.BIND_IN,
        val: id,
        type: oracledb.NUMBER
      },
      name: {
        dir: oracledb.BIND_IN,
        val: newName,
        type: oracledb.STRING
      },
      prio: {
        dir: oracledb.BIND_IN,
        val: newPriority,
        type: oracledb.STRING
      }
    }
  );
}
function deleteCategory(id) {
  const result = session.execute(
    "delete from categories where id = :id",
    {
      id: {
        dir: oracledb.BIND_IN,
        val: id,
        type: oracledb.NUMBER
      }
    }
  );
}
function newTodoItem(userId, categoryId, name, completed = false) {
  const result = session.execute(
    `insert into todo_list (u_id, c_id, name, completed) 
         values (:u_id, :c_id, :name, :completed) 
         returning id into :id`,
    {
      u_id: {
        dir: oracledb.BIND_IN,
        val: userId,
        type: oracledb.NUMBER
      },
      c_id: {
        dir: oracledb.BIND_IN,
        val: categoryId,
        type: oracledb.NUMBER
      },
      name: {
        dir: oracledb.BIND_IN,
        val: name,
        type: oracledb.STRING
      },
      completed: {
        dir: oracledb.BIND_IN,
        val: completed ? 1 : 0,
        type: oracledb.NUMBER
      },
      id: {
        type: oracledb.NUMBER,
        dir: oracledb.BIND_OUT
      }
    }
  );
  const id = result.outBinds.id[0];
  return id;
}
function getTodoItem(id) {
  const result = session.execute(
    `select id, u_id, c_id, name from todo_list where id = :id`,
    {
      id: {
        dir: oracledb.BIND_IN,
        val: id,
        type: oracledb.NUMBER
      }
    },
    { outFormat: oracledb.OUT_FORMAT_OBJECT }
  );
  let todoitem = result.rows[0];
  if(todoitem) {
    return JSON.stringify(todoitem);
  } else {
    return "";
  }
}
function updateTodoItem(id, newName, newCompleted) {
  const result = session.execute(
    `update todo_list set name = :name, completed = :completed where id = :id`,
    {
      id: {
        dir: oracledb.BIND_IN,
        val: id,
        type: oracledb.NUMBER
      },
      name: {
        dir: oracledb.BIND_IN,
        val: newName,
        type: oracledb.STRING
      },
      completed: {
        dir: oracledb.BIND_IN,
        val: newCompleted ? 1 : 0,
        type: oracledb.NUMBER
      }
    }
  );
  return true;
}
function deleteTodoItem(id) {
  const result = session.execute(
    "delete from todo_list where id = :id",
    {
      id: {
        dir: oracledb.BIND_IN,
        val: id,
        type: oracledb.NUMBER
      }
    }
  );
  return true;
}
function getTodosByUser(userId) {
  const result = session.execute(
    "select id, c_id, name, completed from todo_list where u_id = :u_id",
    {
      u_id: {
        dir: oracledb.BIND_IN,
        val: userId,
        type: oracledb.NUMBER
      }
    },
    { outFormat: oracledb.OUT_FORMAT_OBJECT }
  );
  return result.rows || [];
}
export {
  deleteCategory,
  deleteTodoItem,
  deleteUser,
  getCategory,
  getTodoItem,
  getTodosByUser,
  getUser,
  newCategory,
  newTodoItem,
  newUser,
  updateCategory,
  updateTodoItem,
  updateUser
};
/