import { Component, inject, input } from '@angular/core';
import { RecipeFormComponent } from '../recipe-form/recipe-form.component';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of, switchMap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { Recipe } from '../recipe.model';
import { LoadingService } from '../loading.service';

@Component({
  selector: 'app-recipe-edit',
  imports: [RecipeFormComponent],
  templateUrl: './recipe-edit.component.html',
  styleUrl: './recipe-edit.component.scss'
})
export class RecipeEditComponent {

  route = inject(ActivatedRoute);
  router = inject(Router);
  recipeService = inject(RecipeService);
  loadingService = inject(LoadingService);
  recipeId = toSignal<number>(this.route.paramMap.pipe(
    switchMap((map) => {
      const id = parseInt(map.get("id")!) ?? 0;
      return of(id)
    })
  ))

  recipe = toSignal<Recipe>(this.recipeService.getRecipeById(this.recipeId()!))

  editRecipe(recipeForm: any) {
    console.log(recipeForm); 
    const recipe = { ...recipeForm, id: this.recipeId()};
    this.loadingService.loading();
    this.recipeService.editPost(recipe as Recipe)
      .subscribe({
        next: (value: Recipe) => {
          this.loadingService.done();
          this.router.navigate([`/recipe/${value.id}`])
        }
      })
  }

  delete() {
    this.recipeService.deleteRecipe(this.recipeId()!)
      .subscribe({
        next: (value: Recipe) => {
          this.loadingService.done();
          this.router.navigate([`/recipes`])
        }
      })
  }

}
