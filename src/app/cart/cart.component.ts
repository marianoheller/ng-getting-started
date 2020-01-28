import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";

import { CartService } from "@services/cart.service";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.css"]
})
export class CartComponent implements OnInit {
  checkoutForm;

  constructor(private cart: CartService, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.checkoutForm = this.formBuilder.group({
      name: ["", [Validators.required, Validators.minLength(4)]],
      address: ["", [Validators.required, Validators.minLength(4)]]
    });
  }

  onSubmit(customerData) {
    if (this.checkoutForm.valid) {
      console.warn("Your order has been submitted", customerData);
      this.cart.clearCart();
      this.checkoutForm.reset();
    }
  }

  onDelete(dataIndex) {
    this.cart.removeProduct(dataIndex);
  }
}
