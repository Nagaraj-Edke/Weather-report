import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.warn('This is a message from Page Not Found');
    console.log(msg);
    var msg = 'hello';
    msg = 'helloq1';


  }

}
