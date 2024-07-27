import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateactivityComponent } from './createactivity.component';

describe('CreateactivityComponent', () => {
  let component: CreateactivityComponent;
  let fixture: ComponentFixture<CreateactivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateactivityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateactivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
