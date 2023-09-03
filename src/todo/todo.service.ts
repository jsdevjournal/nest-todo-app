import { Injectable } from '@nestjs/common';
import { CreateTodoDTO } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

// Creates a Todo interface to show exactly the attribute of our Todo
type Todo = {
  readonly id: number;
  readonly title: string;
  readonly description: string;
  readonly isDone: boolean;
}

@Injectable()
export class TodoService {

  private todos: Todo[] = [
    {
      id: 1,
      title: 'Test',
      description: 'This is a test Tod',
      isDone: true,
    },
  ];

  async create(createTodoDTO: CreateTodoDTO): Promise<Todo> {
    const newTodo: Todo = Object.assign({
      id: this.todos.length + 1,
    }, createTodoDTO);

    this.todos.push(newTodo);
    return newTodo;
  }

  async findAll(): Promise<Todo[]> {
    return this.todos;
  }

  async findOne(id: string): Promise<Todo> {
    const post = this.todos.find((todo) => todo.id === Number(id));
    return post;
  }

  async update(id: string, updateTodoDTO: UpdateTodoDto): Promise<Todo> {
    const todoIndex = this.todos.findIndex((todo) => todo.id === Number(id));
    const todo = this.todos[todoIndex];
    Object.assign(todo, {
      ...updateTodoDTO,
      id: todo.id
    });
    // this.todos.splice(todoIndex, 1, Object.assign({}));
    return todo;
  }

  async remove(id: string): Promise<any> {
    const todoIndex = this.todos.findIndex((todo) => todo.id === Number(id));
    return this.todos.splice(todoIndex, 1);
  }
}

