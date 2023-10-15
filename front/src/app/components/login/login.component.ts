import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.formModel = new FormGroup({
      username : new FormControl('' , [Validators.required]),
      password : new FormControl('', [Validators.required]),
    });
  }

  get username(){
    return this.formModel.get('username')
  }

  get password(){
    return this.formModel.get('password')
  }

  formModel : FormGroup;

  submit() {
    console.log(this.username)
  }
}
