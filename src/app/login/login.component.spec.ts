import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginComponent } from './login.component';
import { AuthenticationService } from '../authentication.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthenticationService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [ LoginComponent ],
      providers: [ AuthenticationService ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthenticationService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a FormGroup object named loginForm', () => {
    expect(component.loginForm).toBeDefined();
    expect(component.loginForm instanceof FormGroup).toBeTruthy();
  });

  it('should have required validators on the username and password form controls', () => {
    const usernameControl = component.loginForm.get('username');
    const passwordControl = component.loginForm.get('password');
    expect(usernameControl?.validator).toBe(Validators.required);
    expect(passwordControl?.validator).toBe(Validators.required);
  });

  it('should call authenticateUser method of the AuthenticationService when form is submitted with valid data', () => {
    const spy = spyOn(authService, 'authenticateUser').and.returnValue(of({ authorized: true, name: 'test' }));
    component.loginForm.patchValue({
      username: 'test@test.com',
      password: 'password'
    });
    component.onSubmit();
    expect(spy).toHaveBeenCalled();
  });

  it('should update isAuthSuccess and name properties and navigate to template-generater when authentication is successful', () => {
    const spy = spyOn(authService, 'authenticateUser').and.returnValue(of({ authorized: true, name: 'test' }));
    const routerSpy = spyOn(router, 'navigate');
    component.loginForm.patchValue({
      username: 'test@test.com',
      password: 'password'
    });
    component.onSubmit();
    expect(spy).toHaveBeenCalled();
    expect(component.isAuthSuccess).toBeTruthy();
    expect(component.name).toBe('test');
    expect(routerSpy).toHaveBeenCalledWith(['', 'template-generater']);
  });

  it('should set errorMsg property when authentication is unsuccessful', () => {
    const spy = spyOn(authService, 'authenticateUser').and.returnValue(of({ authorized: false }));
    component.loginForm.patchValue({
      username: 'test@test.com',
      password: 'password'
    });
    component.onSubmit();
    expect(spy).toHaveBeenCalled();
    expect(component.errorMsg).toBe('Invalid Credentials');
  });
});
