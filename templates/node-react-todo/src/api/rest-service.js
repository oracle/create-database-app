/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
const URL = './api/tasks/'

export const getTasks = async () => {
    const response = await fetch(URL, {
        method: 'GET',
    })

    if (!response.ok) {
        throw new Error('Failed to get tasks');
    }

    return response.json();
}

export const createTask = async (task) => {
    const response = await fetch(URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task)
    })

    if (!response.ok) {
        throw new Error('Failed to create task');
    }

    return response;
}

export const updateTask = async (taskId, task) => {
    const response = await fetch(`${URL}${taskId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task)
    })

    if (!response.ok) {
        throw new Error('Failed to update task');
    }

    return response;
}

export const deleteTask = async (taskId) => {
    const response = await fetch(`${URL}${taskId}`, {
        method: 'DELETE',
    })

    if (!response.ok) {
        throw new Error('Failed to delete task');
    }

    return response;
}
