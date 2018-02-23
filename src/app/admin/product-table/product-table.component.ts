import { Component, OnInit } from '@angular/core';
import { Product } from '../../model/product.model';
import { ProductRepository } from '../../model/product.repository';

@Component({
  moduleId: module.id,
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.scss']
})
export class ProductTableComponent implements OnInit {

  constructor(private repository: ProductRepository) { }

  ngOnInit() {
  }

  getProducts(): Product[] {
    return this.repository.getProducts();
  }

  deleteProduct(id: number) {
    this.repository.deleteProduct(id);
  }
}
