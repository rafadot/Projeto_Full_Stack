import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoriaGasto } from 'src/app/model/CategoriaGasto';
import { GastoService } from 'src/app/services/gasto.service';
import { ToastUtilDirective } from 'src/app/shared/toast-util.directive';

@Component({
  selector: 'app-criar-categoria',
  templateUrl: './criar-categoria.component.html',
  styleUrls: ['./criar-categoria.component.css']
})
export class CriarCategoriaComponent implements OnInit {

  formModel : FormGroup

  constructor(
    public gastoSerive : GastoService,
    public toast : ToastUtilDirective
  ) { }

  ngOnInit(): void {
    this.formModel = new FormGroup({
      nome : new FormControl('' , Validators.required),
      cor : new FormControl('#ffffff' , Validators.required)
    });
  }

  submit(){
    if(this.formModel.valid){
      const categoria : CategoriaGasto = {
        nome : this.formModel.get('nome').value,
        cor : this.formModel.get('cor').value,
      }

      this.gastoSerive.criarCategoria(categoria).subscribe(()=>{
        this.toast.toastSucess('Criado com sucesso')
      },(error)=>{
        this.toast.toastErro(error.error.message)
      });
    }
  }

}
