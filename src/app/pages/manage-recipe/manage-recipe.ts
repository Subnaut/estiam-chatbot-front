import { HttpClient } from '@angular/common/http';
import { Component, inject, signal, WritableSignal } from '@angular/core';
import { RouterLink } from "@angular/router";
import { Auth } from '../../services/auth';

type Recipe = {
  id: number;
  name: string;
  description: string;
};

@Component({
  selector: 'app-manage-recipe',
  imports: [RouterLink],
  templateUrl: './manage-recipe.html',
  styleUrl: './manage-recipe.scss',
})
export class ManageRecipe {
  httpClient = inject(HttpClient);
  auth = inject(Auth);

  recipes: WritableSignal<Recipe[]> = signal([]);

  ngOnInit() {
    this.refreshRecipes();
  }

  refreshRecipes() {
    this.httpClient.get<Recipe[]>('http://localhost:8080/recipe/list').subscribe((data) => {
      this.recipes.set(data);
    });
  }

  onDeleteRecipe(id: number) {
    this.httpClient.delete(`http://localhost:8080/recipe/${id}`).subscribe(() => {
       this.refreshRecipes();
    });
  }
}
