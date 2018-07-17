import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { RestService } from '../rest-service/rest.service';
import { Constant } from '../../constant/constant';
import { Observable } from 'rxjs/Observable';
import { Product } from '../../model/product.model';

@Injectable()
export class ProductService extends RestService {

  baseURL = Constant.BASE_URL + Constant.PRODUTO;

  constructor(
    http: Http
  ) { super(http); }

  public getAll(): Observable<Array<Product>> {
    return this.get(this.baseURL + 'findAll');
  }

  public getOne(id: String): Observable<Product> {
    const getAllUrl = this.baseURL + 'findOne/' + id;
    return this.get(getAllUrl);
  }

  public save(data: Product): Observable<Product> {
    const saveUrl = this.baseURL + 'save';
    return this.post(saveUrl, data);
  }

  public update(data: Product): Observable<Product> {
    const updateUrl = this.baseURL + 'update';
    return this.put(updateUrl, data);
  }


  public delete(id: string): Observable<any> {
    const deleteURL = this.baseURL + 'delete';

    return this.remove(deleteURL, id);
  }
}
