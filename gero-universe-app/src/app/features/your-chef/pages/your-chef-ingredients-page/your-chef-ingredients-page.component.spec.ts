import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YourChefIngredientsPageComponent } from './your-chef-ingredients-page.component';

describe('YourChefIngredientsPageComponent', () => {
  let component: YourChefIngredientsPageComponent;
  let fixture: ComponentFixture<YourChefIngredientsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YourChefIngredientsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YourChefIngredientsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
