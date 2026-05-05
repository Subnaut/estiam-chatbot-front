import { H, V } from '@angular/cdk/keycodes';
import { HttpClient } from '@angular/common/http';
import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-edit-recipe',
  imports: [FormsModule, ReactiveFormsModule, MatInputModule, MatButtonModule],
  templateUrl: './edit-recipe.html',
  styleUrl: './edit-recipe.scss',
})
export class EditRecipe {
  formBuilder = inject(FormBuilder);
  activatedRoute = inject(ActivatedRoute);
  httpClient = inject(HttpClient);
  recipeId: WritableSignal<string | null> = signal(null);

  // Initialize the form with empty values and validators
  recipeForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.maxLength(255)]],
    description: ['', [Validators.required]],
  });

  ngOnInit() {
    // Get the recipe ID from the route parameters
    this.activatedRoute.params.subscribe((params) => {

      //si c'est une edition, on charge la recette
      if (params['id']) {
        this.recipeId.set(params['id']);

        this.httpClient
          .get(`${environment.apiUrl}/recipe/${this.recipeId()}`)
          .subscribe((recipe: any) => {
            this.recipeForm.patchValue(recipe);
          });
      }
    });
  }

  onSubmit() {
    if (this.recipeForm.valid) {

      // Si c'est une edition
      if (this.recipeId()) {
        this.httpClient
          .put(`${environment.apiUrl}/recipe/${this.recipeId()}`, this.recipeForm.value)
          .subscribe({
            next: () => alert('Recipe updated successfully!'),
            error: (err) => {
              if (err.status === 404) {
                alert('Recipe not found. It may have been deleted.');
              } else {
                alert('An error occurred while updating the recipe. Please try again.');
              }
            },
          });
      } else {
        // Si c'est une création
        this.httpClient
          .post(`${environment.apiUrl}/recipe`, this.recipeForm.value)
          .subscribe({
            next: () => alert('Recipe created successfully!'),
            error: (err) => {
              alert('An error occurred while creating the recipe. Please try again.');
            }
          });
      }
    }
  }
}
