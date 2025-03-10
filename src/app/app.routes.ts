import { Routes } from '@angular/router';
import { RecipeDetailComponent } from './recipe-details/recipe-details.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeNewComponent } from './recipe-new/recipe-new.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';

export const routes: Routes = [
    { path: 'recipe/:id', component: RecipeDetailComponent },
    { path: 'recipe/:id/edit', component: RecipeEditComponent },
    { path: 'recipes', component: RecipeListComponent },
    { path: 'new', component: RecipeNewComponent },
    { path: '', redirectTo: 'recipes', pathMatch: 'full' },
];
