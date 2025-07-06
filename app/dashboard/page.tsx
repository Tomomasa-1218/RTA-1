"use client";
import { useEffect, useState } from "react";
import { useTaskStore } from "@/lib/store/useTaskStore";
import TaskCard from "@/components/TaskCard";
import TaskForm from "@/components/TaskForm";
import FilterBar from "@/components/FilterBar";

export default function DashboardPage() {
  const { tasks, fetchTasks, loading } = useTaskStore();
  const [editing, setEditing] = useState<string | null>(null);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <div className="max-w-2xl mx-auto p-4 flex flex-col gap-4">
      <TaskForm
        defaultValues={tasks.find((t) => t.id === editing)}
        onSubmitEnd={() => setEditing(null)}
      />
      <FilterBar />
      {loading && <p>Loading...</p>}
      <div className="flex flex-col gap-2">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} onEdit={(t) => setEditing(t.id)} />
        ))}
      </div>
    </div>
  );
} 