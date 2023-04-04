import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { ListComponent } from '../list/list.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {

  lists: ListComponent[] = [];

  addList() {
    var newList = new ListComponent();
    this.lists.push(newList);
  }

  onColumnDrop(event: CdkDragDrop<any>) {
    moveItemInArray(this.lists, event.previousIndex, event.currentIndex);
  }
  // drop(event: CdkDragDrop<any>) {
  //   if (event.previousContainer === event.container) {
  //     moveItemInArray(
  //       event.container.data,
  //       event.previousIndex,
  //       event.currentIndex);
  //   } else {
  //     transferArrayItem(
  //       event.previousContainer.data,
  //       event.container.data,
  //       event.previousIndex,
  //       event.currentIndex);
  //   }
  // }
}
