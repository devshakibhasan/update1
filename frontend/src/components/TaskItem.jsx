import { useState } from 'react';
import { Check, Trash2, Edit2, X, Save } from 'lucide-react';

function TaskItem({ task, onDelete, onToggleComplete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);

  const isCompleted = task.status === 'completed';

  const handleSave = () => {
    if (editTitle.trim() !== '' && editTitle !== task.title) {
      onEdit(task._id, editTitle);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSave();
    if (e.key === 'Escape') {
      setEditTitle(task.title);
      setIsEditing(false);
    }
  };

  if (isEditing) {
    return (
      <li className="p-4 flex items-center justify-between gap-4 bg-blue-50/50">
        <input
          type="text"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
          className="flex-1 px-3 py-2 border-2 border-blue-200 rounded-lg focus:outline-none focus:border-blue-500"
        />
        <div className="flex gap-2 flex-shrink-0">
          <button
            onClick={handleSave}
            className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
            title="Save"
          >
            <Save className="h-5 w-5" />
          </button>
          <button
            onClick={() => {
              setEditTitle(task.title);
              setIsEditing(false);
            }}
            className="p-2 text-gray-500 hover:bg-gray-200 rounded-lg transition-colors"
            title="Cancel"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </li>
    );
  }

  return (
    <li className={`p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group transition-colors hover:bg-gray-50 ${isCompleted ? 'bg-gray-50/50' : ''}`}>
      <div className="flex items-center flex-1 min-w-0 w-full">
        <button
          onClick={() => onToggleComplete(task._id, task.status)}
          className={`flex-shrink-0 h-6 w-6 rounded-full border-2 flex items-center justify-center mr-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors ${
            isCompleted 
              ? 'bg-blue-500 border-blue-500 text-white' 
              : 'border-gray-300 text-transparent hover:border-blue-400'
          }`}
          title={isCompleted ? "Mark Incomplete" : "Mark Complete"}
        >
          {isCompleted ? <Check className="h-4 w-4" strokeWidth={3} /> : <div className="h-4 w-4" />}
        </button>
        <p 
          className={`text-base truncate transition-all duration-200 ${
            isCompleted ? 'text-gray-400 line-through' : 'text-gray-800 font-medium'
          }`}
          title={task.title}
        >
          {task.title}
        </p>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0 w-full sm:w-auto justify-end sm:opacity-0 sm:group-hover:opacity-100 transition-opacity focus-within:opacity-100">
        <button
          onClick={() => onToggleComplete(task._id, task.status)}
          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
            isCompleted 
              ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              : 'bg-green-100 text-green-700 hover:bg-green-200'
          }`}
        >
          {isCompleted ? 'Mark Incomplete' : 'Mark Complete'}
        </button>
        <button
          onClick={() => setIsEditing(true)}
          className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          title="Edit Task"
        >
          <Edit2 className="h-4 w-4" />
        </button>
        <button
          onClick={() => onDelete(task._id)}
          className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors"
          title="Delete Task"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </li>
  );
}

export default TaskItem;
