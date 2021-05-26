import { Injectable } from '@nestjs/common';
import { Todo } from "./interfaces/todo.interface";
import { CreateTodoDto } from "./dto/create-todo.dto";

@Injectable()
export class TodosService {
  todos: Todo[] = [
    {
      id: 1,
      title: 'Title 1',
      description: 'Description 1',
      done: false,
    },
    {
      id: 2,
      title: 'Title 2',
      description: 'Description 2',
      done: true,
    },
    {
      id: 3,
      title: 'Title 3',
      description: 'Description 3',
      done: false,
    },
  ]

  findAll(): Todo[] {
    return this.todos;
  }

  findOne(id: string) {
    const $result = this.todos.find(todo => todo.id === Number(id))



    console.log($result)
  }

  create(todo: CreateTodoDto) {
    this.todos = [...this.todos, todo];
  }
}
