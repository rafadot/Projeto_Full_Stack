import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventServiceService {

  constructor() { }

  alteraNavbar = new Subject<boolean>();

  emitiAlteraNavbar(navContraida : boolean){
    this.alteraNavbar.next(navContraida);
  }
  
}
