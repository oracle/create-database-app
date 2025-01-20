/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
import { toast } from 'react-toastify';

import { createTask, updateTask } from '../api/rest-service.js';

export const TodoListInput = (props) => {
    // Handle input change
    const handleInputChange = (event) => {
        props.setInputValue(event.target.value);
    };

    // Add a new task
    const handleAddTask = async () => {
        if (props.inputValue.trim() === '') {
            return;
        }

        const newTask = {
            name: props.inputValue
        };

        try {
            await createTask(newTask);
            props.setInputValue('');
            toast.success('Task added successfully');
            props.setRefresh((state) => state + 1);
        } catch (error) {
            console.log('Error adding task:', error);
            toast.error('Error adding task');
        }
    };

    // Update a task
    const handleUpdateTask = async () => {
        if (props.inputValue.trim() === '') {
            return;
        }

        const updatedTask = {
            name: props.inputValue
        };

        try {
            await updateTask(props.editTaskId, updatedTask);
            props.setInputValue('');
            props.setRefresh((state) => state + 1);
            props.setEditTaskId(null);
            toast.success('Task updated successfully');
        } catch (error) {
            console.log('Error updating task:', error);
            toast.error('Error updating task');
        }
    };

    return (
        <>
            <div className={"header"}><h2>Tasks</h2></div>
            <div className={'row'}>
                <input
                    type={'text'}
                    id={'add'}
                    placeholder={'Add your todo'}
                    autoFocus
                    value={props.inputValue}
                    onChange={handleInputChange}
                />
                <button className={'add-btn'} id={'btn'} onClick={props.editTaskId ? handleUpdateTask : handleAddTask}>
                    {props.editTaskId ? 'Update' : 'Add'}
                </button>
            </div>
            <div className={'info-tasks'}>
                <p>
                    Complete: <span>{props.tasks.filter((task) => task.IS_COMPLETED).length}</span>
                </p>
                <p>
                    Total: <span>{props.tasks.length}</span>
                </p>
            </div>
        </>
    );
}