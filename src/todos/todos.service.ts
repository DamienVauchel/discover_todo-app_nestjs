import { BadRequestException, ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { Todo } from "./interfaces/todo.interface";
import { TodoCreation } from "./interfaces/todoCreation.interface";
import { TodoEdition } from "./interfaces/todoEdition.interface";
import { TodoDeletion } from "./interfaces/todoDeletion.interface";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class TodosService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Todo[]> {
    return await this.prisma.todo.findMany();
  }

  async findOne(id: string): Promise<Todo> {
    const result = await this.prisma.todo.findUnique({
      where: { id:  id }
    });

    if (null === result) {
      throw new NotFoundException(`No todo for id ${id}`);
    }

    return result;
  }

  async create(todo: Prisma.TodoCreateInput): Promise<TodoCreation> {
    const response = await this.prisma.todo.create({ data: todo });

    return { createdTodo: 1, todo: response }
  }

  async edit(id: string, todo: Prisma.TodoUpdateInput): Promise<TodoEdition> {
    await this.findOne(id);

    if (undefined !== todo.id && todo.id !== id) {
      throw new ConflictException('You can\'t update an id');
    }

    await this.prisma.todo.update({
      where: { id: id },
      data: todo
    });

    return { updatedTodo: 1, todo: await this.findOne(id) }
  }

  async toggleDone(id: string, todo: Prisma.TodoUpdateInput): Promise<TodoEdition> {
    const todoToUpdate = await this.findOne(id);

    if (undefined === todo.done) {
      throw new BadRequestException();
    }

    todoToUpdate.done = !!todo.done;
    await this.prisma.todo.update({
      where: { id: id },
      data: todoToUpdate
    });

    return { updatedTodo: 1, todo: await this.findOne(id) }
  }

  async delete(id: string): Promise<TodoDeletion> {
    await this.findOne(id);
    await this.prisma.todo.delete({ where: { id } });

    return { deletedTodos: 1, nbTodos: +await this.prisma.todo.count() }
  }
}
