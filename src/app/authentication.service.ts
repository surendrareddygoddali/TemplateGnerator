import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  
  private userName = new BehaviorSubject<string>('initial value');
  
  private loginiUrl = 'http://localhost:8081/api/authentication';
  private createUserUrl = 'http://localhost:8081/api/registration';
  private resetPasswordUrl = 'http://localhost:8081/api/resetPassword';

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin':'*'
  });

  constructor(private http: HttpClient) { }


  get userName$() {
    return this.userName.asObservable();
  }

  updateUserName(newValue: string) {
    this.userName.next(newValue);
  }

  authenticateUser(body: any): Observable<any> {
    return this.http.post<any>(this.loginiUrl, body, { headers: this.headers });
  }

  createUser(body: any): Observable<any> {
    return this.http.post<any>(this.createUserUrl, body, { headers: this.headers });
  }

  resetPassword(body: any): Observable<any> {
    return this.http.post<any>(this.resetPasswordUrl, body, { headers: this.headers });
  }
}
