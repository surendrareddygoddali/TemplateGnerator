import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { RegistrationComponent } from './registration.component';

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;
  let authenticationServiceSpy: jasmine.SpyObj<AuthenticationService>;

  beforeEach(async () => {
    const authSpy = jasmine.createSpyObj('AuthenticationService', ['createUser']);

    await TestBed.configureTestingModule({
      declarations: [ RegistrationComponent ],
      providers: [
        FormBuilder,
        { provide: AuthenticationService, useValue: authSpy }
      ]
    })
    .compileComponents();

    authenticationServiceSpy = TestBed.inject(AuthenticationService) as jasmine.SpyObj<AuthenticationService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate name control as required', () => {
    const nameControl = component.registrationForm.controls['name'];
    expect(nameControl.valid).toBeFalsy();

    nameControl.setValue('test');
    expect(nameControl.valid).toBeTruthy();

    nameControl.setValue('');
    expect(nameControl.valid).toBeFalsy();
  });

  it('should validate email control as email', () => {
    const emailControl = component.registrationForm.controls['email'];
    expect(emailControl.valid).toBeTruthy();

    emailControl.setValue('test');
    expect(emailControl.valid).toBeFalsy();

    emailControl.setValue('test@test.com');
    expect(emailControl.valid).toBeTruthy();
  });

  it('should validate phone control as required', () => {
    const phoneControl = component.registrationForm.controls['phone'];
    expect(phoneControl.valid).toBeFalsy();

    phoneControl.setValue('1234567890');
    expect(phoneControl.valid).toBeTruthy();

    phoneControl.setValue('');
    expect(phoneControl.valid).toBeFalsy();
  });

  it('should validate password control as required', () => {
    const passwordControl = component.registrationForm.controls['password'];
    expect(passwordControl.valid).toBeFalsy();

    passwordControl.setValue('password');
    expect(passwordControl.valid).toBeTruthy();

    passwordControl.setValue('');
    expect(passwordControl.valid).toBeFalsy();
  });

  it('should not call createUser method if form is invalid', () => {
    component.onSubmit();
    expect(authenticationServiceSpy.createUser).not.toHaveBeenCalled();
  });

  it('should call createUser method if form is valid', () => {
    component.registrationForm.controls['name'].setValue('test');
    component.registrationForm.controls['email'].setValue('test@test.com');
    component.registrationForm.controls['phone'].setValue('1234567890');
    component.registrationForm.controls['password'].setValue('password');
    component.onSubmit();

    expect(authenticationServiceSpy.createUser).toHaveBeenCalled();
  });
});
