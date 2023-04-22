import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {

  private templateDetails = new BehaviorSubject<any>([{"themeName":"1"},{"themeName":"2"}]);
  private templateSaved = new BehaviorSubject<boolean>(true);

  private saveThemeUrl = 'http://localhost:8081/api/createTheme';
  private getThemesUrl = 'http://localhost:8081/api/getThemes';

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin':'*'
  });

  constructor(private http: HttpClient) { }

  get templateDetails$() {
    return this.templateDetails.asObservable();
  }

  updateTemplateDetails(newValue: any) {
    this.templateDetails.next(newValue);
  }

  get getTemplateSaved$() {
    return this.templateSaved.asObservable();
  }

  updateTemplateSaved(newValue: boolean) {
    this.templateSaved.next(newValue);
  }
  
  saveTheme(body: any): Observable<any> {
    return this.http.post<any>(this.saveThemeUrl, body, { headers: this.headers });
  }

  getThemes(): Observable<any> {
    return this.http.get(this.getThemesUrl);
  }
}
