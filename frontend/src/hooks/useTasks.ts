import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Task } from "../types/types";

const API_URL = process.env.API_URL || "http://localhost:3001/tasks";

export const useTasks = () => {
  return useQuery<Task[], Error>({
    queryKey: ["tasks"],
    queryFn: async () => {
      const response = await axios.get<Task[]>(API_URL);
      return response.data;
    },
  });
};
