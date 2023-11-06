import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';

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
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RecuperarSenhaComponent } from './components/tela-inicial/recuperar-senha/recuperar-senha.component';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import { TelaInicialComponent } from './components/tela-inicial/tela-inicial.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MessageService } from 'primeng/api';
import { MenuComponent } from './components/dashboard/menu/menu.component';
import { HeaderPageComponent } from './components/dashboard/header-page/header-page.component';
import { ErrorInterceptador } from './shared/ErrorInterceptador';
import { JwtInterceptador } from './shared/JwtInterceptador';
import { FinanceiroComponent } from './components/dashboard/financeiro/financeiro.component';
import {DialogService, DynamicDialogModule} from 'primeng/dynamicdialog';
import { CriarGastoComponent } from './components/dashboard/financeiro/criar-gasto/criar-gasto.component';
import {InputNumberModule} from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import {CalendarModule} from 'primeng/calendar';
import {CheckboxModule} from 'primeng/checkbox';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { CriarCategoriaComponent } from './components/dashboard/financeiro/criar-categoria/criar-categoria.component';
import {ColorPickerModule} from 'primeng/colorpicker';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CadastroComponent,
    RecuperarSenhaComponent,
    TelaInicialComponent,
    DashboardComponent,
    MenuComponent,
    HeaderPageComponent,
    FinanceiroComponent,
    CriarGastoComponent,
    CriarCategoriaComponent,
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
    ProgressSpinnerModule,
    DynamicDialogModule,
    InputNumberModule,
    DropdownModule,
    CalendarModule,
    CheckboxModule,
    ColorPickerModule
  ],
  providers: [
    {
      provide : HTTP_INTERCEPTORS,
      useClass : ErrorInterceptador,
      multi : true
    },
    {
      provide : HTTP_INTERCEPTORS,
      useClass : JwtInterceptador,
      multi : true
    },
    {
      provide : LOCALE_ID,
      useValue : 'pt-BR'
    },
    MessageService,
    ToastUtilDirective,
    DialogService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(){
    registerLocaleData(localePt, 'pt-BR')
  }
}
