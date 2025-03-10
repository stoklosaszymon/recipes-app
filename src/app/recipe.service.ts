import { Injectable, inject } from '@angular/core';
import { Recipe } from './recipe.model';
import { BehaviorSubject, Observable, debounceTime, delay, finalize, switchMap, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoadingService } from './loading.service';
import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  http = inject(HttpClient);
  loadingService = inject(LoadingService);
  searchTerm$ = new BehaviorSubject<string>('');
  baseUrl = environment.recipeApi;

  headers = { "Content-type": "application/json" }

  getRecipes(): Observable<Recipe[]> {
    this.loadingService.loading();
    return this.searchTerm$.pipe(
      debounceTime(100),
      switchMap((term) => {
        return this.http.get<Recipe[]>(`${this.baseUrl}recipes?searchTerm=${term}`).pipe(
          finalize(() => this.loadingService.done())
        )
      }
      ),
    )
  }

  editPost(recipe: Recipe): Observable<Recipe> {
    return this.http.post<Recipe>(`${this.baseUrl}recipes/${recipe.id}/edit`, recipe).pipe(
      finalize(() => this.loadingService.done())
    )
  }

  getRecipeById<Recipe>(id: number): Observable<Recipe> {
    return this.http.get<Recipe>(`${this.baseUrl}recipes/${id}`).pipe(
      tap( (rep)=> console.log(rep)
      )
    )
  }

  addPost(recipe: Recipe): Observable<Recipe> {
    return this.http.post<Recipe>(`${this.baseUrl}recipes`, recipe, { headers: this.headers });
  }

  postFromUrl(url: string) {
    this.loadingService.loading();
    return this.http.get<Recipe>(`${this.baseUrl}recipes/fromUrl?url=${url}`, { headers: this.headers }).pipe(
      finalize(() => this.loadingService.done())
    )
  }

  deleteRecipe(id: number) {
    return this.http.delete<Recipe>(`${this.baseUrl}recipes/${id}`).pipe(
      finalize(() => this.loadingService.done())
    )
  }

  search(term: string) {
    this.searchTerm$.next(term);
  }
}
