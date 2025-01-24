import { Component, effect, output, signal } from '@angular/core';

@Component({
  selector: 'app-single-input',
  imports: [],
  template: `
    <div class="container mx-auto px-4 py-8">
        <h1 class="text-3xl font-bold mb-6">Create a New Recipe</h1>
        <label for="url" class="block text-sm font-medium text-gray-700">Url</label>
        <input type="text" id="url" (input)="updateValue($event)"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
        <button (click)="save()"
            class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 disabled:opacity-50">
            Create Recipe
        </button>
    </div>
  `,
  styles: [`
     input {
       height: 40px;
       padding-left: 10px;
     }
  `]
})
export class SingleInputComponent {

  value = signal('');
  out = output<string>();

  updateValue(event: Event) {
    const target = event.target as HTMLInputElement;
    this.value.set(target.value);
  }
  
  save() {
    this.out.emit(this.value());
  }

}
