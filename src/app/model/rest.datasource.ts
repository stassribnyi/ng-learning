import { Injectable } from "@angular/core";
import { Request, Http, RequestMethod } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { Product } from "../model/product.model";
import { Cart } from "../model/cart.model";
import { Order } from "../model/order.model";

import "rxjs/add/operator/map";

const PROTOCOL = "http";
const PORT = "3500";

@Injectable()
export class RestDataSource {
  baseUrl: string;
  auth_token: string;

  constructor(private http: Http) {
    this.baseUrl = `${PROTOCOL}://${location.hostname}:${PORT}/`;
  }

  authenticate(user: string, pass: string): Observable<boolean> {
    return this.http.request(new Request({
      method: RequestMethod.Post,
      url: `${this.baseUrl}login`,
      body: { name: user, password: pass }
    })).map(response => {
      const res = response.json();
      this.auth_token = res.success ? res.token : null;
      return res.success;
    });
  }
  getProducts(): Observable<Product[]> {
    return this.sendRequest(RequestMethod.Get, "products");
  }

  saveProduct(product: Product): Observable<Product> {
    return this.sendRequest(RequestMethod.Post, "products", product, true);
  }

  updateProduct(product: Product): Observable<Product> {
    return this.sendRequest(RequestMethod.Put, `products/${product.id}`, product, true);
  }

  deleteProduct(id: number): Observable<Product> {
    return this.sendRequest(RequestMethod.Delete, `products/${id}`, null, true);
  }

  getOrders(): Observable<Order[]> {
    return this.sendRequest(RequestMethod.Get, "orders", null, true);
  }

  updateOrder(order: Order): Observable<Order> {
    return this.sendRequest(RequestMethod.Put, `orders/${order.id}`, order, true);
  }

  deleteOrder(id: number): Observable<Order> {
    return this.sendRequest(RequestMethod.Delete, `orders/${id}`, null, true);
  }

  saveOrder(order: Order): Observable<Order> {
    return this.sendRequest(RequestMethod.Post, "orders", order);
  }

  private sendRequest<T, U>(verb: RequestMethod, url: string, body?: U, auth: boolean = false): Observable<T> {
    const request = new Request({
      method: verb,
      url: `${this.baseUrl}${url}`,
      body: body
    });

    if (auth && this.auth_token != null) {
      request.headers.set("Authorization", `Bearer<${this.auth_token}>`);
    }

    return this.http.request(request).map(response => response.json());
  }
}

