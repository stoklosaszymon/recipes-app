import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeLoadingTempComponent } from './recipe-loading-temp.component';

describe('RecipeLoadingTempComponent', () => {
  let component: RecipeLoadingTempComponent;
  let fixture: ComponentFixture<RecipeLoadingTempComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeLoadingTempComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipeLoadingTempComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
