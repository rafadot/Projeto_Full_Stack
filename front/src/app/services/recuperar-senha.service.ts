import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecuperarSenhaService {
  private apiUrl = `${environment.API_URL}/recuperar-senha`

  constructor(private http : HttpClient) { }

  solicitaNovaSenha(userOrEmail : string) : Observable<number>{
    return this.http.get<number>(`${this.apiUrl}/solicita-senha?userOrEmail=${userOrEmail}`)
  }

  codeValido(userId : number ,code : number) : Observable<boolean>{
    return this.http.get<boolean>(`${this.apiUrl}/valida-codigo?userId=${userId}&code=${code}`)
  }

  retornaUserId(userOrEmail : string) : Observable<number>{
    return this.http.get<number>(`${this.apiUrl}/retorna-id?userOrEmail=${userOrEmail}`)
  }

  alteraSenha(userId : number, senha : string, code : number) : Observable<any>{
    const data = {
      userId : userId,
      senha : senha,
      code : code
    }

    console.log(data)
    return this.http.put<any>(`${this.apiUrl}/senha?` , data);
  }
}
