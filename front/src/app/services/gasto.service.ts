import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CategoriaGasto } from '../model/CategoriaGasto';

@Injectable({
  providedIn: 'root'
})
export class GastoService {
  private apiURL = `${environment.API_URL}/gasto`

  constructor(private http : HttpClient) { }

  criarCategoria(categoria : CategoriaGasto) : Observable<CategoriaGasto> {
    return this.http.post<CategoriaGasto>(`${this.apiURL}/categoria` , categoria)
  }

  listaCategorias() : Observable<CategoriaGasto[]>{
    return this.http.get<CategoriaGasto[]>(`${this.apiURL}/categoria`)
  }
}
