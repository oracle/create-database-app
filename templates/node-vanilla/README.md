# Creating New Rest End Points

To create new REST endpoints you first need to determine what functionalities you want to add to your API. Then, you can define the endpoint names according to the REST convention.

## Read (GET)

This operation is used to retrieve existing resources.

```javascript
export const getTasks = async () => {
    const response = await fetch(URL, {
        method: 'GET',
    })

    if (!response.ok) {
        throw new Error('Failed to get tasks');
    }

    return response.json();
}
```
##  Create (Post)

This operation is used to create a new resource.

```javascript
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
```

## Update(PUT or PATCH)

This operation is used to modify an existing resource

```javascript
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
```

## Delete (DELETE)

This operation is used to remove a resource. 

```javascript
export const deleteTask = async (taskId) => {
    const response = await fetch(`${URL}${taskId}`, {
        method: 'DELETE',
    })

    if (!response.ok) {
        throw new Error('Failed to delete task');
    }

    return response;
}
```