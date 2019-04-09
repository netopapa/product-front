import { Injectable } from '@angular/core';
import { Product } from '../../model/product.model';

@Injectable()
export class ProductService {

  public produtos: Product[] = [];

  constructor() { }

  public getAll(): Product[] {
    return this.produtos;
  }

  public getOne(id: number): Product {
    return this.produtos.find(prod => prod.id == id);
  }

  public save(data: Product): Product {
    data.id = this.buildNewId();
    this.produtos.push(data);
    return data;
  }

  public update(data: Product): Product {
    const index: number = this.produtos.indexOf(this.getOne(data.id));
    this.produtos[index] = data;
    return this.produtos[index];
  }


  public delete(id: number): void {
    const index: number = this.produtos.indexOf(this.getOne(id));
    this.produtos.splice(index, 1);
  }

  private buildNewId(): number {
    let id = this.produtos.length;
    while (this.getOne(id)) {
      id++;
    }
    return id;
  }

}
