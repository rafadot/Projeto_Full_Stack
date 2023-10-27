import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { RecuperarSenhaService } from 'src/app/services/recuperar-senha.service';
import { UserService } from 'src/app/services/user.service';
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
  formModelSenha : FormGroup;
  submetido : boolean = false;
  userId : number;
  formTipo;

  static readonly TIPO_FORM_USER_EMAIL = 0;
  static readonly TIPO_FORM_CODE = 1;
  static readonly TIPO_FORM_SENHA = 2;

  constructor(
    private router : Router,
    private rsService : RecuperarSenhaService,
    message : MessageService,
    private userService : UserService
  ) { super(message) }

  ngOnInit(): void {
    this.formTipo = RecuperarSenhaComponent.TIPO_FORM_USER_EMAIL;

    this.formModelUser = new FormGroup({
      userOrEmail : new FormControl('', Validators.required)
    });

    this.formModelCod = new FormGroup({
      emailCod : new FormControl('', Validators.required)
    });

    this.formModelSenha = new FormGroup({
      senha : new FormControl('', Validators.required),
      reSenha : new FormControl('', Validators.required)
    });
  }

  goLogin() : void{
    this.router.navigate(['login']);
  }

  submit() : void{

    if(this.formTipo == RecuperarSenhaComponent.TIPO_FORM_USER_EMAIL){

      if(this.formModelUser.valid){
        const userOrEmail = this.formModelUser.get('userOrEmail').value;
        this.submetido = true;
  
        this.rsService.solicitaNovaSenha(userOrEmail).subscribe(m=>{
          this.userId = m;

          this.toastSucess('Email enviado com sucesso');
          this.submetido = false;

          this.formTipo = RecuperarSenhaComponent.TIPO_FORM_CODE;
  
        },(error)=>{
          this.toastErro(error.error.message);
          this.submetido = false;
        });
  
      }else{
        this.toastErro('Preencha o campo com email ou nome de usuário');
      }
    }

    if(this.formTipo == RecuperarSenhaComponent.TIPO_FORM_CODE){
      const emailCode = this.formModelCod.get('emailCod').value;
      const tamanhoCode = emailCode.toString().length;

      if(this.formModelCod.valid && tamanhoCode== 6){
        this.rsService.codeValido(this.userId, emailCode).subscribe(m=>{
          if(m){
            this.toastSucess('Código válido');
            this.formTipo = RecuperarSenhaComponent.TIPO_FORM_SENHA;
          }
        },(error)=>{
          this.toastErro(error.error.message)
        });
      }else{
        this.toastErro('Preencha o campo para verificação com valores válidos');
      }
    }

    if(this.formTipo == RecuperarSenhaComponent.TIPO_FORM_SENHA && this.senhasIgauis()){
      this.userService.alteraSenha(this.userId , this.formModelSenha.get('senha').value)
      .subscribe(()=>{
        this.toastSucess('Senha alterada com sucesso')

        setTimeout(() => {
          this.goLogin();
        }, 1000);
      },(error)=>{
        this.toastErro(error.error.message);
      });
    }
    
  }

  mudaForm(numero : number){
    this.formTipo = numero;
  }

  solicitaoUserId() : void{
    if(this.formModelUser.valid){
      this.rsService.retornaUserId(this.formModelUser.get('userOrEmail').value).subscribe(m=>{
        this.userId = m;
        this.formTipo = RecuperarSenhaComponent.TIPO_FORM_CODE;
      },(error)=>{
        this.toastErro(error.error.message)
      });
    }else{
        this.toastErro('Preencha o campo com email ou nome de usuário');
    }
  }

  
  senhasIgauis() : boolean {
    const senha : string = this.formModelSenha.get('senha').value;
    const reSenha : string = this.formModelSenha.get('reSenha').value;

    return senha === reSenha;
  }
}
