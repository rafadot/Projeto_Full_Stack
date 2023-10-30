import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = `${environment.API_URL}/login`

  constructor(private http : HttpClient) { }

  login(username : string, senha : string) : Observable<any>{
    const body = {usernameOrEmail : username , senha : senha}
    return this.http.post<any>(this.apiUrl, body);
  }

  estaAutenticado(token : string) : Observable<boolean>{
    return this.http.get<boolean>(`${this.apiUrl}?token=${token}`);
  }

  logout(){
    localStorage.removeItem('token');
  }
}
