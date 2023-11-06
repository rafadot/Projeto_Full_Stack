import { Component, OnInit } from '@angular/core';
import { DialogService  } from 'primeng/dynamicdialog';
import { CriarGastoComponent } from './criar-gasto/criar-gasto.component';
import { CriarCategoriaComponent } from './criar-categoria/criar-categoria.component';

@Component({
  selector: 'app-financeiro',
  templateUrl: './financeiro.component.html',
  styleUrls: ['./financeiro.component.css'],
})
export class FinanceiroComponent implements OnInit {

  constructor(public dialog : DialogService) { }

  ngOnInit(): void {
  }

  criarGasto() {
    this.dialog.open(CriarGastoComponent , {
      header : 'Adicionar gasto',
      width : '30%'
    })
  }

  criarCategoria(){
    this.dialog.open(CriarCategoriaComponent , {
      header: 'Criar categoria',
      width : '20%'
    })
  }

}
