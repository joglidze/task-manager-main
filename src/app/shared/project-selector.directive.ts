import { Directive, ElementRef, OnInit,Input } from '@angular/core';
import { ProjectService } from '../core/services';

@Directive({
  selector: '[projectSelector]'
})
export class ProjectSelectorDirective implements OnInit {

  @Input() dropItems?:string[]

  constructor(private elementRef:ElementRef,) {
    
   }

   ngOnInit(): void {
     const select= document.createElement('select');


  

    this.dropItems?.forEach((item:any)=>{
      const option=document.createElement('option')

      option.text=item;
      select.add(option);
      
    })
    this.elementRef.nativeElement.appendChild(select);
   }

}
