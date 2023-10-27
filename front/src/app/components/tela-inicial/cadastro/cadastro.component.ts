import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { User } from 'src/app/model/User';
import { UserService } from 'src/app/services/user.service';
import { ToastUtilDirective } from 'src/app/shared/toast-util.directive';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
  providers : [MessageService]

})
export class CadastroComponent extends ToastUtilDirective implements OnInit {

  formModel : FormGroup;
  confirmPassword : string = '';
  password : string = '';
  user : User;
  cadastroHabilitado : boolean = true;

  constructor(
    messageService : MessageService,
    private router : Router,
    private userService : UserService
    ) { 
    super(messageService)
  }

  ngOnInit(): void {
    this.formModel = new FormGroup({
      name :  new FormControl('', Validators.required),
      username : new FormControl('', Validators.required),
      password : new FormControl('', Validators.required),
      confirmPassword : new FormControl('', Validators.required),
      email : new FormControl('',Validators.required)
    });
  }

  submit() : void{
    if(this.formModel.valid){

      if(!this.senhasIgauis()){
        this.toastErro('As senhas devem ser iguais');
        return;
      }

      this.user = {
        id : null,
        nome : this.formModel.get('name').value,
        username : this.formModel.get('username').value,
        senha : this.formModel.get('password').value,
        email : this.formModel.get('email').value
      }

      this.userService.create(this.user).subscribe(()=>{
        this.cadastroHabilitado = false;
        this.toastSucess('Cadastro realizado com sucesso');

        setTimeout(() => {
          this.goLogin();
        }, 500);
      },(error)=>{
        console.log(error)
        this.toastErro(error.error.message);
      });

    }else{
      this.toastErro('Preencha todos os campos');
    }
  }

  senhasIgauis() : boolean{
    return this.password == this.confirmPassword;
  }

  goLogin() : void{
    this.router.navigate(['/login'])
  }

}
