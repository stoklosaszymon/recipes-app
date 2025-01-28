import { CommonModule } from '@angular/common';
import { Component, effect, inject, input, output } from '@angular/core';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';
import { Router } from '@angular/router';
import { LoadingService } from '../loading.service';

@Component({
  selector: 'app-recipe-form',
  imports: [ReactiveFormsModule, CommonModule, MatIconModule],
  templateUrl: './recipe-form.component.html',
  styleUrl: './recipe-form.component.scss'
})
export class RecipeFormComponent {

  fb = inject(FormBuilder);
  recipeService = inject(RecipeService);
  loadingService = inject(LoadingService);
  router = inject(Router);
  recipe = input<Recipe>();
  formResult = output<any>();

  recipeEffect = effect( () => {
    if (this.recipe() ) {
      this.recipeForm.patchValue({
        title: this.recipe()?.title,
        description: this.recipe()?.description,
        cookingTime: this.recipe()?.cookingTime,
        image: this.recipe()?.image, 
      });

      this.recipeForm.controls.ingredients.clear();
      this.recipe()?.ingredients?.forEach( (ingredient) =>{
        this.addIngredient(ingredient.name, ingredient.amount)
      })

      this.recipeForm.controls.steps.clear();
      this.recipe()?.steps?.forEach( (step) =>{
        this.addStep(step)
      })

    }
  })

  recipeForm = this.fb.group({
    title: ['', Validators.required],
    description: [''],
    cookingTime: [0, [Validators.min(1)]],
    image: ['', Validators.required],
    ingredients: this.fb.array([
      this.fb.group({
        name: ['', Validators.required],
        amount: ['', Validators.required]
      })
    ]),
    steps: this.fb.array([
      this.fb.control('', Validators.required)
    ])
  });

  get ingredients() {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  get steps() {
    return this.recipeForm.get('steps') as FormArray;
  }

  addIngredient(name: string = '', amount: string = '') {
    this.ingredients.push(this.fb.group({
      name: [name, Validators.required],
      amount: [amount, Validators.required]
    }));
  }

  removeIngredient(index: number) {
    this.ingredients.removeAt(index);
  }

  addStep(step: string = '') {
    this.steps.push(this.fb.control(step, Validators.required));
  }

  removeStep(index: number) {
    this.steps.removeAt(index);
  }

  handleImageLoad(event: Event) {
    let target = event.target as HTMLInputElement;
    if (target.files) {
      console.log('processing filse');
      const file = target.files[0]
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result?.toString() || null;
        this.recipeForm.get('image')?.setValue(result)
      };
    } else {
      console.log('ni ma filesa');
    }
  }

  onSubmit() {
    if (this.recipeForm.valid) {
      console.log('emiting')
      this.formResult.emit(this.recipeForm.value);
    }
  }
}
