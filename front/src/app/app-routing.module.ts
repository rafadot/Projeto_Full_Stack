import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TelaInicialComponent } from './components/tela-inicial/tela-inicial.component';
import { LoginComponent } from './components/tela-inicial/login/login.component';
import { CadastroComponent } from './components/tela-inicial/cadastro/cadastro.component';
import { RecuperarSenhaComponent } from './components/tela-inicial/recuperar-senha/recuperar-senha.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  {path:'' , component : TelaInicialComponent , children : [
      {path : 'login' , component : LoginComponent},
      {path : 'cadastro', component : CadastroComponent},
      {path : '' , component : LoginComponent},
      {path : 'recuperar-senha' , component : RecuperarSenhaComponent}
  ]},
  {path : 'dashboard' , component : DashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
