/// <reference types="mle-js" />

enum priorities {
	LOW = "low",
	MEDIUM = "medium",
	HIGH = "high",
}

/**
 * Creates a new user in the database with the given name.
 *
 * Executes an SQL `insert` statement to add a new user to the `users` table.
 * The newly created user ID is returned.
 *
 * @param {string} name - The name of the new user to be added.
 * @returns {number} The ID of the newly created user.
 */
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

/**
 * Retrieves a user from the database based on the provided user ID.
 *
 * @param {number} id - The ID of the user to retrieve.
 * @returns {any} An object containing the user's ID and name if found, or null if no user is found.
 */
export function getUser(id: number): string | null {
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

	// Return the result as a JSON string so Oracle can handle it
	return result.rows?.[0] ? result.rows[0].NAME : null;
}

/**
 * Updates the name of the user with the given ID in the database.
 * 
 * @param {number} id - The ID of the user to be updated.
 * @param {string} newName - The new name to be set for the user.
 * 
 * @returns {boolean} Returns true if the update was successful.
 */
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

/**
 * Deletes a user from the database based on the provided user ID.
 *
 * Executes an SQL `delete` statement to remove the user from the `users` table.
 *
 * @param {number} id - The ID of the user to delete.
 * @returns {boolean} Returns true if the deletion was executed successfully.
 */
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

/**
 * Creates a new category in the database with the given name and priority.
 * 
 * Executes an SQL `insert` statement to add a new category to the `categories` table.
 * The newly created category ID is returned.
 *
 * @param {string} name - The name of the new category to be added.
 * @param {priorities} priority - The priority level of the new category. It can be one of `priorities.LOW`, `priorities.MEDIUM`, or `priorities.HIGH`.
 * @returns {number} The ID of the newly created category.
 */
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

/**
 * Retrieves a category from the database based on the provided category ID.
 *
 * Executes an SQL `select` statement to fetch the category details from the `categories` table.
 *
 * @param {number} id - The ID of the category to retrieve.
 * @returns {any} An object containing the category's ID, name, and priority if found, or null if no category is found.
 */
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

/**
 * Updates the name and priority of the category with the given ID in the database.
 * 
 * Executes an SQL `update` statement to modify the category's details in the `categories` table.
 *
 * @param {number} id - The ID of the category to be updated.
 * @param {string} newName - The new name to be set for the category.
 * @param {priorities} newPriority - The new priority level to be set for the category. It can be one of `priorities.LOW`, `priorities.MEDIUM`, or `priorities.HIGH`.
 * @returns {boolean} Returns true if the update was successful.
 */
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

/**
 * Deletes a category from the database based on the provided category ID.
 *
 * Executes an SQL `delete` statement to remove the category from the `categories` table.
 *
 * @param {number} id - The ID of the category to delete.
 * @returns {boolean} Returns true if the deletion was executed successfully.
 */
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

/**
 * Creates a new to-do item in the database with the given user ID, category ID, name, and completion status.
 *
 * Executes an SQL `insert` statement to add a new to-do item to the `todo_list` table.
 * The newly created to-do item ID is returned.
 *
 * @param {number} userId - The ID of the user associated with the to-do item.
 * @param {number} categoryId - The ID of the category associated with the to-do item.
 * @param {string} name - The name of the to-do item.
 * @param {boolean} [completed=false] - The completion status of the to-do item. Defaults to `false`.
 * @returns {number} The ID of the newly created to-do item.
 */
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

/**
 * Retrieves a to-do item from the database based on the provided to-do item ID.
 *
 * Executes an SQL `select` statement to fetch the to-do item details from the `todo_list` table.
 *
 * @param {number} id - The ID of the to-do item to retrieve.
 * @returns {any} An object containing the to-do item's ID, user ID (u_id), category ID (c_id), name, and completion status (completed) if found, or null if no to-do item is found.
 */
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

/**
 * Updates the name and completion status of the to-do item with the given ID in the database.
 *
 * Executes an SQL `update` statement to modify the to-do item's details in the `todo_list` table.
 *
 * @param {number} id - The ID of the to-do item to be updated.
 * @param {string} newName - The new name to be set for the to-do item.
 * @param {boolean} newCompleted - The new completion status to be set for the to-do item.
 * @returns {boolean} Returns true if the update was successful.
 */
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

/**
 * Deletes a to-do item from the database based on the provided to-do item ID.
 *
 * Executes an SQL `delete` statement to remove the to-do item from the `todo_list` table.
 *
 * @param {number} id - The ID of the to-do item to delete.
 * @returns {boolean} Returns true if the deletion was executed successfully.
 */
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

/**
 * Retrieves all to-do items for the given user ID from the database.
 *
 * Executes an SQL `select` statement to fetch all to-do items associated with the specified user from the `todo_list` table.
 *
 * @param {number} userId - The ID of the user whose to-do items are to be retrieved.
 * @returns {any[]} An array of objects, each containing the to-do item's ID, category ID (c_id), name, and completion status (completed).
 */
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