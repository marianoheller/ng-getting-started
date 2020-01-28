import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";

import uuid from "uuid/v1";

import { Product } from "@models/product";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class ProductsService {
  private readonly _products = new BehaviorSubject<Product[]>([]);
  readonly products$ = this._products.asObservable();

  constructor(private http: HttpClient) {
    this.fetchProducts()
      .pipe(
        map((prods: Product[]) => prods.map(p => <Product>{ ...p, id: uuid() }))
      )
      .subscribe(v => this._products.next(v));
  }

  private get products(): Product[] {
    return this._products.getValue();
  }

  private set products(val: Product[]) {
    this._products.next(val);
  }

  fetchProducts() {
    return this.http.get("/assets/products.json");
  }

  findProduct(id: String): Product | null {
    return this.products.find(p => (p.id = id)) || null;
  }
}
