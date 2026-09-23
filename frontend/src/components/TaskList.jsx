import TaskItem from './TaskItem';
import { ClipboardList } from 'lucide-react';

function TaskList({ tasks, onDelete, onToggleComplete, onEdit }) {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-12 flex flex-col items-center justify-center bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
        <ClipboardList className="h-12 w-12 text-gray-400 mb-3" />
        <h3 className="text-sm font-medium text-gray-900">No tasks</h3>
        <p className="mt-1 text-sm text-gray-500">Get started by creating a new task.</p>
      </div>
    );
  }

  return (
    <ul className="divide-y divide-gray-100 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          onDelete={onDelete}
          onToggleComplete={onToggleComplete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
}

export default TaskList;
