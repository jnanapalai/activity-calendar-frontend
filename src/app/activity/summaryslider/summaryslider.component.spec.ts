import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummarysliderComponent } from './summaryslider.component';

describe('SummarysliderComponent', () => {
  let component: SummarysliderComponent;
  let fixture: ComponentFixture<SummarysliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SummarysliderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SummarysliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
