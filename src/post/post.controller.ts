import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
  NotFoundException
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('api/posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  async create(
    @Body() createPostDto: CreatePostDto,
    @Res() res,
  ) {
    const post = await this.postService.create(createPostDto);
    return res.status(HttpStatus.CREATED).json({
      message: 'Success',
      post,
    });
  }

  @Get()
  async findAll(@Res() res) {
    const posts = await this.postService.findAll();
    return res.status(HttpStatus.OK).json({
      message: 'Success',
      posts
    });
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Res() res,
  ) {
    const post = await this.postService.findOne(id);
    if (!post) {
      throw new NotFoundException('Not exist!');
    }
    return res.status(HttpStatus.OK).json({
      message: 'Success',
      post
    });
  }

  @Patch(':id')
  async update (
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
    @Res() res,
  ) {
    const post = await this.postService.update(id, updatePostDto);
    if (!post) {
      throw new NotFoundException('Not exist!');
    }
    return res.status(HttpStatus.OK).json({
      message: 'Success',
      post
    });
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @Res() res,
  ) {
    await this.postService.remove(id);
    return res.status(HttpStatus.OK).json({
      message: 'Deleted'
    });
  }
}
