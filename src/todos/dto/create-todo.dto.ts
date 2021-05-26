export class CreateTodoDto {
  readonly id: string;
  readonly title: string;
  readonly done: boolean;
  readonly description?: string;
}