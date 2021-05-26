import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { TodosService } from "./todos.service";
import { Todo } from "./interfaces/todo.interface";
import { CreateTodoDto } from "./dto/create-todo.dto";

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
  createTodo(@Body() newTodo: CreateTodoDto): void {
    this.todoService.create(newTodo);
  }
}
