import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const API_URL = process.env.API_URL || "http://localhost:3001/tasks";

export const useCreateTask = () => {
  return useMutation(
    async (title: string) => {
      const response = await axios.post(API_URL, { title, order: 0 });
      return response.data;
    },
    {
      onError: (error: Error) => {
        console.error("Error creating task:", error);
      },
    }
  );
};
