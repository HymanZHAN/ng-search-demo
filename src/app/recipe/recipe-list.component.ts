import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ul class="w-1/2">
      <li
        *ngFor="let recipe of recipes$ | async"
        class=" my-8 p-12 rounded-lg shadow-lg"
      >
        <section class="flex justify-between mb-8">
          <h2 class="font-bold text-2xl">{{ recipe.strMeal }}</h2>
          <img
            [src]="recipe.strMealThumb"
            [alt]="recipe.strMeal"
            class="w-48 h-48 rounded-md"
          />
        </section>
        <p>{{ recipe.strInstructions }}</p>
      </li>
    </ul>
  `,
  styles: [],
})
export class RecipeListComponent {
  recipes$ = inject(RecipeService).recipes$;
}
