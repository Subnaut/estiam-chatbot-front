import { H, V } from '@angular/cdk/keycodes';
import { HttpClient } from '@angular/common/http';
import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-edit-product',
  imports: [FormsModule, ReactiveFormsModule, MatInputModule, MatButtonModule],
  templateUrl: './edit-product.html',
  styleUrl: './edit-product.scss',
})
export class EditProduct {

  formBuilder = inject(FormBuilder);
  activatedRoute = inject(ActivatedRoute);
  httpClient = inject(HttpClient);
  productId: WritableSignal<string | null> = signal(null);

  // Initialize the form with empty values and validators
  productForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.maxLength(255)]],
  });

  ngOnInit() {
    // Get the product ID from the route parameters
    this.activatedRoute.params.subscribe((params) => {

      //si c'est une edition, on charge la recette
      if (params['id']) {
        this.productId.set(params['id']);

        this.httpClient
          .get(`${environment.apiUrl}/product/${this.productId()}`)
          .subscribe((product: any) => {
            this.productForm.patchValue(product);
          });
      }
    });
  }

  onSubmit() {
    if (this.productForm.valid) {

      // Si c'est une edition
      if (this.productId()) {
        this.httpClient
          .put(`${environment.apiUrl}/product/${this.productId()}`, this.productForm.value)
          .subscribe({
            next: () => alert('Product updated successfully!'),
            error: (err) => {
              if (err.status === 404) {
                alert('Product not found. It may have been deleted.');
              } else {
                alert('An error occurred while updating the product. Please try again.');
              }
            },
          });
      } else {
        // Si c'est une création
        this.httpClient
          .post(`${environment.apiUrl}/product`, this.productForm.value)
          .subscribe({
            next: () => alert('Product created successfully!'),
            error: (err) => {
              alert('An error occurred while creating the product. Please try again.');
            }
          });
      }
    }
  }

}
