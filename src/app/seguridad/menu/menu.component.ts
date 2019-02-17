import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  public pruebas = ['1', '2','3', '4'];
  public idMenu : string;
  constructor() { }

  ngOnInit() {
  }

}
