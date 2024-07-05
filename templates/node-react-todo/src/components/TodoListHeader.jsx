/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
import React from 'react';
import { toast } from 'react-toastify';

import { createTask, updateTask } from '../api/rest-service';
import todoImage from "../images/todo.png"
export const TodoListHeader = (props) => {

    // Handle input change
    const handleInputChange = (event) => {
        props.setInputValue(event.target.value);
    };

    // Handle filter change
    const handleFilterChange = (filterType) => {
        props.setFilter(filterType);
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
            <h2>
                <img src={todoImage} alt={'todo-image'} /> Todo List
            </h2>
            <div className={'row'}>
                <input
                    type={'text'}
                    className={'add-task'}
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

            <div className={'filters'}>
                <div className={'dropdown'}>
                    <button className={'dropbtn'}>Filter Tasks</button>
                    <div className={'dropdown-content'}>
                        <a href={'#'} id={'all'} onClick={() => handleFilterChange('all')}>
                            All
                        </a>
                        <a href={'#'} id={'rem'} onClick={() => handleFilterChange('uncompleted')}>
                            Uncompleted
                        </a>
                        <a href={'#'} id={'com'} onClick={() => handleFilterChange('completed')}>
                            Completed
                        </a>
                    </div>
                </div>

                <div className={'completed-task'}>
                    <p>
                        Completed: <span id={'c-count'}>{props.tasks.filter((task) => task.IS_COMPLETED).length}</span>
                    </p>
                </div>
                <div className={'remaining-task'}>
                    <p>
                        <span id={'total-tasks'}>Total Tasks:
                            <span id={'tasks-counter'}>{props.tasks.length}</span>
                        </span>
                    </p>
                </div>
            </div>
        </>
    );
}