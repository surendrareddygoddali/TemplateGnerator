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

  it('should return an Observable when authenticateUser is called', () => {
    const mockResponse = { authorized: true, name: 'John Doe' };
    const mockBody = { username: 'johndoe', pwd: 'password' };
    service.authenticateUser(mockBody).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const mockRequest = httpMock.expectOne('http://localhost:8081/api/authentication');
    expect(mockRequest.request.method).toBe('POST');
    expect(mockRequest.request.body).toEqual(mockBody);
    mockRequest.flush(mockResponse);
  });

  it('should return an Observable when createUser is called', () => {
    const mockResponse = { success: true };
    const mockBody = { username: 'johndoe', pwd: 'password' };
    service.createUser(mockBody).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const mockRequest = httpMock.expectOne('http://localhost:8081/api/createUser');
    expect(mockRequest.request.method).toBe('POST');
    expect(mockRequest.request.body).toEqual(mockBody);
    mockRequest.flush(mockResponse);
  });

  it('should return an Observable when resetPassword is called', () => {
    const mockResponse = { success: true };
    const mockBody = { username: 'johndoe', pwd: 'password' };
    service.resetPassword(mockBody).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const mockRequest = httpMock.expectOne('http://localhost:8081/api/resetUser');
    expect(mockRequest.request.method).toBe('POST');
    expect(mockRequest.request.body).toEqual(mockBody);
    mockRequest.flush(mockResponse);
  });

  it('should emit a new value when updateUserName is called', () => {
    const mockValue = 'new value';
    service.updateUserName(mockValue);
    service.userName$.subscribe(value => {
      expect(value).toEqual(mockValue);
    });
  });
});
