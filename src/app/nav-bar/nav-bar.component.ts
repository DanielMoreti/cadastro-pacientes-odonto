import { Component, OnInit, ViewChild } from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  @ViewChild('sidenav') sidenav: MatSidenav;

  opened: boolean;

  constructor() { }

  ngOnInit() {
  }

  clickHandler() {
    this.sidenav.close();
  }
}
