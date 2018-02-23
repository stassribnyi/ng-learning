import { Component, OnInit } from '@angular/core';
import { Order } from '../../model/order.model';
import { OrderRepository } from '../../model/order.repository';

@Component({
  moduleId: module.id,
  templateUrl: './order-table.component.html',
  styleUrls: ['./order-table.component.scss']
})
export class OrderTableComponent implements OnInit {
  includeShipped = false;

  constructor(private repository: OrderRepository) { }

  getOrders(): Order[] {
    return this.repository.getOrders().filter(o => this.includeShipped || !o.shipped);
  }
  delete(id: number) {
    this.repository.deleteOrder(id);
  }
  markShipped(order: Order) {
    order.shipped = true;
    this.repository.updateOrder(order);
  }

  ngOnInit() {
  }

}
