import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import {MessageService} from 'primeng/api';
import { LoginService } from 'src/app/services/login.service';
import { ToastUtilDirective } from 'src/app/shared/toast-util.directive';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers : [MessageService]
})
export class LoginComponent extends ToastUtilDirective implements OnInit {

  toggleMask : boolean;

  constructor(ms : MessageService,
    private loginService : LoginService,
    private router : Router
    ) { 
    super(ms);
  }

  ngOnInit(): void {
    this.formModel = new FormGroup({
      username : new FormControl('' , [Validators.required]),
      password : new FormControl('', [Validators.required]),
    });
  }

  formModel : FormGroup;

  submit() {
    if(this.formModel.valid){

      const username = this.formModel.get('username').value;
      const senha = this.formModel.get('password').value;
      
      this.loginService.login(username, senha).subscribe(m=>{
        this.toastSucess(m.message)
        setInterval(()=>{
          this.router.navigate(['dashboard'])
        }, 500)
      },(error)=>{
        this.toastErro(error.error.message);
      });

    }else{
      this.toastErro('Erro ao efetuar o login', 'Preencha todos os campos para realizar o login');
    }
  }
}
