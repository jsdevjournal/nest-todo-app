import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

// Boilerplate module
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Core Module
import { TodoModule } from './todo/todo.module';
import { ProductController } from './product/product.controller';
import { ProductService } from './product/product.service';
import { PostController } from './post/post.controller';
import { PostService } from './post/post.service';

// Schemas
import { Product, ProductSchema } from './schemas/product.schema';
import { Post, PostSchema } from './schemas/post.schema';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DATABASE_URL),
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema },
      { name: Post.name, schema: PostSchema },
    ]),
    TodoModule,
  ],
  controllers: [AppController, ProductController, PostController],
  providers: [AppService, ProductService, PostService],
})
export class AppModule {}
