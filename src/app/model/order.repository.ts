import { Injectable } from "@angular/core";
import { Product } from "./product.model";
import { StaticDataSource } from "./static.datasource";
import { Order } from "./order.model";
import { Observable } from "rxjs/Observable";

@Injectable()
export class OrderRepository {
  private orders: Order[];

  constructor(private dataSource: StaticDataSource) { }

  public getOrders(): Order[] {
    return this.orders;
  }

  public saveOrder(order: Order): Observable<Order> {
    return this.dataSource.saveOrder(order);
  }
}
