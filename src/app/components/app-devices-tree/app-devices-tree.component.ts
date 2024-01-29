import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DevicesTreeService } from './../../services/devices.service';
import { ComponentsModule } from './../../shared/modules/components.module';


@Component({
  selector: 'app-devices-tree',
  templateUrl: 'app-devices-tree.component.html',
  styleUrls: ['./app-devices-tree.component.scss']
})
export class AppDevicesTreeComponent {
  public show = false;

  constructor(private devicesTreeService: DevicesTreeService) {
    this.devicesTreeService.onClickEditBtn.subscribe(data => {
      return console.log(this.show = data)
  });
  }

  openTree(a) {
    this.show = a;
  }
}
