import { Injectable } from "@angular/core";
import { Product } from "./product.model";
import { RestDataSource } from "./rest.datasource";
import { Order } from "./order.model";
import { Observable } from "rxjs/Observable";

@Injectable()
export class OrderRepository {
  private orders: Order[] = [];
  private loaded = false;

  constructor(private dataSource: RestDataSource) { }

  loadOrders() {
    this.loaded = true;
    this.dataSource.getOrders()
      .subscribe(orders => this.orders = orders);
  }

  public getOrders(): Order[] {
    if (!this.loaded) {
      this.loadOrders();
    }

    return this.orders;
  }

  public saveOrder(order: Order): Observable<Order> {
    return this.dataSource.saveOrder(order);
  }

  updateOrder(order: Order) {
    this.dataSource.updateOrder(order).subscribe(or => {
      this.orders.splice(this.orders.findIndex(o => o.id === order.id), 1, order);
    });
  }

  deleteOrder(id: number) {
    this.dataSource.deleteOrder(id).subscribe(order => {
      this.orders.splice(this.orders.findIndex(o => o.id === id));
    });
  }
}

