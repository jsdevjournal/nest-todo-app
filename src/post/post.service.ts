import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from '../schemas/post.schema';
import { Model } from 'mongoose';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name) private readonly postModel: Model<Post>,
  ) {}

  async create(post: CreatePostDto): Promise<Post> {
    const newPost = new this.postModel(post);
    return newPost.save();
  }

  async findAll(): Promise<Post[]> {
    return await this.postModel.find().exec();
  }

  async findOne(id: string): Promise<Post> {
    return await this.postModel.findById(id).exec();
  }

  async update(id: string, post: UpdatePostDto): Promise<Post> {
    return await this.postModel.findByIdAndUpdate(id, post, { new: true });
  }

  async remove(id: string): Promise<Post> {
    return await this.postModel.findByIdAndRemove(id);
  }
}
