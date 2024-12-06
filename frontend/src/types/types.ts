export interface Task {
  id: number;
  title: string;
  complete: boolean;
  createdAt: string;
  updatedAt: string | number | Date;
  order: number;
}
