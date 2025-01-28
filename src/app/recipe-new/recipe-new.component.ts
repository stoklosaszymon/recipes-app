import { Component, inject } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { RecipeFormComponent } from "../recipe-form/recipe-form.component";
import { SingleInputComponent } from "../single-input/single-input.component";
import { RecipeService } from '../recipe.service';
import { Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { LoadingService } from '../loading.service';

@Component({
  selector: 'app-recipe-new',
  imports: [MatTabsModule, RecipeFormComponent, SingleInputComponent],
  templateUrl: './recipe-new.component.html',
  styleUrl: './recipe-new.component.scss'
})
export class RecipeNewComponent {

  recipeService = inject(RecipeService);
  loadingService = inject(LoadingService);
  router = inject(Router)

  handleOutput(value: any) {
    const url = value;
    this.recipeService.postFromUrl(url)
      .subscribe({
        next: (recipe: Recipe) => {
          this.router.navigate([`/recipe/${recipe.id}`])
        }
      })
  }

  saveRecipe(recipeForm: any) {
    this.loadingService.loading();
    this.recipeService.addPost(recipeForm as Recipe)
      .subscribe({
        next: (value: Recipe) => {
          this.loadingService.done();
          this.router.navigate([`/recipe/${value.id}`])
        }
      })
  }
}
