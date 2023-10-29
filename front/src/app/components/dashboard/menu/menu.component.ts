import { Component, Input, OnInit } from '@angular/core';
import { EventServiceService } from 'src/app/services/event-service.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(
    private userService : UserService,
    private eventService : EventServiceService
    ) { }

  ngOnInit(): void {
    this.eventService.alteraNavbar.subscribe(m=>this.navContraida = m);
  }

  @Input() nome : string;
  @Input() username : string;

  menuItens = [
    {texto : 'Home', icone : 'pi pi-home' , selecionado : true},
    {texto : 'Financeiro', icone : 'pi pi-dollar', selecionado : false}
  ];

  navContraida : boolean;

  privada(){
    this.userService.privada().subscribe(m=>console.log(m.message));
  }

  selecionaItem(item : any) : void{
    this.menuItens.forEach(i=>i.selecionado = false);
    item.selecionado = true;
  }


}
