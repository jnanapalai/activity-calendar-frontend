import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeactivityComponent } from './welcomeactivity.component';

describe('WelcomeactivityComponent', () => {
  let component: WelcomeactivityComponent;
  let fixture: ComponentFixture<WelcomeactivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WelcomeactivityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WelcomeactivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
