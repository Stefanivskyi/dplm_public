import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-templates-modal',
  templateUrl: 'app-templates-modal.component.html',
  styleUrls: ['./app-templates-modal.component.scss']
})

export class AppTemplatesModalComponent {
  selectedCategory = '';
  selectedType = '';
  constructor() { }

}
