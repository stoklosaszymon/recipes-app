import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe-form',
  imports: [ReactiveFormsModule, CommonModule, MatIconModule],
  templateUrl: './recipe-form.component.html',
  styleUrl: './recipe-form.component.scss'
})
export class RecipeFormComponent {

  fb = inject(FormBuilder);
  recipeService = inject(RecipeService);
  router = inject(Router);

  recipeForm = this.fb.group({
    title: ['', Validators.required],
    description: [''],
    duration: ['', [Validators.min(1)]],
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

  addIngredient() {
    this.ingredients.push(this.fb.group({
      name: ['', Validators.required],
      amount: ['', Validators.required]
    }));
  }

  removeIngredient(index: number) {
    this.ingredients.removeAt(index);
  }

  addStep() {
    this.steps.push(this.fb.control('', Validators.required));
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
      console.log(this.recipeForm.value);
      
      this.recipeService.addPost(this.recipeForm.value as Recipe)
      .subscribe({
        next: (value: Recipe) => this.router.navigate([`/recipe/${value.id}`])
      },
      )
    }
  }
}
