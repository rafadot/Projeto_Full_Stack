import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recuperar-senha',
  templateUrl: './recuperar-senha.component.html',
  styleUrls: ['./recuperar-senha.component.css']
})
export class RecuperarSenhaComponent implements OnInit {
  formModel : FormGroup;
  cadastroHabilitado = true;

  constructor(
    private router : Router
  ) { }

  ngOnInit(): void {
    this.formModel = new FormGroup({
      userOrEmail : new FormControl('', Validators.required)
    });
  }

  goLogin() : void{
    this.router.navigate(['login']);
  }

  submit() : void{

  }

}
