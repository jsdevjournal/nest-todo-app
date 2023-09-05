import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

// Boilerplate module
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Core Module
import { TodoModule } from './todo/todo.module';
import { ProductModule } from './product/product.module';
import { PostModule } from './post/post.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DATABASE_URL),
    TodoModule,
    ProductModule,
    PostModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
