import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowactivityComponent } from './showactivity.component';

describe('ShowactivityComponent', () => {
  let component: ShowactivityComponent;
  let fixture: ComponentFixture<ShowactivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShowactivityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowactivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
