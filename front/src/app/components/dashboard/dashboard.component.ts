import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/User';
import { EventServiceService } from 'src/app/services/event-service.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private eventService : EventServiceService,
    private cdr : ChangeDetectorRef,
    private userService : UserService
    ) { }

  ngOnInit(): void {

    this.eventService.alteraNavbar.subscribe(m=>{
      this.navContraida = m;
      this.cdr.detectChanges();
    });

    this.userService.userLogado().subscribe(m=>{
      this.user = m;
    });

  }

  user = new User();
  navContraida : boolean;

}