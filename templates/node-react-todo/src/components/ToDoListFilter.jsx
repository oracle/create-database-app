import React from 'react';
import { toast } from 'react-toastify';
import completed from '../images/completed.png'
import uncompleted from '../images/uncompleted.png'
import all from '../images/all.png'

export const TodoListFilter = (props) => {
    const handleFilterChange = (filterType) => {
        props.setFilter(filterType);
    };

    return (
        <>
            <div className={'filter-card'}>
                <div className={"header"}>
                    <h2>Filters</h2>
                </div>
                <ul className={'filters'}>
                    <div className={`filter-option ${props.filter === 'all' ? 'filter_active' : ''}`}>
                        <img src={all} className={"filter-icon"} alt="" />
                        <li onClick={() => handleFilterChange('all')}>
                            All
                        </li>
                    </div>
                    <div className={`filter-option ${props.filter === 'uncompleted' ? 'filter_active' : ''}`}>
                        <img src={uncompleted} className={"filter-icon"} alt="" />
                        <li onClick={() => handleFilterChange('uncompleted')}>
                        Incomplete
                        </li>
                    </div>
                    <div className={`filter-option ${props.filter === 'completed' ? 'filter_active' : ''}`}>
                        <img src={completed} className={"filter-icon"} alt="" />
                        <li onClick={() => handleFilterChange('completed')}>
                            Complete
                        </li>
                    </div>
                </ul>
            </div>
        </>
    );
}