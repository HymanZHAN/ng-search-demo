import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  BehaviorSubject,
  catchError,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  of,
  retry,
  startWith,
  switchMap,
} from 'rxjs';
import { MealsResponse } from './meal';

const URL = `https://www.themealdb.com/api/json/v1/1/search.php`; // should probably be store as an env variable or injected

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private httpClient = inject(HttpClient);

  query = new BehaviorSubject('');

  // You may have different data sources, for example, a local RxDB/Dexie/IndexedDB database.
  // So the data access code could be its own service that gets injected, if you forsee such requirement.
  private searchRecipesHttp = (s: string) =>
    this.httpClient.get<MealsResponse>(`${URL}?s=${s}`).pipe(
      retry(3), // and caching, timeout, etc.
      map((res) => res.meals), // data mapping
      catchError(() => of([])) // error handling
    );

  recipes$ = this.query.pipe(
    debounceTime(500),
    map((s) => s.trim()),
    filter((s) => s !== ''),
    distinctUntilChanged(),
    switchMap(this.searchRecipesHttp),
    startWith([])
  );
}
