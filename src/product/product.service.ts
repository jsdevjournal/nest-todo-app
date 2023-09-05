import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from '../schemas/product.schema';
import { CreateProductDTO } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-post.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<ProductDocument>,
  ) {}

  async create(createProduct: CreateProductDTO): Promise<Product> {
    const newProduct = new this.productModel(createProduct);
    return newProduct.save();
  }

  async findAll(): Promise<Product[]> {
    return await this.productModel.find().exec();
  }

  async findOne(id: string): Promise<Product> {
    return await this.productModel.findById(id).exec();
  }

  async update(id: string, updateProduct: UpdateProductDto): Promise<Product> {
    return await this.productModel.findByIdAndUpdate(id, updateProduct, {
      new: true,
    });
  }

  async remove(id: string): Promise<any> {
    return await this.productModel.findByIdAndRemove(id);
  }
}
