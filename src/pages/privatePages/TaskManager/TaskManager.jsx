import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import './TaskManager.css'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import useAuth from '../../../hooks/useAuth';
import toast from "react-hot-toast";
import { Trash } from 'lucide-react';

const TaskManager = () => {
    const { user } = useAuth();
    const [tasks, setTasks] = useState({
        Todo: [],
        OnProcess: [],
        Complete: [],
    });
    const axiosPublic = useAxiosPublic();
    const { register, formState: { errors }, handleSubmit, reset } = useForm();

    const fetchTasks = async () => {
        try {
            const email = user?.email;
            const response = await axiosPublic.get(`/api/v1/user/tasks?email=${email}`, { withCredentials: true });
            const tasksFromApi = response.data;
            const updatedTasks = {
                Todo: tasksFromApi.filter(task => task.status === 'Todo'),
                OnProcess: tasksFromApi.filter(task => task.status === 'OnProcess'),
                Complete: tasksFromApi.filter(task => task.status === 'Complete'),
            };
            setTasks(updatedTasks);
        } catch (error) {
            // console.log('Error tasks:', error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const onSubmit = async data => {
        try {
            const newTask = { ...data, email: user?.email, status: 'Todo' };

            if (!newTask.title) {
                // console.log('no task Task');
                return;
            }

            await axiosPublic.post('/api/v1/user/create-task', newTask, { withCredentials: true });
            reset();
            toast.success("Task added successfully")
            fetchTasks();
        } catch (error) {
            // console.log('Error', error);
        }
    };

    const onTaskDelete = async taskId => {
        try {
            await axiosPublic.delete(`/api/v1/user/delete-task/${taskId}`, { withCredentials: true });
            fetchTasks();
            toast.success("Task deleted successfully")
        } catch (error) {
            // console.log('Error', error);
        }
    };

    const onDragEnd = async result => {
        if (!result.destination) return;

        const sourceList = tasks[result.source.droppableId];
        const destinationList = tasks[result.destination.droppableId];

        const [movedTask] = sourceList.splice(result.source.index, 1);
        const updatedTask = { ...movedTask, status: result.destination.droppableId };
        const { _id, ...taskToUpdate } = updatedTask;
        destinationList.splice(result.destination.index, 0, movedTask);

        try {
            await axiosPublic.put(`/api/v1/user/update-task/${_id}`, taskToUpdate, { withCredentials: true });
            fetchTasks();
        } catch (error) {
            // console.log('Error', error);
        }
    };



    return (
        <div>
            <div className='w-full lg:w-3/4 mx-auto'>
                <form onSubmit={handleSubmit(onSubmit)} className=''>
                    <div className='flex flex-col lg:flex-row justify-center gap-2 lg:gap-6'>
                        <div>
                            <input placeholder='Title' className='border border-gray-400 text-black px-2 py-1 rounded-md' {...register('title', { required: true })} />
                            <p className='text-[10px] text-red' >{errors.title && <span className="text-xs text-red-500 ">title is required</span>}</p>
                        </div>
                        <div>
                            <textarea cols={30} placeholder='Description' className='border border-gray-400 text-black px-2 py-1 rounded-md' {...register('description', { required: true })} />
                            <p className='text-[10px] text-red' >{errors.description && <span className="text-xs text-red-500 ">Description is required</span>}</p>
                        </div>
                    </div>

                    <div className='flex justify-center items-center gap-6 mt-4'>
                        <div className="mb-1 px-4">
                            <label htmlFor="priority" className='mr-2'>Priority</label>
                            <select
                                id="priority"
                                name="priority"
                                {...register('priority', { required: false })}
                                className="w-24 p-2 border rounded-md"
                            >
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>

                        </div>
                        <div className="mb-1">
                            <label htmlFor="deadline">Deadline</label>
                            <input
                                type="date"
                                id="deadline"
                                name="deadline"
                                {...register('deadline', { required: true })}
                                className="w-full p-2 border rounded-md"
                            />
                            <p className='text-[10px] text-red' >{errors.deadline && <span className="text-xs text-red-500 ">Deadline is required</span>}</p>
                        </div>
                    </div>
                    <button className='mx-auto w-full bg-gray-300 hover:bg-gray-200 text-black font-bold py-2 px-4 rounded mt-4' type="submit">
                        Add Task
                    </button>
                </form>

            </div>

            <DragDropContext onDragEnd={onDragEnd}>
                <div className='flex flex-col lg:flex-row  gap-4 p-4'>
                    <div className='p-2 border-4 bg-gray-300  flex-1'>
                        <Droppable droppableId="Todo">
                            {(provided) => (
                                <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    style={{ minHeight: '300px' }}
                                >
                                    <h2 className='text-xl uppercase bg-slate-400 font-bold text-black text-center'>Todo</h2>
                                    {tasks.Todo.map((task, index) => (
                                        <Draggable key={task._id} draggableId={task._id} index={index}>
                                            {(provided, snapshot) => (
                                                <div
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    ref={provided.innerRef}

                                                    className={` mb-2 p-2 max-w-xs ${snapshot.isDragging && 'animate-fade-in'
                                                        }`}
                                                >
                                                    <div className='text-black bg-gray-200 p-2 hover:scale-105 duration-300 rounded shadow-lg'>
                                                        <div className='flex justify-between gap-4 '>
                                                            <div>
                                                                <p className='text border-b-2 border-b-black font-bold bg-gray-200'>{task.title}</p>
                                                                <small> <b>Desc:</b> {task.description.length > 40 && task.description.slice(0, 40)}...</small>
                                                            </div>
                                                            <button onClick={() => onTaskDelete(task._id)}> <Trash color='red' /> </button>
                                                        </div>
                                                        <div className='flex justify-between '>
                                                            <small><b>Priority:</b> <span className='capitalize'>{task.priority}</span></small>
                                                            <small><b>DL:</b> {task.deadline}</small>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </div>

                    <div className='p-2 border-4 bg-gray-300  flex-1'>
                        <Droppable droppableId="OnProcess">
                            {(provided) => (
                                <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    style={{ minHeight: '300px' }}
                                >
                                    <h2 className='text-xl uppercase bg-slate-400 font-bold text-black text-center'>OnProcess</h2>
                                    {tasks.OnProcess.map((task, index) => (
                                        <Draggable key={task._id} draggableId={task._id} index={index}>
                                            {(provided, snapshot) => (
                                                <div
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    ref={provided.innerRef}

                                                    className={` mb-2 p-2 max-w-xs ${snapshot.isDragging && 'animate-fade-in'
                                                        }`}
                                                >
                                                    <div className='text-black bg-gray-200 p-2 hover:scale-105 duration-300 rounded shadow-lg'>
                                                        <div className='flex justify-between gap-4 '>
                                                            <div>
                                                                <p className=' text border-b-2 border-b-black font-bold bg-gray-200'>{task.title}</p>
                                                                <small> <b>Desc:</b> {task.description.length > 40 && task.description.slice(0, 40)}...</small>
                                                            </div>
                                                            <button onClick={() => onTaskDelete(task._id)}> <Trash color='red' /> </button>
                                                        </div>
                                                        <div className='flex justify-between '>
                                                            <small><b>Priority:</b> <span className='capitalize'>{task.priority}</span></small>
                                                            <small><b>DL:</b> {task.deadline}</small>
                                                        </div>
                                                    </div>
                                                    {/* {task.task}
                                                    <button onClick={() => onTaskDelete(task._id)}>Delete</button> */}
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </div>

                    <div className='p-2 border-4 bg-gray-300  flex-1'>
                        <Droppable droppableId="Complete">
                            {(provided) => (
                                <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    style={{ minHeight: '300px' }}
                                >
                                    <h2 className='text-xl text-center uppercase font-bold bg-slate-400 text-black'>Complete</h2>
                                    {tasks.Complete.map((task, index) => (
                                        <Draggable key={task._id} draggableId={task._id} index={index}>
                                            {(provided, snapshot) => (
                                                <div
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    ref={provided.innerRef}

                                                    className={`mb-2 p-2 max-w-xs ${snapshot.isDragging && 'animate-fade-in'
                                                        }`}
                                                >
                                                    <div className='text-black bg-gray-200 p-2 hover:scale-105 duration-300 rounded shadow-lg'>
                                                        <div className='flex justify-between gap-4 '>
                                                            <div>
                                                                <p className=' text border-b-2 border-b-black font-bold bg-gray-200'>{task.title}</p>
                                                                <small> <b>Desc:</b> {task.description.length > 40 && task.description.slice(0, 40)}...</small>
                                                            </div>
                                                            <button onClick={() => onTaskDelete(task._id)}> <Trash color='red' /> </button>
                                                        </div>
                                                        <div className='flex justify-between '>
                                                            <small><b>Priority:</b> <span className='capitalize'>{task.priority}</span></small>
                                                            <small><b>DL:</b> {task.deadline}</small>
                                                        </div>
                                                    </div>

                                                    {/* {task.task}
                                                    <button onClick={() => onTaskDelete(task._id)}>Delete</button> */}
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </div>

                </div>
            </DragDropContext>
        </div>
    );
};

export default TaskManager;