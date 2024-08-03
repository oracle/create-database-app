/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './style.css';
import { convertCharsToBooleans, convertBooleansToChars } from '../utils/utils';
import { getTasks, createTask, updateTask, deleteTask } from '../api/rest-service';
import { TodoListInput } from './ToDoListInput';
import { TodoListFilter } from './ToDoListFilter';
import { TodoListItems } from './TodoListItems';
import { TodoListFooter } from './TodoListFooter';

const TodoList = () => {
    // State variables
    const [tasks, setTasks] = useState([]); // Holds the list of tasks
    const [inputValue, setInputValue] = useState(''); // Holds the value of the input field
    const [filter, setFilter] = useState('all'); // Holds the current filter type
    const [isLoading, setIsLoading] = useState(true); // Indicates whether the data is being loaded
    const [editTaskId, setEditTaskId] = useState(null); // Holds the ID of the task being edited
    const [refresh, setRefresh] = useState(1);

    // Fetch initial data
    useEffect(() => {
        fetchTodos();
    }, [refresh]);

    const fetchTodos = async () => {
        try {
            setIsLoading(true)
            const response = await getTasks();
            const responseWithBooleans = convertCharsToBooleans(response);
            setTasks(responseWithBooleans);
            setIsLoading(false);
        } catch (error) {
            console.log('Error fetching tasks:', error);
            toast.error('Error fetching tasks');
        }
    }

    // Filter tasks based on the selected filter
    const filteredTasks = tasks?.filter((task) => {
        if (filter === 'all') {
            return true;
        } else if (filter === 'completed') {
            return task.IS_COMPLETED;
        } else if (filter === 'uncompleted') {
            return !task.IS_COMPLETED;
        }
        return true;
    });

    // Render the todo list
    return (
        <div className={'todo-list-container'}>
            <ToastContainer />
            <div className={'todo-app'}>
                <section className={'filter-section'}>
                    <TodoListFilter
                        filter={filter}
                        setFilter={setFilter}
                    />
                </section>
                <section className={'tasks-section'}>
                    <TodoListInput
                        inputValue={inputValue}
                        setInputValue={setInputValue}
                        tasks={tasks}
                        editTaskId={editTaskId}
                        setEditTaskId={setEditTaskId}
                        setRefresh={setRefresh}
                    
                    />
                    <TodoListItems
                        tasks={tasks}
                        setInputValue={setInputValue}
                        setRefresh={setRefresh}
                        setEditTaskId={setEditTaskId}
                        isLoading={isLoading}
                        filteredTasks={filteredTasks}
                    />
                    <TodoListFooter
                        tasks={tasks}
                        setRefresh={setRefresh}
                    />
                </section>
            </div>
        </div>
    );
};

export default TodoList;