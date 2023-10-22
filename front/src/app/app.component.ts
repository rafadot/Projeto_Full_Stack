import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    private primengConfig: PrimeNGConfig,
    private router : Router
    ) {}

    ngOnInit() {
        this.primengConfig.ripple = true;
    }
}
