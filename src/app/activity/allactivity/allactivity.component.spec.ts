import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllactivityComponent } from './allactivity.component';

describe('AllactivityComponent', () => {
  let component: AllactivityComponent;
  let fixture: ComponentFixture<AllactivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllactivityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllactivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
