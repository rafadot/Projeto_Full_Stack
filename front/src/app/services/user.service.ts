import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `${environment.API_URL}/user` 

  constructor(private http : HttpClient) { }

  getAll() : Observable<User[]>{
    return this.http.get<User[]>(this.apiUrl);
  }

  create(user : User) : Observable<User>{
    return this.http.post<User>(this.apiUrl, user);
  }

  alteraSenha(userId : number, senha : string) : Observable<any>{
    const data = {
      userId : userId,
      senha : senha
    }
    return this.http.put<any>(`${this.apiUrl}/senha?` , data);
  }
}
