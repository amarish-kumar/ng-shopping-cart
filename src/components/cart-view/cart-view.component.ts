import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { CartItem } from '../../classes/cart-item';
import { CartService } from '../../services/cart.service';
import { CartViewDisplay } from '../../types';

@Component({
  selector: 'cart-view',
  templateUrl: './cart-view.component.html',
})
export class CartViewComponent implements OnInit, OnDestroy {
  private serviceSubscription: any;
  @Input() display: CartViewDisplay = 'fixed';
  empty = true;
  items: CartItem[];
  taxRate = 0;
  tax = 0;
  shipping = 0;
  cost = 0;

  constructor(private cartService: CartService) {
    this.update();
  }

  update() {
    this.empty = this.cartService.isEmpty();
    this.items = this.cartService.getItems();
    this.taxRate = this.cartService.getTaxRate();
    this.tax = this.cartService.getTax();
    this.shipping = this.cartService.getShipping();
    this.cost = this.cartService.totalCost();
  }

  increase(item: CartItem) {
    item.quantity++;
    this.cartService.addItem(item.id, item.name, item.price, item.quantity, item.data);
  }

  decrease(item: CartItem) {
    if (item.quantity > 1) {
      item.quantity--;
    }
    this.cartService.addItem(item.id, item.name, item.price, item.quantity, item.data);
  }

  ngOnInit(): void {
    this.serviceSubscription = this.cartService.onItemsChanged.subscribe(() => {
      this.update();
    });
  }

  ngOnDestroy(): void {
    this.serviceSubscription.unsubscribe();
  }

}