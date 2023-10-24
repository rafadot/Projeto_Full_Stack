import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { LoginService } from 'src/app/services/login.service';
import { ToastUtilDirective } from 'src/app/shared/toast-util.directive';

@Component({
  selector: 'app-recuperar-senha',
  templateUrl: './recuperar-senha.component.html',
  styleUrls: ['./recuperar-senha.component.css'],
  providers : [MessageService]
})
export class RecuperarSenhaComponent extends ToastUtilDirective implements OnInit {
  formModelUser : FormGroup;
  formModelCod : FormGroup;

  cadastroHabilitado = true;
  submetido : boolean = false;
  formularioCod : boolean;

  constructor(
    private router : Router,
    private loginService : LoginService,
    message : MessageService
  ) { super(message) }

  ngOnInit(): void {
    this.formularioCod = false;

    this.formModelUser = new FormGroup({
      userOrEmail : new FormControl('', Validators.required)
    });

    this.formModelCod = new FormGroup({
      emailCod : new FormControl('', Validators.required)
    });
  }

  goLogin() : void{
    this.router.navigate(['login']);
  }

  submit() : void{
    if(this.formModelUser.valid){
      const userOrEmail = this.formModelUser.get('userOrEmail').value;
      this.submetido = true;

      this.loginService.solicitaNovaSenha(userOrEmail).subscribe(m=>{
        this.toastSucess('Email enviado com sucesso');
        this.submetido = false;
        this.alteraForm();
      },(error)=>{
        this.toastErro(error.error.message);
        this.submetido = false;
      });


    }else{
      this.toastErro('Preencha o campo com email ou nome de usuário');
    }
  }

  alteraForm() : void{
    this.formularioCod = !this.formularioCod;
  }

}
