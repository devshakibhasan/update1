import { Check, Trash2 } from 'lucide-react';

function TaskItem({ task, onDelete, onToggleComplete }) {
  const isCompleted = task.status === 'completed';

  return (
    <li className={`p-4 flex items-center justify-between gap-4 group transition-colors hover:bg-gray-50 ${isCompleted ? 'bg-gray-50/50' : ''}`}>
      <div className="flex items-center flex-1 min-w-0">
        <button
          onClick={() => onToggleComplete(task._id, task.status)}
          className={`flex-shrink-0 h-6 w-6 rounded-full border-2 flex items-center justify-center mr-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors ${
            isCompleted 
              ? 'bg-blue-500 border-blue-500 text-white' 
              : 'border-gray-300 text-transparent hover:border-blue-400'
          }`}
        >
          {isCompleted ? <Check className="h-4 w-4" strokeWidth={3} /> : <div className="h-4 w-4" />}
        </button>
        <p 
          className={`text-base truncate transition-all duration-200 ${
            isCompleted ? 'text-gray-400 line-through' : 'text-gray-800 font-medium'
          }`}
        >
          {task.title}
        </p>
      </div>
      <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity focus-within:opacity-100">
        <button
          onClick={() => onDelete(task._id)}
          className="inline-flex items-center p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
          title="Delete Task"
        >
          <Trash2 className="h-5 w-5" />
        </button>
      </div>
    </li>
  );
}

export default TaskItem;
