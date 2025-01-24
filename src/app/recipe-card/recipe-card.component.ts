import { Component, Input, input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-recipe-card',
  imports: [MatCardModule, MatIconModule],
  template: `
    <mat-card class="w-full hm-[400px] mb-2">
      <img class="object-cover h-64" mat-card-image [src]="recipe().image" [alt]="recipe().title">
      <mat-card-header>
        <mat-card-title>{{ recipe().title }}</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <p>{{ recipe().description }}</p>
      </mat-card-content>
      <mat-card-actions class="flex items-center">
        <mat-icon class="mr-1">schedule</mat-icon>
        <span>{{ recipe().cookingTime }} minutes</span>
      </mat-card-actions>
    </mat-card>
  `,
})
export class RecipeCardComponent {
  recipe = input<Recipe>({} as Recipe);
}