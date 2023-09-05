import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Product {
  @Prop()
  name: string;

  @Prop()
  manufacturer: string;

  @Prop()
  manufactureYear: number;

  @Prop({ type: Number, select: false})
  __v: number;
}
export type ProductDocument = Product & Document;
export const ProductSchema = SchemaFactory.createForClass(Product);
ProductSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

