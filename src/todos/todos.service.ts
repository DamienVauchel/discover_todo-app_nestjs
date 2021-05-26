import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { Todo } from "./interfaces/todo.interface";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { TodoCreation } from "./interfaces/todoCreation.interface";
import { TodoEdition } from "./interfaces/todoEdition.interface";
import { TodoDeletion } from "./interfaces/todoDeletion.interface";

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

  findOne(id: string): Todo {
    const $result = this.todos.find(todo => todo.id === +id)

    if (undefined === $result) {
      throw new NotFoundException('No todo for this id');
    }

    return $result;
  }

  create(todo: CreateTodoDto): TodoCreation {
    this.todos = [...this.todos, todo];

    return { createdTodo: 1, todo }
  }

  edit(id: string, todo: Todo): TodoEdition {
    this.findOne(id);

    if (todo.id !== +id) {
      throw new ConflictException('You can\'t update an id');
    }

    this.todos = this.todos.map(t => t.id !== +id ? t : todo);

    return { updatedTodo: 1, todo: todo }
  }

  toggleDone(id: string, todo: Todo): TodoEdition {
    const todoToUpdate = this.findOne(id);

    if (undefined !== todo.done) {
      todoToUpdate.done = todo.done;
    }

    this.todos = this.todos.map(t => t.id !== +id ? t : todoToUpdate);

    return { updatedTodo: 1, todo: todoToUpdate }
  }

  delete(id: string): TodoDeletion {
    const todosBeforeDeleteNumber = this.todos.length;
    this.todos = this.todos.filter(t => t.id !== +id);

    if (this.todos.length < todosBeforeDeleteNumber) {
      return { deletedTodos: 1, nbTodos: this.todos.length };
    }

    throw new NotFoundException('No todo to delete');
  }
}
