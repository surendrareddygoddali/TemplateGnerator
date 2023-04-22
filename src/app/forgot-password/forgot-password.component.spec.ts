import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { AuthenticationService } from '../authentication.service';

import { ForgotPasswordComponent } from './forgot-password.component';

describe('ForgotPasswordComponent', () => {
  let component: ForgotPasswordComponent;
  let fixture: ComponentFixture<ForgotPasswordComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthenticationService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('AuthenticationService', ['resetPassword']);

    await TestBed.configureTestingModule({
      declarations: [ ForgotPasswordComponent ],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: AuthenticationService, useValue: spy }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPasswordComponent);
    component = fixture.componentInstance;
    authServiceSpy = TestBed.inject(AuthenticationService) as jasmine.SpyObj<AuthenticationService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not submit form if form is invalid', () => {
    component.forgotPasswordForm.setValue({ email: '', newPassword: '', repeatPassword: '' });
    expect(component.onSubmit()).toBeUndefined();
    expect(component.errorMsg).toEqual('');
    expect(authServiceSpy.resetPassword).toHaveBeenCalledTimes(0);
  });

  it('should not submit form if passwords do not match', () => {
    component.forgotPasswordForm.setValue({ email: 'example@example.com', newPassword: 'password1', repeatPassword: 'password2' });
    expect(component.onSubmit()).toBeUndefined();
    expect(component.errorMsg).toEqual("Re-entered password doesn't match!!");
    expect(authServiceSpy.resetPassword).toHaveBeenCalledTimes(0);
  });

  it('should submit form and show success message', () => {
    authServiceSpy.resetPassword.and.returnValue(of({ reset: true }));
    component.forgotPasswordForm.setValue({ email: 'example@example.com', newPassword: 'password', repeatPassword: 'password' });
    expect(component.onSubmit()).toBeUndefined();
    expect(component.errorMsg).toEqual('');
    expect(authServiceSpy.resetPassword).toHaveBeenCalledTimes(1);
    expect(component.success).toEqual(true);
  });

  it('should submit form and show error message', () => {
    authServiceSpy.resetPassword.and.returnValue(of({ reset: false }));
    component.forgotPasswordForm.setValue({ email: 'nonexisting@example.com', newPassword: 'password', repeatPassword: 'password' });
    expect(component.onSubmit()).toBeUndefined();
    expect(component.errorMsg).toEqual("Email Doesn't exists!!");
    expect(authServiceSpy.resetPassword).toHaveBeenCalledTimes(1);
    expect(component.success).toEqual(false);
  });
});
