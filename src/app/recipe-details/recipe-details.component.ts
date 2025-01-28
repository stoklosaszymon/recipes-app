import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, switchMap, tap } from 'rxjs';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';

interface Ingredient {
  name: string;
  amount: string;
}

interface Step {
  description: string;
  image: string;
}

@Component({
  selector: 'app-recipe-detail',
  imports: [CommonModule, AsyncPipe],
  templateUrl: './recipe-details.component.html'
})
export class RecipeDetailComponent {
  route = inject(ActivatedRoute);
  router = inject(Router);
  recipeService = inject(RecipeService)
  recipeId = toSignal<number>(this.route.paramMap.pipe(
    map(params => {
      let id = params.get('id');
      return Number(id) ?? 0
    }),
  ));

  recipe$ = toObservable(this.recipeId).pipe(
    switchMap( (id) => {
      return this.recipeService.getRecipeById<Recipe>(Number(id)).pipe(
        tap( (res) => console.log(res))
      )
    })
  )

  editRecipe() {
    this.router.navigate([`recipe/${this.recipeId()}/edit`])
  }
}