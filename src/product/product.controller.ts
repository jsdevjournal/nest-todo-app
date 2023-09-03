import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
  NotFoundException,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDTO } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-post.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async create(
    @Body() createProduct: CreateProductDTO,
    @Res() response,
  ) {
    const product = await this.productService.create(createProduct);
    return response.status(HttpStatus.CREATED).json({
      message: 'Success',
      product,
    });
  }

  @Get()
  async findAll(@Res() response) {
    const products = await this.productService.findAll();
    return response.status(HttpStatus.OK).json({
      message: 'Success',
      products,
    });
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Res() response,
  ) {
    const product = await this.productService.findOne(id);
    if (!product) {
      throw new NotFoundException('Not exist!');
    }
    return response.status(HttpStatus.OK).json({
      message: 'Success',
      product,
    });
  }

  @Put(':id')
  async update(
    @Param('id') id,
    @Body() updateProduct: UpdateProductDto,
    @Res() response,
  ) {
    const product = await this.productService.update(id, updateProduct);
    if (!product) {
      throw new NotFoundException('Not exist!');
    }
    return response.status(HttpStatus.OK).json({
      message: 'Updated',
      product,
    });
  }

  @Delete(':id')
  async remove(
    @Param('id') id,
    @Res() response,
  ) {
    await this.productService.remove(id);
    return response.status(HttpStatus.NO_CONTENT).json({
      message: 'Deleted'
    });
  }
}
