import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const API_URL = process.env.API_URL || "http://localhost:3001/tasks";

export const useReorderTasks = () => {
  return useMutation(
    async (tasks: { id: number; order: number }[]) => {
      await axios.put(`${API_URL}/reorder`, { tasks });
    },
    {
      onError: (error: Error) => {
        console.error("Error reordering tasks:", error);
      },
    }
  );
};
