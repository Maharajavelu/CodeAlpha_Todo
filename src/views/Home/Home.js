import React, { useEffect, useState } from 'react'
import './Home.css'
import Task from "./../../Component/Task/Task";
import showToast from 'crunchy-toast';
import { saveListToLocalStorage } from './../../util/LocalStorage'

const Home = () => {
    const [taskList, setTaskList] = useState([
        {
            id: 1,
            title: "Submit Assignment",
            description: "Only in two days",
            priority: "very high",
        },

    ]);

    const [id, setId] = useState(0);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('');
    const [isEdit, setIsEdit] = useState(false)

    useEffect(() => {
        const list = JSON.parse(localStorage.getItem("wishlist"));

        if (list && list.length >= 0) {
            setTaskList(list);
        }
    }, []);

    const findTaskIndexById = (taskId) => {
        let index;

        taskList.forEach((task, i) => {
            if (task.id === taskId) {
                index = i;
            }
        });
        return index;
    }

    const clearInputFields = () => {
        setTitle('');
        setDescription('');
        setPriority('');
    }

    const checkRequiredFields = () => {
        if (!title) {
            showToast('Title is required', 'alert', 3000);
            return false;
        }

        if (!description) {
            showToast('Description is required', 'alert', 3000);
            return false;
        }

        if (!priority) {
            showToast('Priority is required', 'alert', 3000);
            return false;
        }
        return true;
    }


    const addTaskToList = () => {

        if (checkRequiredFields() === false) {
            return;
        };

        const randomId = Math.floor(Math.random() * 1000)

        const obj = {
            id: randomId,
            title: title,
            description: description,
            priority: priority
        }

        const newTaskList = [...taskList, obj];

        setTaskList(newTaskList);

        setTaskList([...taskList, obj]);

        clearInputFields();

        saveListToLocalStorage(newTaskList);

        showToast('Task added successfully!', 'success', 3000);
    };



    const removeTaskToList = (id) => {
        const index = findTaskIndexById(id);

        const tempArray = taskList;
        tempArray.splice(index, 1);

        setTaskList([...tempArray]);

        saveListToLocalStorage(tempArray)

        showToast('Task deleted successfully', 'alert', 3000);

    };


    const setTaskEditable = (id) => {
        setIsEdit(true);
        setId(id);

        const index = findTaskIndexById(id);

        const currentEditTask = taskList[index];

        setTitle(currentEditTask.title);
        setDescription(currentEditTask.description);
        setPriority(currentEditTask.priority);
    }

    const updateTask = (task) => {

        if (checkRequiredFields() === false) {
            return;
        }

        const indexToUpdate = findTaskIndexById(id);

        const tempArray = taskList;
        tempArray[indexToUpdate] = {
            id: id,
            title: title,
            description: description,
            priority: priority,
        };

        setTaskList([...tempArray]);

        saveListToLocalStorage(tempArray);

        clearInputFields();
        setIsEdit(false);

        showToast("Task Updated successfully ", "update", 3000);
    };


    return (
        <div className='container'>
            <h1 className='app-title'>Task Master📋</h1>
                
            <div className='todo-flex-container'>
            <div>
                    <h2 className='text-center'>
                        {isEdit ? `Update Task ${id}` : "Add Task"}
                    </h2>
                    <div className='add-task-form-container'>
                        <form>

                            <input type="text"
                                value={title}
                                onChange={(e) => {
                                    setTitle(e.target.value)
                                }}
                                placeholder='Specify Task Title'
                                className='task-input'
                            />

                            <input type="text"
                                value={description}
                                onChange={(e) => {
                                    setDescription(e.target.value)
                                }}
                                placeholder='Provide Task Description'
                                className='task-input'
                            />

                            <select
                                value={priority}
                                onChange={(e) => {
                                    setPriority(e.target.value);
                                }}
                                className='task-input1'
                            >
                                <option value="">Choose Priority</option>
                                <option value="High" className='high'>High</option>
                                <option value="Moderate" className='moderate'>Moderate</option>
                                <option value="Low" className='low'>Low</option>
                            </select>



                            <div className="btn-container">
                                <button
                                    type="button"
                                    className="btn-add-task"
                                    onClick={() => {
                                        isEdit ? updateTask() : addTaskToList();
                                    }}
                                >
                                    {isEdit ? "Update" : "Add"}
                                </button>
                            </div>


                        </form>
                    </div>
                </div>
                <div>
                    <h2 className='text-center'>Display Task</h2>
                    
                    {taskList.length === 0 ? (
                        <p className="no-task-text">"Currently, there are no tasks on the list."</p>
                    ) : (
                        taskList.map((taskItem, index) => {
                            const { id, title, description, priority } = taskItem;

                            return (
                                <Task
                                    id={id}
                                    title={title}
                                    description={description}
                                    priority={priority}
                                    key={index}
                                    removeTaskToList={removeTaskToList}
                                    setTaskEditable={setTaskEditable}
                                />
                            );
                        }))}
                </div>


                
            </div>
        </div>
    )
}

export default Home