/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
import React from 'react';
import { toast } from 'react-toastify';

import { updateTask, deleteTask } from '../api/rest-service';
import { convertBooleansToChars } from '../utils/utils';

export const TodoListFooter = (props) => {

    // Mark all tasks as completed
    const handleCompleteAll = async () => {
        const updatedTask = {
            is_completed: true
        };
        try {
            props.tasks.forEach(async (task) => {
                if (!task.IS_COMPLETED) {
                    await updateTask(task.ID, convertBooleansToChars(updatedTask));
                    props.setRefresh((state) => state + 1);
                }
            })
        } catch (error) {
            console.log('Error changing task status:', error);
            toast.error('Error changing task status');
        }
    };

    // Clear completed tasks
    const handleClearCompleted = () => {
        try {
            props.tasks.forEach(async (task) => {
                if (task.IS_COMPLETED) {
                    await deleteTask(task.ID);
                    props.setRefresh((state) => state + 1);
                }
            })
            toast.success('Completed tasks deleted successfully');
        } catch (error) {
            console.log('Error deleting tasks:', error);
            toast.error('Error deleting tasks');
        }
    };

    return (
        <>
            <div className={'mid'}>
                <button className={'complete-all'} onClick={handleCompleteAll}>Mark all as complete</button>
                <button className={'clear-all'} onClick={handleClearCompleted}>Delete complete tasks</button>
            </div>
        </>
    );
}