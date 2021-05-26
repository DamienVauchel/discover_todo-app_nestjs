import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from "@nestjs/common";
import { TodosService } from "./todos.service";
import { Todo } from "./interfaces/todo.interface";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { TodoEdition } from "./interfaces/todoEdition.interface";
import { TodoCreation } from "./interfaces/todoCreation.interface";
import { TodoDeletion } from "./interfaces/todoDeletion.interface";

@Controller('todos')
export class TodosController {
  constructor(private readonly todoService: TodosService) {}

  @Get()
  getAll(): Todo[] {
    return this.todoService.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.todoService.findOne(id);
  }

  @Post()
  createTodo(@Body() newTodo: CreateTodoDto): TodoCreation {
    return this.todoService.create(newTodo);
  }

  @Put(':id')
  editTodo(@Param('id') id: string, @Body() todo: CreateTodoDto): TodoEdition {
    return this.todoService.edit(id, todo);
  }

  @Patch(':id')
  toggleDone(@Param('id') id: string, @Body() todo: CreateTodoDto): TodoEdition {
    return this.todoService.toggleDone(id, todo);
  }

  @Delete(':id')
  removeTodo(@Param('id') id: string): TodoDeletion {
    return this.todoService.delete(id);
  }
}
