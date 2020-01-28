import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";
import { map } from "rxjs/operators";
import { Product, instanceOfProduct } from "@models/product";

const LOCAL_STORAGE_KEY = "cart";

@Injectable({
  providedIn: "root"
})
export class CartService {
  private readonly _products = new BehaviorSubject<Product[]>([]);
  readonly products$ = this._products.asObservable();

  constructor(private http: HttpClient) {
    try {
      const savedCart = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
      if (Array.isArray(savedCart) && savedCart.every(instanceOfProduct)) {
        this.products = savedCart;
      } else {
        throw Error("invalid stuff saved");
      }
    } catch (err) {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
  }

  private get products(): Product[] {
    return this._products.getValue();
  }

  private set products(val: Product[]) {
    this._products.next(val);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(val));
  }

  readonly cartSize$ = this.products$.pipe(
    map(products => (products ? products.length : 0))
  );

  readonly isEmpty$ = this.cartSize$.pipe(map(length => length === 0));

  addProduct(product: Product) {
    const newproducts = [...this.products, product];
    this.products = newproducts;
  }

  clearCart() {
    this.products = [];
  }

  removeProduct(index: Number) {
    this.products = this.products.filter((_, i) => i !== index);
  }

  getShippingPrices() {
    return this.http.get("/assets/shipping.json");
  }
}
