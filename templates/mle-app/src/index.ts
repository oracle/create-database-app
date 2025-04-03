/// <reference types="mle-js" />

enum priorities {
	LOW = "low",
	MEDIUM = "medium",
	HIGH = "high",
}

export function newUser(name: string): number {
	const result = session.execute(
		"insert into users (name) values (:name) returning id into :id",
		{
			name: {
				dir: oracledb.BIND_IN,
				val: name,
				type: oracledb.STRING,
			},
			id: {
				type: oracledb.NUMBER,
				dir: oracledb.BIND_OUT,
			},
		},
	);

	const id = result.outBinds.id[0];

	return id;
}

export function getUser(id: number): any {
	const result = session.execute(
		"select id, name from users where id = :id",
		{
			id: {
				dir: oracledb.BIND_IN,
				val: id,
				type: oracledb.NUMBER,
			},
		},
		{ outFormat: oracledb.OUT_FORMAT_OBJECT }
	);

	return result.rows?.[0] || null;
}

export function updateUser(id: number, newName: string): boolean {
	const result = session.execute(
		"update users set name = :name where id = :id",
		{
			id: {
				dir: oracledb.BIND_IN,
				val: id,
				type: oracledb.NUMBER,
			},
			name: {
				dir: oracledb.BIND_IN,
				val: newName,
				type: oracledb.STRING,
			},
		},
	);
	return true;
}

export function deleteUser(id: number): boolean {
	const result = session.execute(
		"delete from users where id = :id",
		{
			id: {
				dir: oracledb.BIND_IN,
				val: id,
				type: oracledb.NUMBER,
			},
		},
	);

	return true;
}


export function newCategory(name: string, priority: priorities): number {
	const result = session.execute(
		"insert into categories (name, prio) values (:name, :prio) returning id into :id",
		{
			name: {
				dir: oracledb.BIND_IN,
				val: name,
				type: oracledb.STRING,
			},
			prio: {
				dir: oracledb.BIND_IN,
				val: priority,
				type: oracledb.STRING,
			},
			id: {
				type: oracledb.NUMBER,
				dir: oracledb.BIND_OUT,
			},
		},
	);

	const id = result.outBinds.id[0];

	return id;
}

export function getCategory(id: number): any {
	const result = session.execute(
		"select id, name, prio from categories where id = :id",
		{
			id: {
				dir: oracledb.BIND_IN,
				val: id,
				type: oracledb.NUMBER,
			},
		},
		{ outFormat: oracledb.OUT_FORMAT_OBJECT }
	);

	return result.rows?.[0] || null;
}

export function updateCategory(id: number, newName: string, newPriority: priorities): boolean {
	const result = session.execute(
		"update categories set name = :name, prio = :prio where id = :id",
		{
			id: {
				dir: oracledb.BIND_IN,
				val: id,
				type: oracledb.NUMBER,
			},
			name: {
				dir: oracledb.BIND_IN,
				val: newName,
				type: oracledb.STRING,
			},
			prio: {
				dir: oracledb.BIND_IN,
				val: newPriority,
				type: oracledb.STRING,
			},
		},
	);

	return true;
}

export function deleteCategory(id: number): boolean {
	const result = session.execute(
		"delete from categories where id = :id",
		{
			id: {
				dir: oracledb.BIND_IN,
				val: id,
				type: oracledb.NUMBER,
			},
		},
	);

	return true;
}

export function newTodoItem(userId: number, categoryId: number, name: string, completed: boolean = false): number {
	const result = session.execute(
		`insert into todo_list (u_id, c_id, name, completed) 
         values (:u_id, :c_id, :name, :completed) 
         returning id into :id`,
		{
			u_id: {
				dir: oracledb.BIND_IN,
				val: userId,
				type: oracledb.NUMBER,
			},
			c_id: {
				dir: oracledb.BIND_IN,
				val: categoryId,
				type: oracledb.NUMBER,
			},
			name: {
				dir: oracledb.BIND_IN,
				val: name,
				type: oracledb.STRING,
			},
			completed: {
				dir: oracledb.BIND_IN,
				val: completed ? 1 : 0,
				type: oracledb.NUMBER,
			},
			id: {
				type: oracledb.NUMBER,
				dir: oracledb.BIND_OUT,
			},
		}
	);

	const id = result.outBinds.id[0];
	return id;
}


export function getTodoItem(id: number): any {
	const result = session.execute(
		`select id, u_id, c_id, name, completed from todo_list where id = :id`,
		{
			id: {
				dir: oracledb.BIND_IN,
				val: id,
				type: oracledb.NUMBER,
			},
		},
		{ outFormat: oracledb.OUT_FORMAT_OBJECT }
	);

	return result.rows?.[0] || null;
}

export function updateTodoItem(id: number, newName: string, newCompleted: boolean): boolean {
	const result = session.execute(
		`update todo_list set name = :name, completed = :completed where id = :id`,
		{
			id: {
				dir: oracledb.BIND_IN,
				val: id,
				type: oracledb.NUMBER,
			},
			name: {
				dir: oracledb.BIND_IN,
				val: newName,
				type: oracledb.STRING,
			},
			completed: {
				dir: oracledb.BIND_IN,
				val: newCompleted ? 1 : 0,
				type: oracledb.NUMBER,
			},
		}
	);

	return true;
}

export function deleteTodoItem(id: number): boolean {
	const result = session.execute(
		"delete from todo_list where id = :id",
		{
			id: {
				dir: oracledb.BIND_IN,
				val: id,
				type: oracledb.NUMBER,
			},
		}
	);

	return true;
}


export function getTodosByUser(userId: number): any[] {
	const result = session.execute(
		"select id, c_id, name, completed from todo_list where u_id = :u_id",
		{
			u_id: {
				dir: oracledb.BIND_IN,
				val: userId,
				type: oracledb.NUMBER,
			},
		},
		{ outFormat: oracledb.OUT_FORMAT_OBJECT }
	);

	return result.rows || [];
}