import { Component, inject } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { RecipeFormComponent } from "../recipe-form/recipe-form.component";
import { SingleInputComponent } from "../single-input/single-input.component";
import { RecipeService } from '../recipe.service';
import { Router } from '@angular/router';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-new',
  imports: [MatTabsModule, RecipeFormComponent, SingleInputComponent],
  templateUrl: './recipe-new.component.html',
  styleUrl: './recipe-new.component.scss'
})
export class RecipeNewComponent {

  recipeService = inject(RecipeService);
  router = inject(Router)

  handleOutput(value: any) {
    const url = value;
    this.recipeService.postFromUrl(url)
     .subscribe({
        next: (recipe: Recipe) => {
          console.log('recipe', recipe)
          console.log('type', typeof recipe)
          this.router.navigate([`/recipe/${recipe.id}`])
        }
      })
  }
}
