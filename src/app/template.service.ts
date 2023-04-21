import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {

  private saveThemeUrl = 'http://localhost:8081/api/createTheme';
  private getThemesUrl = 'http://localhost:8081/api/getThemes';

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin':'*'
  });

  constructor(private http: HttpClient) { }

  saveTheme(body: any): Observable<any> {
    return this.http.post<any>(this.saveThemeUrl, body, { headers: this.headers });
  }

  getThemes(): Observable<any> {
    return this.http.get(this.getThemesUrl);
  }
}
