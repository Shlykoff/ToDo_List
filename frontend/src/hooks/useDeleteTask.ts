import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const API_URL = process.env.API_URL || "http://localhost:3001/tasks";

export const useDeleteTask = () => {
  return useMutation(
    async (id: number) => {
      await axios.delete(`${API_URL}/${id}`);
    },
    {
      onError: (error: Error) => {
        console.error("Error deleting task:", error);
      },
    }
  );
};
