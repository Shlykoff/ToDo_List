import { useMutation } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { Task } from "../types/types";

const API_URL = process.env.API_URL || "http://localhost:3001/tasks";

const updateTaskComplete = async (
  id: number,
  complete: boolean
): Promise<Task> => {
  const response: AxiosResponse<Task> = await axios.put(
    `${API_URL}/${id}/complete`,
    {
      complete,
    }
  );
  return response.data;
};

export const useUpdateTaskComplete = () => {
  return useMutation<Task, Error, { id: number; complete: boolean }>(
    ({ id, complete }) => updateTaskComplete(id, complete),
    {
      onError: (error: Error) => {
        console.error("Error updating task:", error);
      },
    }
  );
};
