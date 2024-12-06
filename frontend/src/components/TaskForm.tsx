import React, { useState } from "react";
import styled from "styled-components";

interface TaskFormProps {
  onCreate: (title: string) => void;
}

export const TaskForm: React.FC<TaskFormProps> = ({ onCreate }) => {
  const [newTaskTitle, setNewTaskTitle] = useState<string>("");

  const handleCreateTask = () => {
    if (newTaskTitle.trim()) {
      onCreate(newTaskTitle);
      setNewTaskTitle("");
    }
  };

  return (
    <FormContainer>
      <Input
        type="text"
        maxLength={30}
        value={newTaskTitle}
        onChange={(e) => setNewTaskTitle(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleCreateTask()}
        placeholder="Enter new task"
      />
      <Button onClick={handleCreateTask}>Add</Button>
    </FormContainer>
  );
};

const FormContainer = styled.div`
  margin-bottom: 16px;
  display: flex;
`;

const Input = styled.input`
  width: calc(100% - 40px);
  padding: 8px;
  margin-right: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const Button = styled.button`
  padding: 8px 12px;
  background: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: #0056b3;
  }

  &:active {
    background: #004080;
  }
`;
