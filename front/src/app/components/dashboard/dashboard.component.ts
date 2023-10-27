import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  navExpandida : boolean;
  classeNav : string;

  constructor() { }

  ngOnInit(): void {

    this.classeNav = 'contraida';
    this.navExpandida = false;
  }

  alteraNav() : void{
    this.navExpandida = !this.navExpandida;

    if(this.navExpandida){
      this.classeNav = 'expandida';
    }else{
      this.classeNav = 'contraida';
    }
  }

}
