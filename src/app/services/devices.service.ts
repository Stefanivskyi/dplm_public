import { Injectable, OnInit } from '@angular/core';
import { EventEmitter } from '@angular/core';

import { Observable } from 'rxjs';
import { map, filter, scan } from 'rxjs/operators';

@Injectable()
export class DevicesTreeService {
  private showTree: boolean;
  private treeNode: object = {};

  onClickEditBtn: EventEmitter<Boolean> = new EventEmitter();
  onClickTreeNode: EventEmitter<Object> = new EventEmitter();


  public treeCard(a, data) {
    console.log(data)
    this.showTree = a;
    this.onClickEditBtn.emit(this.showTree);
    console.log(a);
  }

}
