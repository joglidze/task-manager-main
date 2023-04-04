import { ProjectService } from './../../core/services/project.service';
import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { BoardService } from 'src/app/core/services/board.service';
import { takeUntil } from 'rxjs';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services';
import {MatMenuTrigger} from '@angular/material/menu';
import { ProjectFacadeService } from 'src/app/facades/project.service';
import { IProject } from 'src/app/core/interfaces/project';



// import { Board } from 'src/app/models/board.model';
// import { Column } from 'src/app/models/column.model';
@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  boards$ = this.boardService.getboard();
  user?: any;
  currentBoard:any;
  currentBoardId:any;
  board:any
  projectColor:any;

  @ViewChild('menuTrigger') menuTrigger?: MatMenuTrigger;
  
  constructor(
    private boardService:BoardService,
    private userServ: AuthService,
    private route: Router,
    private projectFacade: ProjectFacadeService,
  ) { }

  ngOnInit(): void {
    this.boards$.subscribe(res=>{
      
    })
    const firstLetters = this.userServ.getUser()?.firstName.charAt(0).toUpperCase()+'.'+this.userServ.getUser()?.lastName.charAt(0).toUpperCase()
    this.user= firstLetters
  }
  get project(): IProject {
   
    return this.projectFacade.getProject();
  }

  getStyle(background: string) {
    if (background.startsWith('http')) {
      return { 'background-image': `url('${background}')` };
    } else if (background.startsWith('#')) {
      return { 'background-color': background };
    } else {
      return {};
    }
  }

  getCurrentBoard(id:number){
    this.boardService.getTarBoard(id).subscribe(res=>{
      this.currentBoardId = res.id;
      this.currentBoard=res.name;
  

    })
  }


  showBoard(project:any){
    const id = project.id;
   
    this.boardService.getTarBoard(id).subscribe(res=>{
      
      this.board=res;
      this.board= JSON.stringify(this.board)
     
      
    })
  }


}
