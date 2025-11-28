import { useState } from "react";

type Subtask = {
  id: number;
  title: string;
  completed: boolean;
};

type Task = {
  id: number;
  title: string;
  dueDate?: string;
  priority?: "Low" | "Medium" | "High";
  completed: boolean;
  subtasks?: Subtask[];
};

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<Partial<Task>>({ title: "" });
  const [newSubtask, setNewSubtask] = useState<string>("");

  const addTask = () => {
    if (!newTask.title) return;
    setTasks([
      ...tasks,
      { id: Date.now(), title: newTask.title, dueDate: newTask.dueDate, priority: newTask.priority, completed: false, subtasks: [] },
    ]);
    setNewTask({ title: "" });
  };

  const toggleTaskComplete = (id: number) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const addSubtask = (taskId: number) => {
    if (!newSubtask) return;
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        const updatedSubtasks = [...(task.subtasks || []), { id: Date.now(), title: newSubtask, completed: false }];
        return { ...task, subtasks: updatedSubtasks };
      }
      return task;
    }));
    setNewSubtask("");
  };

  const toggleSubtaskComplete = (taskId: number, subtaskId: number) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        const updatedSubtasks = task.subtasks?.map(st => st.id === subtaskId ? { ...st, completed: !st.completed } : st);
        return { ...task, subtasks: updatedSubtasks };
      }
      return task;
    }));
  };

  return (
    <div className="p-6 font-serif text-black bg-white min-h-screen">
      <h2 className="text-3xl font-bold mb-2">Task Management</h2>
      <p className="mb-4 text-sm">
        Create tasks with due dates, priority, subtasks, and track completion.
      </p>

      {/* Add new task */}
      <div className="mb-6 p-4 border rounded-lg">
        <h3 className="font-semibold mb-2">Add New Task</h3>
        <input
          type="text"
          placeholder="Task title"
          value={newTask.title || ""}
          onChange={e => setNewTask({ ...newTask, title: e.target.value })}
          className="border p-2 rounded w-full mb-2"
        />
        <input
          type="date"
          value={newTask.dueDate || ""}
          onChange={e => setNewTask({ ...newTask, dueDate: e.target.value })}
          className="border p-2 rounded w-full mb-2"
        />
        <select
          value={newTask.priority || ""}
          onChange={e => setNewTask({ ...newTask, priority: e.target.value as Task["priority"] })}
          className="border p-2 rounded w-full mb-2"
        >
          <option value="">Select priority</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <button onClick={addTask} className="px-3 py-1 border rounded bg-gray-200 hover:bg-gray-300">
          Add Task
        </button>
      </div>

      {/* Task list */}
      <div className="space-y-4">
        {tasks.map(task => (
          <div key={task.id} className="p-4 border rounded-lg shadow-sm hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <h3 className={`font-semibold ${task.completed ? "line-through text-gray-500" : ""}`}>{task.title}</h3>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTaskComplete(task.id)}
              />
            </div>
            {task.dueDate && <p className="text-sm text-gray-600">Due: {task.dueDate}</p>}
            {task.priority && <p className="text-sm text-gray-600">Priority: {task.priority}</p>}

            {/* Subtasks */}
            <div className="mt-2">
              <h4 className="font-medium text-sm">Subtasks</h4>
              {task.subtasks?.map(st => (
                <div key={st.id} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={st.completed}
                    onChange={() => toggleSubtaskComplete(task.id, st.id)}
                  />
                  <span className={`${st.completed ? "line-through text-gray-500" : ""}`}>{st.title}</span>
                </div>
              ))}
              <div className="flex mt-1 space-x-2">
                <input
                  type="text"
                  placeholder="New subtask"
                  value={newSubtask}
                  onChange={e => setNewSubtask(e.target.value)}
                  className="border p-1 rounded flex-1"
                />
                <button
                  onClick={() => addSubtask(task.id)}
                  className="px-2 py-1 border rounded bg-gray-200 hover:bg-gray-300"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
