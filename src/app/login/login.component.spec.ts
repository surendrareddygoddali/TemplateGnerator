import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from './login.component';
import { AuthenticationService } from '../authentication.service';
import { of } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthenticationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule],
      declarations: [LoginComponent],
      providers: [AuthenticationService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthenticationService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty username and password', () => {
    expect(component.loginForm.value).toEqual({ username: '', password: '' });
  });

  it('should validate the form when the submit button is clicked', () => {
    spyOn(console, 'log');
    const submitButton = fixture.nativeElement.querySelector('button[type="submit"]');
    submitButton.click();
    fixture.detectChanges();
    expect(console.log).toHaveBeenCalledWith('Logging in...');
  });

  it('should call the authenticateUser method of the authentication service when the form is submitted', () => {
    const authServiceSpy = spyOn(authService, 'authenticateUser').and.returnValue(of({ authorized: true, name: 'John Doe' }));
    component.loginForm.setValue({ username: 'testuser', password: 'testpassword' });
    const submitButton = fixture.nativeElement.querySelector('button[type="submit"]');
    submitButton.click();
    expect(authServiceSpy).toHaveBeenCalledWith({ username: 'testuser', pwd: 'testpassword' });
  });

  // it('should navigate to the template-generater route when authentication is successful', () => {
  //   spyOn(component.router, 'navigate');
  //   spyOn(authService, 'authenticateUser').and.returnValue(of({ authorized: true, name: 'John Doe' }));
  //   component.loginForm.setValue({ username: 'testuser', password: 'testpassword' });
  //   const submitButton = fixture.nativeElement.querySelector('button[type="submit"]');
  //   submitButton.click();
  //   expect(component.router.navigate).toHaveBeenCalledWith(['', 'template-generater']);
  // });

  it('should display an error message when authentication fails', () => {
    spyOn(authService, 'authenticateUser').and.returnValue(of({ authorized: false, name: '' }));
    component.loginForm.setValue({ username: 'testuser', password: 'testpassword' });
    const submitButton = fixture.nativeElement.querySelector('button[type="submit"]');
    submitButton.click();
    fixture.detectChanges();
    expect(component.errorMsg).toEqual('Invalid Credentials');
  });
});

