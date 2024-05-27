import React, { useState, useEffect } from 'react';
import { Button, Form, ListGroup, ButtonGroup } from 'react-bootstrap';
import './TodoList.css';

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [filter, setFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (taskInput.trim()) {
      setTasks([...tasks, { text: taskInput, completed: false }]);
      setTaskInput('');
    }
  };

  const removeTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const toggleTaskCompletion = (index) => {
    const newTasks = tasks.map((task, i) => 
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(newTasks);
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    if (filter === 'completed') return task.completed;
    if (filter === 'active') return !task.completed;
    return true;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.text.localeCompare(b.text);
    }
    return b.text.localeCompare(a.text);
  });

  return (
    <div className="todo-container container mt-5">
      <h1 className="text-center">To-Do List</h1>
      <Form className="d-flex mb-3">
        <Form.Control
          type="text"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          placeholder="Enter a new task"
        />
        <Button variant="primary" onClick={addTask}>Add Task</Button>
      </Form>
      <ButtonGroup className="mb-3">
        <Button variant="secondary" onClick={() => setFilter('all')}>All</Button>
        <Button variant="secondary" onClick={() => setFilter('active')}>Active</Button>
        <Button variant="secondary" onClick={() => setFilter('completed')}>Completed</Button>
      </ButtonGroup>
      <ButtonGroup className="mb-3">
        <Button variant="secondary" onClick={() => setSortOrder('asc')}>Sort A-Z</Button>
        <Button variant="secondary" onClick={() => setSortOrder('desc')}>Sort Z-A</Button>
      </ButtonGroup>
      <ListGroup>
        {sortedTasks.map((task, index) => (
          <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
            <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
              {task.text}
            </span>
            <div>
              <Button variant="success" onClick={() => toggleTaskCompletion(index)}>
                {task.completed ? 'Unmark' : 'Mark as Done'}
              </Button>
              <Button variant="danger" onClick={() => removeTask(index)}>Remove</Button>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default TodoList;
