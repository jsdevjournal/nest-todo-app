import { PartialType } from '@nestjs/mapped-types';
import { CreateTodoDTO } from './create-todo.dto';

export class UpdateTodoDto extends PartialType(CreateTodoDTO) {}
