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
    const body = {username : username , senha : senha}
    return this.http.post<any>(this.apiUrl, body);
  }

  solicitaNovaSenha(userOrEmail : string) : Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/solicita-senha?userOrEmail=${userOrEmail}`)
  }
}
