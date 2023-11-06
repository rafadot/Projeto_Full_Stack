import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { ToastUtilDirective } from 'src/app/shared/toast-util.directive';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private loginService : LoginService,
    private router : Router,
    private toastUtil : ToastUtilDirective
  ) {}

  formModel : FormGroup;

  ngOnInit(): void {
    this.formModel = new FormGroup({
      username : new FormControl('' , [Validators.required]),
      password : new FormControl('', [Validators.required]),
    });
  }

  submit() {
    if(this.formModel.valid){

      const username = this.formModel.get('username').value;
      const senha = this.formModel.get('password').value;
      
      this.loginService.login(username, senha).subscribe(m=>{
        localStorage.setItem('token',m.token);

        this.toastUtil.toastSucess(m.message)
        this.router.navigate(['dashboard'])
      },(error)=>{
        this.toastUtil.toastErro(error.error.message);
      });

    }else{
      this.toastUtil.toastErro('Erro ao efetuar o login', 'Preencha todos os campos para realizar o login');
    }
  }
}
