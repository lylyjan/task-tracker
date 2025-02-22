import { TaskForm } from '../components/domains/task/TaskForm';
import { useState } from 'react';
import { initialTaskItems } from '../components/domains/task/task.constant';

function AddTaskPage() {
  const [taskItems, setTaskItems] = useState(initialTaskItems);
  const handleAddTask = (newTask) => {
    setTaskItems((prev) => [...prev, { ...newTask, id: prev.length + 1 }]);
  };
  return <TaskForm onSubmit={handleAddTask} />;
}

export default AddTaskPage;
