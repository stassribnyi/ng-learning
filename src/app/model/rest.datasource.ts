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

    constructor(private http: Http) {
        this.baseUrl = `${PROTOCOL}://${location.hostname}:${PORT}/`;
    }

    getProducts(): Observable<Product[]> {
        return this.sendRequest(RequestMethod.Get, "products");
    }

    saveOrder(order: Order): Observable<Order> {
        return this.sendRequest(RequestMethod.Post, "orders", order);
    }

    private sendRequest<T, U>(verb: RequestMethod, url: string, body?: U): Observable<T> {
        return this.http.request(new Request({
            method: verb,
            url: `${this.baseUrl}${url}`,
            body: body
        })).map(response => response.json());
    }
}

