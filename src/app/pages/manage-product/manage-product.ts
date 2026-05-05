import { HttpClient } from '@angular/common/http';
import { Component, inject, signal, WritableSignal } from '@angular/core';
import { RouterLink } from "@angular/router";
import { Auth } from '../../services/auth';
import { environment } from '../../../environments/environment';

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
      this.httpClient.get<Product[]>(`${environment.apiUrl}/product/list`).subscribe((data) => {
        this.products.set(data);
      });
    }
  
    onDeleteProduct(id: number) {
      this.httpClient.delete(`${environment.apiUrl}/product/${id}`).subscribe(() => {
         this.refreshProduct();
      });
    }

}
