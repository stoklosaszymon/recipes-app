import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { RecipeCardComponent } from '../recipe-card/recipe-card.component';
import { SearchBarComponent } from "../search-bar/search-bar.component";
import { Router } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadingService } from '../loading.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { RecipeLoadingTempComponent } from "../recipe-loading-temp/recipe-loading-temp.component";
import { finalize } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  imports: [RecipeCardComponent, SearchBarComponent, MatProgressSpinnerModule, RecipeLoadingTempComponent, CommonModule],
  template: `
    <div class="m-4">
      <app-search-bar/>
    </div>
    <div *ngIf="recipes$ | async as recipes; else loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 relative">
         @for( recipe of recipes; track recipe.id) {
           <div class="cursor-pointer" (click)="goToRecipe(recipe.id)">
             <app-recipe-card [recipe]="recipe"></app-recipe-card>
           </div>
         } 
         @empty {
           <div class="flex flex-col w-full items-center justify-center h-64 bg-gray-100 rounded-lg absolute">
             <svg class="w-16 h-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
             </svg>
             <h3 class="text-lg font-medium text-gray-900 mb-2">No recipes found</h3>
             <p class="text-gray-500 text-center">
               It looks like there are no recipes matching your search. Try adjusting your filters or add a new recipe.
             </p>
           </div>
         }
    </div>
    <ng-template #loading>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 relative">
        @for( recipe of temp; track recipe) {
          <app-recipe-loading-temp></app-recipe-loading-temp>
        }
      </div>
    </ng-template>
  `,
  styles: [``],
})
export class RecipeListComponent {

  recipeService = inject(RecipeService)
  loadingService = inject(LoadingService);
  router = inject(Router);
  loading = toSignal(this.loadingService.loading$)

  temp = Array.from(Array(6).keys());

  recipes$ = this.recipeService.getRecipes()

  goToRecipe(id: number) {
    this.router.navigate([`recipe/${id}`])
  }

}