import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeSearchComponent } from './recipe/recipe-search.component';
import { RecipeListComponent } from './recipe/recipe-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [CommonModule, RecipeSearchComponent, RecipeListComponent],
})
export class AppComponent {
  title = 'search-demo';
}
