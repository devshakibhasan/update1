import { useState, useEffect } from 'react';
import axios from 'axios';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

const API_URL = 'http://localhost:5000/tasks';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch tasks
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(API_URL);
      setTasks(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching tasks:', err);
      setError('Failed to fetch tasks. Make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (title) => {
    try {
      const response = await axios.post(API_URL, { title });
      setTasks([response.data, ...tasks]);
      setError(null);
    } catch (err) {
      console.error('Error adding task:', err);
      setError('Failed to add task.');
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTasks(tasks.filter((task) => task._id !== id));
      setError(null);
    } catch (err) {
      console.error('Error deleting task:', err);
      setError('Failed to delete task.');
    }
  };

  const toggleComplete = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === 'pending' ? 'completed' : 'pending';
      const response = await axios.put(`${API_URL}/${id}`, { status: newStatus });
      
      setTasks(
        tasks.map((task) => (task._id === id ? { ...task, status: response.data.status } : task))
      );
      setError(null);
    } catch (err) {
      console.error('Error updating task:', err);
      setError('Failed to update task.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-xl sm:rounded-2xl overflow-hidden border border-gray-200">
          <div className="px-4 py-8 sm:p-10">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-8 text-center tracking-tight">TaskFlow Manager</h1>
            
            <TaskForm onAdd={addTask} />
            
            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div className="mt-8">
              {loading ? (
                <div className="flex justify-center items-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
              ) : (
                <TaskList 
                  tasks={tasks} 
                  onDelete={deleteTask} 
                  onToggleComplete={toggleComplete} 
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
