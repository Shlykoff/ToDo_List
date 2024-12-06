import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { Task } from "@prisma/client";

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}

  async createTask(title: string, order: number): Promise<Task> {
    return this.prisma.task.create({
      data: {
        title,
        order,
        complete: false,
      },
    });
  }

  async getAllTasks(): Promise<Task[]> {
    return this.prisma.task.findMany({
      orderBy: {
        order: "asc",
      },
    });
  }

  async deleteTask(id: number): Promise<Task> {
    return this.prisma.task.delete({
      where: { id },
    });
  }

  async reorderTasks(taskOrder: { id: number; order: number }[]) {
    if (!Array.isArray(taskOrder)) {
      throw new Error("Invalid data format: 'taskOrder' must be an array.");
    }

    const updates = taskOrder.map(({ id, order }) =>
      this.prisma.task.update({
        where: { id },
        data: { order },
      })
    );

    await this.prisma.$transaction(updates);
  }

  async updateTaskComplete(id: number, complete: boolean): Promise<Task> {
    return this.prisma.task.update({
      where: { id },
      data: { complete },
    });
  }
}
