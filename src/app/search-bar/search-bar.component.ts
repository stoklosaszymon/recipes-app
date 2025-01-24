import { Component, inject, output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-search-bar',
  imports: [ReactiveFormsModule, AsyncPipe],
  template: `
      <div class="relative">
      <input
        type="text"
        [formControl]="searchTerm"
        placeholder="Search..."
        class="w-full py-2 pl-10 pr-4 text-gray-700 bg-white border rounded-full focus:outline-none focus:border-blue-500"
      />
      <div class="absolute inset-y-0 left-0 flex items-center pl-3">
        <svg class="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <button
        (click)="clearSearch()"
        class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
      >
        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
        @if( dirty | async) {
        }
      `
  ,
  styles: ['']
})
export class SearchBarComponent {
  recipeService = inject(RecipeService);
  searchTerm = new FormControl('')
  dirty = this.searchTerm.valueChanges.pipe(
    tap(term => this.recipeService.search(term!))
  )

  clearSearch() {
    this.searchTerm.setValue('');
  }
}
