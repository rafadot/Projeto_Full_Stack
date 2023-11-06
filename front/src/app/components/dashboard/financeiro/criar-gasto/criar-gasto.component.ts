import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { CategoriaGasto } from 'src/app/model/CategoriaGasto';
import { GastoService } from 'src/app/services/gasto.service';
import { ToastUtilDirective } from 'src/app/shared/toast-util.directive';

@Component({
  selector: 'app-criar-gasto',
  templateUrl: './criar-gasto.component.html',
  styleUrls: ['./criar-gasto.component.css']
})
export class CriarGastoComponent implements OnInit {

  constructor(
    public refDialog : DynamicDialogRef, 
    public toast : ToastUtilDirective,
    public gastoService : GastoService
  ) { }

  formModel : FormGroup;
  categoria : CategoriaGasto[];
  opcoesTipo = [];

  ngOnInit(): void {
    this.formModel = new FormGroup({
      nome : new FormControl('', Validators.required),
      tipo : new FormControl('', Validators.required),
      valor : new FormControl('', Validators.required),
      checked : new FormControl(true),
      data : new FormControl({ value: formatDate(new Date(), 'yyyy-MM-dd' , 'pt-BR'), disabled: true }, Validators.required)
    });
    
    this.gastoService.listaCategorias().subscribe(m=>{
      this.categoria = m;

      if(this.categoria.length == 0){
        this.opcoesTipo.push({label : 'Nenhum', value : 'nenhum'})
      }else{
        this.categoria.forEach(c=>{
          this.opcoesTipo.push({label : c.nome, value : c.nome});
          console.log(c)
          console.log("for")
        });
      }
    });
    
  }

  habilitaData(){
    const checked = this.formModel.get('checked').value
    const data = this.formModel.get('data');

    if(checked){
      data.setValue(formatDate(new Date(), 'yyyy-MM-dd' , 'pt-BR'))
      data.disable();
    }else{
      data.enable();
    }
  }

  submit(){
    const valor = this.formModel.get('valor').value;
    console.log(valor)

    if(this.formModel.valid && valor > 0){
      
      this.toast.toastSucess('Salvo')
      this.refDialog.close();
    }else{
      this.toast.toastErro('Preencha os campos')
    }
  }
}
