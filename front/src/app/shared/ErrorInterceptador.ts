import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from 'rxjs/operators';
import { ToastUtilDirective } from "./toast-util.directive";

@Injectable()
export class ErrorInterceptador implements HttpInterceptor {
    constructor(private toastUtil : ToastUtilDirective){

    }
    
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
          catchError((error: HttpErrorResponse) => {

            if (error.status === 403) {
              this.toastUtil.toastErro('Não autorizado')
            } 
    
            return throwError(error);
          })
        );
      }
}