import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YourChefMainPageComponent } from './your-chef-main-page.component';

describe('YourChefMainPageComponent', () => {
  let component: YourChefMainPageComponent;
  let fixture: ComponentFixture<YourChefMainPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YourChefMainPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YourChefMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
