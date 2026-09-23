import { useState, useEffect } from 'react';
import axios from 'axios';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

const API_URL = 'http://localhost:5000/tasks';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [filter, setFilter] = useState('all');

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

  const editTask = async (id, newTitle) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, { title: newTitle });
      setTasks(
        tasks.map((task) => (task._id === id ? { ...task, title: response.data.title } : task))
      );
      setError(null);
    } catch (err) {
      console.error('Error editing task:', err);
      setError('Failed to edit task.');
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

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.status === 'completed';
    if (filter === 'pending') return task.status === 'pending';
    return true; // 'all'
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white shadow-xl sm:rounded-2xl overflow-hidden border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200">
            
            {/* Left Side: Creation */}
            <div className="p-6 sm:p-10 md:col-span-1 bg-gray-50/50">
              <h1 className="text-3xl font-extrabold text-gray-900 mb-2 tracking-tight">TaskFlow</h1>
              <p className="text-gray-500 mb-8 text-sm">Manage your daily tasks efficiently.</p>
              
              <div className="sticky top-10">
                <TaskForm onAdd={addTask} />
                
                {error && (
                  <div className="mt-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                    {error}
                  </div>
                )}
              </div>
            </div>

            {/* Right Side: List & Filters */}
            <div className="p-6 sm:p-10 md:col-span-2">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <h2 className="text-xl font-bold text-gray-800">Your Tasks</h2>
                
                {/* Filter Options */}
                <div className="flex bg-gray-100 p-1 rounded-lg">
                  <button
                    onClick={() => setFilter('all')}
                    className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${filter === 'all' ? 'bg-white shadow text-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setFilter('pending')}
                    className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${filter === 'pending' ? 'bg-white shadow text-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
                  >
                    Pending
                  </button>
                  <button
                    onClick={() => setFilter('completed')}
                    className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${filter === 'completed' ? 'bg-white shadow text-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
                  >
                    Completed
                  </button>
                </div>
              </div>

              <div className="mt-4">
                {loading ? (
                  <div className="flex justify-center items-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  </div>
                ) : (
                  <TaskList 
                    tasks={filteredTasks} 
                    onDelete={deleteTask} 
                    onToggleComplete={toggleComplete} 
                    onEdit={editTask}
                  />
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
