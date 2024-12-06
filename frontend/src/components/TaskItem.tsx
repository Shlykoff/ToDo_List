import React from "react";
import { Task } from "../types/types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

interface TaskItemProps {
  key: any;
  task: Task;
  onDelete: (id: number) => Promise<void>;
  onCompleteChange: (id: number, complete: boolean) => Promise<void>;
}

export const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onDelete,
  onCompleteChange,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id.toString() });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const complete = e.target.checked;
    onCompleteChange(task.id, complete);
  };

  return (
    <ListItem
      style={style}
      ref={setNodeRef}
      $isDragging={isDragging}
      {...attributes}
    >
      <DragHandle {...listeners}>
        <FontAwesomeIcon icon={faEllipsisVertical} />
      </DragHandle>

      <Checkbox
        type="checkbox"
        checked={task.complete}
        onChange={handleCheckboxChange}
        aria-label={`Mark task ${task.title} as completed`}
      />

      <TaskTitle $complete={task.complete}>{task.title}</TaskTitle>

      <DeleteButton
        onClick={() => onDelete(task.id)}
        aria-label={`Delete task ${task.title}`}
      >
        Delete
      </DeleteButton>
    </ListItem>
  );
};

const ListItem = styled.li<{ $isDragging: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
  margin: 4px 0;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: ${({ $isDragging }) => ($isDragging ? "#f0f8ff" : "white")};
  box-shadow: ${({ $isDragging }) =>
    $isDragging ? "0 2px 8px rgba(0, 0, 0, 0.2)" : "none"};
  transition: background 0.2s;
`;

const DragHandle = styled.span`
  cursor: grab;
  margin-right: 8px;
  padding: 4px;
`;

const Checkbox = styled.input`
  margin-right: 8px;
`;

const TaskTitle = styled.span<{ $complete: boolean }>`
  flex: 1;
  text-align: center;
  text-decoration: ${({ $complete }) => ($complete ? "line-through" : "none")};
`;

const DeleteButton = styled.button`
  background: red;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 4px 8px;
  cursor: pointer;

  &:hover {
    background: #cc0000;
  }

  &:active {
    background: #990000;
  }
`;
