import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Product from '../infra/typeorm/entities/Product';
import IProductsRepository from '../repositories/IProductsRepository';

interface IRequest {
  name: string;
  price: number;
  quantity: number;
}

@injectable()
class CreateProductService {
  constructor(
    @inject('ProductRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute({ name, price, quantity }: IRequest): Promise<Product> {
    const checkProductExist = await this.productsRepository.findByName(name);

    if (checkProductExist) {
      throw new AppError('This product already exist.');
    }

    const customer = await this.productsRepository.create({
      name,
      quantity,
      price,
    });

    return customer;
  }
}

export default CreateProductService;
