import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Put,
} from "@nestjs/common";
import { TasksService } from "./tasks.service";

@Controller("tasks")
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async createTask(@Body() body: { title: string; order: number }) {
    const { title, order } = body;
    return this.tasksService.createTask(title, order);
  }

  @Get()
  async getAllTasks() {
    return this.tasksService.getAllTasks();
  }

  @Delete(":id")
  async deleteTask(@Param("id") id: string) {
    return this.tasksService.deleteTask(Number(id));
  }

  @Put("reorder")
  async reorderTasks(@Body("tasks") tasks: { id: number; order: number }[]) {
    return this.tasksService.reorderTasks(tasks);
  }

  @Put(":id/complete")
  async updateTaskComplete(
    @Param("id") id: string,
    @Body() body: { complete: boolean }
  ) {
    const { complete } = body;
    return this.tasksService.updateTaskComplete(Number(id), complete);
  }
}
