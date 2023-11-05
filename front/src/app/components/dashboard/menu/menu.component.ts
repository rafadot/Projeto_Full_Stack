import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventServiceService } from 'src/app/services/event-service.service';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(
    private userService : UserService,
    private eventService : EventServiceService,
    private loginService : LoginService,
    private router : Router
  ) { }

  navContraida : boolean;

  ngOnInit(): void {
    this.eventService.alteraNavbar.subscribe(m=>this.navContraida = m);


    //Define o item selecionado no menu
    const rotaAtual = this.router.url.split('/dashboard/')[1];

    if(!rotaAtual){
      this.menuItens[0].selecionado = true;
    }else{
      this.menuItens.forEach(item =>{
        if(item.key === rotaAtual){
          item.selecionado = true;
        }
      });
    }
    //fim
    
  }

  @Input() nome : string;
  @Input() username : string;

  menuItens = [
    {texto : 'Home', icone : 'pi pi-home' , selecionado : false, key : ''},
    {texto : 'Financeiro', icone : 'pi pi-dollar', selecionado : false, key : 'financeiro'},
  ];

  privada(){
    this.userService.privada().subscribe();
  }

  selecionaItem(item : any) : void{
    this.menuItens.forEach(i=>i.selecionado = false);
    item.selecionado = true;
    this.router.navigate([`dashboard/${item.key}`])
  }

  logout() : void{
    this.loginService.logout();
    this.router.navigate(['login'])
  }

}
