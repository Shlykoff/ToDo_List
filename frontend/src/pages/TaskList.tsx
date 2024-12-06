import React, { useEffect, useState } from "react";
import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  useTasks,
  useCreateTask,
  useDeleteTask,
  useReorderTasks,
  useUpdateTaskComplete,
} from "../hooks";
import { Task } from "../types/types";
import { TaskItem } from "../components/TaskItem";
import { TaskForm } from "../components/TaskForm";
import styled from "styled-components";

export const TaskList: React.FC = () => {
  const { data: tasks, isLoading, isError } = useTasks();
  const createTask = useCreateTask();
  const deleteTask = useDeleteTask();
  const reorderTasks = useReorderTasks();
  const updateTaskComplete = useUpdateTaskComplete();

  const [taskList, setTaskList] = useState<Task[]>(tasks || []);

  useEffect(() => {
    if (tasks) {
      setTaskList(tasks);
    }
  }, [tasks]);

  const handleCreateTask = async (title: string) => {
    try {
      const createdTask = await createTask.mutateAsync(title);
      setTaskList((prevTasks) => [...prevTasks, createdTask]);
    } catch (err) {
      console.error("Failed to create task:", err);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteTask.mutateAsync(id);
      setTaskList((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } catch (err) {
      console.error("Failed to delete task:", err);
    }
  };

  const handleCompleteChange = async (id: number, complete: boolean) => {
    try {
      await updateTaskComplete.mutateAsync({ id, complete });
      setTaskList((prevTasks) =>
        prevTasks.map((task) => (task.id === id ? { ...task, complete } : task))
      );
    } catch (err) {
      console.error("Failed to update task status:", err);
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = taskList.findIndex(
        (task) => task.id.toString() === active.id
      );
      const newIndex = taskList.findIndex(
        (task) => task.id.toString() === over.id
      );

      if (oldIndex !== -1 && newIndex !== -1) {
        const updatedTasks = [...taskList];
        const [movedTask] = updatedTasks.splice(oldIndex, 1);
        updatedTasks.splice(newIndex, 0, movedTask);

        updatedTasks.forEach((task, index) => {
          task.order = index;
        });

        setTaskList(updatedTasks);

        try {
          await reorderTasks.mutateAsync(updatedTasks);
        } catch (err) {
          console.error("Failed to reorder tasks:", err);
        }
      }
    }
  };

  return (
    <TaskListContainer>
      <TaskForm onCreate={handleCreateTask} />

      {isLoading ? (
        <LoadingMessage>Loading...</LoadingMessage>
      ) : isError ? (
        <ErrorMessage>Error loading tasks</ErrorMessage>
      ) : taskList.length === 0 ? (
        <ErrorMessage>No tasks to display</ErrorMessage>
      ) : (
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={taskList.map((task) => task.id.toString())}
            strategy={verticalListSortingStrategy}
          >
            <TaskListUl>
              {taskList.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onDelete={handleDelete}
                  onCompleteChange={handleCompleteChange}
                />
              ))}
            </TaskListUl>
          </SortableContext>
        </DndContext>
      )}
    </TaskListContainer>
  );
};

const TaskListContainer = styled.div`
  padding: 16px;
  background: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const TaskListUl = styled.ul`
  list-style: none;
  padding: 0;
`;

const LoadingMessage = styled.p`
  color: #007bff;
  text-align: center;
`;

const ErrorMessage = styled.p`
  color: red;
  text-align: center;
`;
