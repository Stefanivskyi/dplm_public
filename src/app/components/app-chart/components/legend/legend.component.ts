import { Sensor } from './../../../../shared/models/sensor.model';
import { Project } from '../../../../shared/models/project.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-legend',
  templateUrl: 'legend.component.html',
  styleUrls: ['./legend.component.scss']
})

export class LegendComponent  implements OnInit {

  isSelected = false;
  public _sensors: Sensor[] = [];


  @Output() sensorsChangedEvent = new EventEmitter<Sensor[]>();

  @Input() set sensor(sensors) {
    this._sensors = sensors;
  }

  clickEvent(sensor) {
   sensor.isSelected = !sensor.isSelected;

   this.sensorsChangedEvent.emit(
     this._sensors.filter(s => s.isSelected));
  }

  ngOnInit() {
  }
}
