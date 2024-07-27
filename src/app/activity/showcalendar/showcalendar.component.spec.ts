import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowcalendarComponent } from './showcalendar.component';

describe('ShowcalendarComponent', () => {
  let component: ShowcalendarComponent;
  let fixture: ComponentFixture<ShowcalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShowcalendarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowcalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
