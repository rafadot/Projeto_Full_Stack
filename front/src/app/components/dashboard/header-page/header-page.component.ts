import { Component , OnInit } from '@angular/core';
import { EventServiceService } from 'src/app/services/event-service.service';

@Component({
  selector: 'app-header-page',
  templateUrl: './header-page.component.html',
  styleUrls: ['./header-page.component.css']
})
export class HeaderPageComponent implements OnInit {

  navContraida : boolean;

  constructor(private eventService : EventServiceService) { }

  ngOnInit(): void {

    const estadoNavbar = localStorage.getItem('navContraida')

    if(estadoNavbar){
      if(estadoNavbar === 'S'){
        this.navContraida = true;
      }else{
        this.navContraida = false;
      }
    }

    this.eventService.emitiAlteraNavbar(this.navContraida)
  }
  
  alteraNav(){
    this.navContraida = !this.navContraida;
    this.eventService.emitiAlteraNavbar(this.navContraida);
    localStorage.setItem('navContraida' , this.navContraida ? 'S' : 'N')
  }

}
