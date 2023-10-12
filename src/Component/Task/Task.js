import React from 'react';
import './Task.css';

const Task = ({ id, title, description, priority, removeTaskToList, setTaskEditable }) => {
    return (
        <div className='task-container'>
            
                    <h1 className='task-title'>{title}</h1>
                    <p className='task-description'>{description}</p>
                    <span className={`task-priority ${priority}`}>{priority}</span>
                    <span className={`task-edit-icon ${priority}`}
                        onClick={() => {
                            setTaskEditable(id);
                        }}>
                        📝 Edit
                    </span>
                    <span className={`task-delete-icon ${priority}`}
                        onClick={() => {
                            removeTaskToList(id);
                        }}>
                        🚮 Delete
                    </span>
        </div>
    );
}

export default Task;
