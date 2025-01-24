import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleInputComponent } from './single-input.component';

describe('SingleInputComponent', () => {
  let component: SingleInputComponent;
  let fixture: ComponentFixture<SingleInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
