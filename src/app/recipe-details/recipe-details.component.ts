import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, map, switchMap } from 'rxjs';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';

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
  recipeService = inject(RecipeService)
  recipeId = this.route.paramMap.pipe(
    map(params => {
      let id = params.get('id');
      return id ?? ''
    }),
  )

  recipe$ = this.recipeId.pipe(
    switchMap( (id: string) => {
      return this.recipeService.getRecipeById<Recipe>(parseInt(id))
    })
  )
}