import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CartService } from "@services/cart.service";
import { Product } from "@models/product";
import { ProductsService } from "@services/products.service";
import { switchMap, map } from "rxjs/operators";

@Component({
  selector: "app-product-details",
  templateUrl: "./product-details.component.html",
  styleUrls: ["./product-details.component.css"]
})
export class ProductDetailsComponent implements OnInit {
  product: Product;
  productFound: Boolean = false;

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private productsService: ProductsService
  ) {}

  ngOnInit() {
    this.route.paramMap
      .pipe(
        map(params => params.get("productId")),
        map(id => this.productsService.findProduct(id))
      )
      .subscribe(p => {
        if (p) {
          this.product = p;
          this.productFound = true;
        }
      });
  }

  addToCart(product) {
    window.alert("Your product has been added to the cart!");
    this.cartService.addProduct(product);
  }
}
