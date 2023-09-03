import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Post {
  @Prop()
  title: string;

  @Prop()
  body: string;

  @Prop()
  author: string;
}
export type ProductDocument = Post & Document;
export const PostSchema = SchemaFactory.createForClass(Post);
