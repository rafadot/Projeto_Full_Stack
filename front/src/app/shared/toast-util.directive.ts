import { Directive } from '@angular/core';
import { MessageService } from 'primeng/api';

@Directive({
  selector: '[appToastUtil]',
  providers: [MessageService]
})
export class ToastUtilDirective {

  constructor(private messageService : MessageService) { }

  toastErro(mensage : string, descricao : string = '') : void{
    this.messageService.clear();
    this.messageService.add({severity: 'error', summary:mensage, detail:descricao});
  }

  toastSucess(mensage : string, descricao : string = '') : void{
    this.messageService.clear();
    this.messageService.add({severity: 'success', summary:mensage, detail:descricao});
  }

}
