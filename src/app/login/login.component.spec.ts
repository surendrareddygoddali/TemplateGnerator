import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoginComponent } from './login.component';
import { AuthenticationService } from '../authentication.service';
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
        ReactiveFormsModule,
        HttpClientTestingModule
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

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty values', () => {
    expect(component.loginForm.value).toEqual({username: '', password: ''});
  });

  it('should set isAuthSuccess to true when authentication is successful', () => {
    const data = {
      email: 'test@test.com',
      password: 'testpassword'
    };

    const returnValue: any = {
      "authorized": true, 
      "name": 'Test User'
    }
    spyOn(authService, 'authenticateUser').and.returnValue(returnValue);
    component.onSubmit();
    expect(component.isAuthSuccess).toBeTrue();
  });

  it('should update the user name when authentication is successful', () => {
    const data = {
      email: 'test@test.com',
      password: 'testpassword'
    };
    const returnValue: any = {
      "authorized": true, 
      "name": 'Test User'
    }
    spyOn(authService, 'authenticateUser').and.returnValue(returnValue);
    component.onSubmit();
    expect(authService.updateUserName).toHaveBeenCalledWith('Test User');
  });

  it('should navigate to the template-generater page when authentication is successful', () => {
    const data = {
      email: 'test@test.com',
      password: 'testpassword'
    };
    const returnValue: any = {
      "authorized": true, 
      "name": 'Test User'
    }
    spyOn(authService, 'authenticateUser').and.returnValue(returnValue);
    spyOn(router, 'navigate');
    component.onSubmit();
    expect(router.navigate).toHaveBeenCalledWith(['', 'template-generater']);
  });

  it('should set the error message when authentication fails', () => {
    const data = {
      email: 'test@test.com',
      password: 'testpassword'
    };
    const returnValue: any = {
      "authorized": true
    }
    spyOn(authService, 'authenticateUser').and.returnValue(returnValue);
    component.onSubmit();
    expect(component.errorMsg).toEqual('Invalid Credentials');
  });
});
