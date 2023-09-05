import {
  Controller,
  Get,
  Res,
  HttpStatus,
  Param,
  NotFoundException,
  Body,
  Put,
  Query,
  Delete,
  Post,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDTO } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Controller('api/todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  async create(
    @Body() createTodoDTO: CreateTodoDTO,
    @Res() res,
  ) {
    const todo = await this.todoService.create(createTodoDTO);
    return res.status(HttpStatus.CREATED).json({
      message: 'Success',
      todo,
    });
  }

  @Get()
  async findAll(@Res() res) {
    const todos = await this.todoService.findAll();
    return res.status(HttpStatus.OK).json({
      message: 'Success',
      todos
    });
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Res() res,
  ) {
    const todo = await this.todoService.findOne(id);
    if (!todo) {
      throw new NotFoundException('Not exist!');
    }
    return res.status(HttpStatus.OK).json({
      message: 'Success',
      todo
    });
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTodoDTO: UpdateTodoDto,
    @Res() res,
  ) {
    const todo = await this.todoService.update(id, updateTodoDTO);
    if (!todo) {
      throw new NotFoundException('Not exist!');
    }
    return res.status(HttpStatus.OK).json({
      message: 'Updated',
      todo,
    });
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @Res() res,
  ) {
    const todo = await this.todoService.remove(id);
    if (!todo) {
      throw new NotFoundException('Todo does not exist!');
    }
    return res.status(HttpStatus.NO_CONTENT).json({
      message: 'Deleted'
    });
  }
}
