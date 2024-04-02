import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTasks, addTask, deleteTask, updateTask } from './store/tasksSlice';
import './App.css';

function App() {
  const tasks = useSelector(state => state.tasks.items);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleAddTask = () => {
    const title = prompt('Enter task title:');
    if (title) {
      dispatch(addTask({ title, completed: false }));
    }
  };

  const handleDeleteTask = (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      dispatch(deleteTask(id));
    }
  };

  const handleToggleTask = (id, completed) => {
    dispatch(updateTask({ id, changes: { completed: !completed } }));
  };

  return (
    <div className="App">
      <h1>Task Manager</h1>
      <button onClick={handleAddTask}>Add Task</button>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <input type="checkbox" checked={task.completed} onChange={() => handleToggleTask(task.id, task.completed)}/>
            <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
              {task.title}
            </span>
            <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
