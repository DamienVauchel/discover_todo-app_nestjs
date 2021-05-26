import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
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
    const $result = this.todos.find(todo => todo.id === +id)

    if (undefined === $result) {
      throw new NotFoundException('No todo for this id');
    }

    return $result;
  }

  create(todo: CreateTodoDto) {
    this.todos = [...this.todos, todo];
  }

  edit(id: string, todo: Todo) {
    this.findOne(id);

    if (todo.id !== +id) {
      throw new ConflictException('You can\'t update an id');
    }

    const updatedTodos = this.todos.map(t => t.id !== +id ? t : todo);
    this.todos = [...updatedTodos];

    return { updatedTodo: 1, todo: todo }
  }

  toggleDone(id: string, todo: Todo) {
    const todoToUpdate = this.findOne(id);

    if (undefined !== todo.done) {
      todoToUpdate.done = todo.done;
    }

    const updatedTodos = this.todos.map(t => t.id !== +id ? t : todoToUpdate);
    this.todos = [...updatedTodos];

    return { updatedTodo: 1, todo: todoToUpdate }
  }
}
