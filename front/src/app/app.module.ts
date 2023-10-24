import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { LoginComponent } from './components/tela-inicial/login/login.component';
import { CadastroComponent } from './components/tela-inicial/cadastro/cadastro.component';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {FormsModule , ReactiveFormsModule} from '@angular/forms'
import {ToastModule} from 'primeng/toast';
import { ToastUtilDirective } from './shared/toast-util.directive';
import {PasswordModule} from 'primeng/password';
import { HttpClientModule } from '@angular/common/http';
import { RecuperarSenhaComponent } from './components/tela-inicial/recuperar-senha/recuperar-senha.component';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import { TelaInicialComponent } from './components/tela-inicial/tela-inicial.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CadastroComponent,
    ToastUtilDirective,
    RecuperarSenhaComponent,
    TelaInicialComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    InputTextModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    PasswordModule,
    HttpClientModule,
    ProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
