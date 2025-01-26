import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-recipe-loading-temp',
  imports: [MatCardModule, MatIconModule],
  template: `
    <mat-card class="w-full hm-[400px] mb-2">
      <div class="object-cover h-64 w-full rounded"></div>
      <mat-card-header>
        <div class="w-1/2 h-5 m-1 rounded-md" ></div>
      </mat-card-header>
      <mat-card-content>
        <div class="w-5/6 h-5 m-1 rounded-md"></div>
      </mat-card-content>
      <mat-card-actions class="flex items-center">
        <mat-icon class="mr-1">schedule</mat-icon>
        <span class="w-3/4 h-5 m-1 rounded-md"></span>
      </mat-card-actions>
    </mat-card>
  `,
  styleUrl: './recipe-loading-temp.component.scss'
})
export class RecipeLoadingTempComponent {

}
