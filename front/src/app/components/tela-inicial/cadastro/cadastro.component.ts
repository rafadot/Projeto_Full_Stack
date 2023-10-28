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
  styleUrls: ['./cadastro.component.css']

})
export class CadastroComponent implements OnInit {

  formModel : FormGroup;
  confirmPassword : string = '';
  password : string = '';
  user : User;
  cadastroHabilitado : boolean = true;

  constructor(
    private router : Router,
    private userService : UserService,
    private toastUtil : ToastUtilDirective
    ) {}

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
        this.toastUtil.toastErro('As senhas devem ser iguais');
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
        this.toastUtil.toastSucess('Cadastro realizado com sucesso');
        this.router.navigate(['login']);
      },(error)=>{
        console.log(error)
        this.toastUtil.toastErro(error.error.message);
      });

    }else{
      this.toastUtil.toastErro('Preencha todos os campos');
    }
  }

  senhasIgauis() : boolean{
    return this.password == this.confirmPassword;
  }

  goLogin() : void{
    this.router.navigate(['/login'])
  }

}
