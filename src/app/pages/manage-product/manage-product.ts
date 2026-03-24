import { HttpClient } from '@angular/common/http';
import { Component, inject, signal, WritableSignal } from '@angular/core';
import { RouterLink } from "@angular/router";
import { Auth } from '../../services/auth';

type Product = {
  id: number;
  name: string;
};

@Component({
  selector: 'app-manage-product',
  imports: [RouterLink],
  templateUrl: './manage-product.html',
  styleUrl: './manage-product.scss',
})
export class ManageProduct {
  httpClient = inject(HttpClient);
    auth = inject(Auth);
  
    products: WritableSignal<Product[]> = signal([]);
  
    ngOnInit() {
      this.refreshProduct();
    }
  
    refreshProduct() {
      this.httpClient.get<Product[]>('http://localhost:8080/product/list').subscribe((data) => {
        this.products.set(data);
      });
    }
  
    onDeleteProduct(id: number) {
      this.httpClient.delete(`http://localhost:8080/product/${id}`).subscribe(() => {
         this.refreshProduct();
      });
    }

}
