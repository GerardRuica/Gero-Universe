import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarYourChefComponent } from './sidebar-your-chef.component';

describe('SidebarYourChefComponent', () => {
  let component: SidebarYourChefComponent;
  let fixture: ComponentFixture<SidebarYourChefComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarYourChefComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarYourChefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
