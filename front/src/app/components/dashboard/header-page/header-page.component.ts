import { Component , OnInit } from '@angular/core';
import { EventServiceService } from 'src/app/services/event-service.service';

@Component({
  selector: 'app-header-page',
  templateUrl: './header-page.component.html',
  styleUrls: ['./header-page.component.css']
})
export class HeaderPageComponent implements OnInit {

  constructor(private eventService : EventServiceService) { }

  ngOnInit(): void {
    this.eventService.emitiAlteraNavbar(this.navContraida)
  }

  navContraida : boolean = true;
  
  alteraNav(){
    this.navContraida = !this.navContraida;
    this.eventService.emitiAlteraNavbar(this.navContraida);
  }

}
