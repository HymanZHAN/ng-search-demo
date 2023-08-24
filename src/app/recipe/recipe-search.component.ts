import { Component, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecipeService } from './recipe.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="w-96">
      <label
        for="search"
        class="block text-sm font-medium leading-6 text-gray-900"
        >Search Recipes</label
      >
      <div class="relative mt-2 flex items-center">
        <input
          type="text"
          name="search"
          id="search"
          [formControl]="query"
          class="block w-full rounded-md border-0 py-1.5 pr-14 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
    </div>
  `,
  styles: [],
})
export class RecipeSearchComponent implements OnDestroy {
  private service = inject(RecipeService);
  private sub: Subscription;

  query = new FormControl('', { nonNullable: true });

  constructor() {
    this.sub = this.query.valueChanges.subscribe(this.service.query);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
