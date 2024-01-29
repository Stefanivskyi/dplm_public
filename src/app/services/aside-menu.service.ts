import { Injectable, OnInit } from '@angular/core';
import { EventEmitter } from '@angular/core';

import { Observable } from 'rxjs';
import { map, filter, scan } from 'rxjs/operators';

@Injectable()
export class AsideMenuService {
  private pairedDevicesData: object = {};
  private stockData: object = {};
  private treeNode: object = {};


  onClickFromPairedDevices: EventEmitter<Object> = new EventEmitter();
  onClickFromStock: EventEmitter<Object> = new EventEmitter();
  onClickTreeNode: EventEmitter<Object> = new EventEmitter();


  public getAsidePairedDevices(a) {
    this.pairedDevicesData = a;
    this.onClickFromPairedDevices.emit(this.pairedDevicesData);
  };

  public getAsideStock(a) {
    this.stockData = a;
    this.onClickFromStock.emit(this.stockData);
  };

  public getTreeNode(a) {
    this.treeNode = a;
    this.onClickTreeNode.emit(this.treeNode);
  }
}
