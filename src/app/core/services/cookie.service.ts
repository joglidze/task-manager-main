import { CookieService } from 'ngx-cookie-service'; 
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CookieStorageService {

  constructor(
    private cookieService: CookieService
  ) { }

  setCookie(name: string, value: string, date?:Date){
    this.cookieService.set(name,value,{
      expires: date,
      sameSite: 'Strict',
      secure: true,
      path: '/',
      domain: `${window.location.hostname}`
    })
  }
  

  getCookie(name: string){
    return this.cookieService.get(name)
  }

  deleteCookie(name: string){
    return this.cookieService.delete(name)
  }

  deleteAllCookies(){
    return this.cookieService.deleteAll()
  }
}
