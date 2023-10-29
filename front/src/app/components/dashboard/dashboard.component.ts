import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { EventServiceService } from 'src/app/services/event-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private eventService : EventServiceService,
    private cdr : ChangeDetectorRef
    ) { }

  ngOnInit(): void {
    this.eventService.alteraNavbar.subscribe(m=>{
      this.navContraida = m;
      this.cdr.detectChanges();
    });
  }

  nome : string = 'Rafael Aires';
  username : string = 'rafadot';
  navContraida : boolean;
}
