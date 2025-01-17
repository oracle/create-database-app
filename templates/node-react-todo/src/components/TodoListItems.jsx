/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
import { toast } from 'react-toastify';

import { updateTask, deleteTask } from '../api/rest-service';
import { convertBooleansToChars } from '../utils/utils';
import checked from '../images/checked.png'
import unchecked from '../images/unchecked.png'
import loading from "../images/loading.gif"

export const TodoListItems = (props) => {

    // Handle checkbox change for a task
    const handleTaskCheckboxChange = async (taskId, actualStatus) => {
        const updatedTask = {
            is_completed: !actualStatus
        };

        try {
            await updateTask(taskId, convertBooleansToChars(updatedTask));
            props.setRefresh((state) => state + 1);
        } catch (error) {
            console.log('Error changing task status:', error);
            toast.error('Error changing task status');
        }
    };

    // Edit a task
    const handleEditTask = (taskId) => {
        props.setEditTaskId(taskId);
        const taskToEdit = props.tasks.find((task) => task.ID === taskId);
        props.setInputValue(taskToEdit.NAME);
    };

    // Delete a task
    const handleDeleteTask = async (taskId) => {
        try {
            await deleteTask(taskId);
            props.setRefresh((state) => state + 1);
            toast.success('Task deleted successfully');
        } catch (error) {
            console.log('Error deleting task:', error);
            toast.error('Error deleting task');
        }
    };

    return (
        <>
        {props.isLoading ?
            <div className={'loading-container'}>
                <img src={loading} alt={'loading-image'} className={'loading-image'} />
            </div>
            :
            <ul className={"unordered-list"}>
                {props.filteredTasks.map((task) => (
                    <li className={`list-item ${task.IS_COMPLETED ? 'checked' : 'unchecked'}`} key={task.ID}>
                        <label htmlFor={`task-${task.ID}`}>
                            <img
                                src={task.IS_COMPLETED ? checked : unchecked}
                                alt={task.IS_COMPLETED ? 'Checked' : 'Unchecked'}
                                className="custom-checkbox-image"
                            />
                            <input
                                type="checkbox"
                                id={`task-${task.ID}`}
                                data-id={task.ID}
                                className="hidden-checkbox"
                                checked={task.IS_COMPLETED}
                                onChange={() => handleTaskCheckboxChange(task.ID, task.IS_COMPLETED)}
                            />
                        </label>
                        <span className={"task-name"}><p>{task.NAME}</p></span>
                        <img
                            src="https://cdn-icons-png.flaticon.com/128/1159/1159633.png"
                            className={'edit'}
                            data-id={task.ID}
                            onClick={() => handleEditTask(task.ID)}
                        />
                        <img
                            src="https://cdn-icons-png.flaticon.com/128/3096/3096673.png"
                            className={'delete'}
                            data-id={task.ID}
                            onClick={() => handleDeleteTask(task.ID)}
                        />
                    </li>
                ))}
            </ul>
        }
    </>
    );
}