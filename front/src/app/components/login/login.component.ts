import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import {MessageService} from 'primeng/api';
import { ToastUtilDirective } from 'src/app/shared/toast-util.directive';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers : [MessageService]
})
export class LoginComponent extends ToastUtilDirective implements OnInit {

  toggleMask : boolean;

  constructor(ms : MessageService) { 
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
      this.toastSucess('Logado com sucesso!');
    }else{
      this.toastErro('Erro ao efetuar o login', 'Preencha todos os campos para realizar o login');
    }
  }
}
