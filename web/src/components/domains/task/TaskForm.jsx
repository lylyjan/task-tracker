import React, { useState } from 'react';
import PropTypes from 'prop-types';

export function TaskForm({ onSubmit }) {
  const [name, setName] = useState('');
  const [priority, setPriority] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [designers, setDesigners] = useState('');
  const [projectName, setProjectName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && priority && releaseDate && designers && projectName) {
      onSubmit({
        name,
        priority,
        releaseDate,
        designers: designers.split(',').map((d) => d.trim()),
        projectName,
      });
      setName('');
      setPriority('');
      setReleaseDate('');
      setDesigners('');
      setProjectName('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Task Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter task name"
          required
        />
      </div>
      <div>
        <label htmlFor="priority">Priority:</label>
        <input
          type="text"
          id="priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          placeholder="Enter priority"
          required
        />
      </div>
      <div>
        <label htmlFor="releaseDate">Release Date:</label>
        <input
          type="text"
          id="releaseDate"
          value={releaseDate}
          onChange={(e) => setReleaseDate(e.target.value)}
          placeholder="Enter release date"
          required
        />
      </div>
      <div>
        <label htmlFor="designers">Designers:</label>
        <input
          type="text"
          id="designers"
          value={designers}
          onChange={(e) => setDesigners(e.target.value)}
          placeholder="Enter designers (comma separated)"
          required
        />
      </div>
      <div>
        <label htmlFor="projectName">Project Name:</label>
        <input
          type="text"
          id="projectName"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          placeholder="Enter project name"
          required
        />
      </div>
      <button type="submit">Add Task</button>
    </form>
  );
}

TaskForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
