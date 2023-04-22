import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AuthenticationService } from './authentication.service';

describe('AuthenticationService', () => {
  let service: AuthenticationService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthenticationService]
    });
    service = TestBed.inject(AuthenticationService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should update the userName value', () => {
    const newValue = 'test';
    service.updateUserName(newValue);
    service.userName$.subscribe((value) => {
      expect(value).toBe(newValue);
    });
  });

  it('should authenticate the user', () => {
    const mockResponse = { success: true };
    const mockBody = { username: 'test', password: 'test' };
    service.authenticateUser(mockBody).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });
    const req = httpMock.expectOne('http://localhost:8081/api/authentication');
    expect(req.request.method).toEqual('POST');
    req.flush(mockResponse);
  });

  it('should create a user', () => {
    const mockResponse = { success: true };
    const mockBody = { username: 'test', password: 'test' };
    service.createUser(mockBody).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });
    const req = httpMock.expectOne('http://localhost:8081/api/registration');
    expect(req.request.method).toEqual('POST');
    req.flush(mockResponse);
  });

  it('should reset a password', () => {
    const mockResponse = { success: true };
    const mockBody = { username: 'test', password: 'test' };
    service.resetPassword(mockBody).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });
    const req = httpMock.expectOne('http://localhost:8081/api/resetPassword');
    expect(req.request.method).toEqual('POST');
    req.flush(mockResponse);
  });
});
