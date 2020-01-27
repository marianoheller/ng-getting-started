import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class CartService {
  items: Array<any>;

  constructor(private http: HttpClient) {
    this.items = [];
  }

  addToCart(product) {
    this.items.push(product);
  }

  clearCart() {
    this.items = [];
  }

  getItems() {
    return this.items;
  }

  getSize(): Number {
    return this.items.length;
  }

  getShippingPrices() {
    return this.http.get("/assets/shipping.json");
  }
}
