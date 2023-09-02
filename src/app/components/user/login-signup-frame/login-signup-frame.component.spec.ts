import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginSignupFrameComponent } from './login-signup-frame.component';

describe('LoginSignupFrameComponent', () => {
  let component: LoginSignupFrameComponent;
  let fixture: ComponentFixture<LoginSignupFrameComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginSignupFrameComponent]
    });
    fixture = TestBed.createComponent(LoginSignupFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
