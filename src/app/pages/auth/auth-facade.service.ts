import { Injectable } from '@angular/core';
import { Subject, timestamp } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthFacadeService {

  errors: Subject<any> = new Subject<string>();
  error$ = this.errors.asObservable()

  setErrors(error : string){
  
      this.errors.next(error)
      setTimeout(()=>{
        this.errors.next(null)

      }, 3000)

   
  }

  destroy(){
    this.errors.next(null)
  }


}
