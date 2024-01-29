import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RealtimeService } from '../../services/realtime.service';

@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  constructor(private realtime: RealtimeService) {
  }

  ngOnInit() {
  }
}
