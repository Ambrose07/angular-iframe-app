import { Component, OnInit, HostListener } from '@angular/core';
import {  Observable } from 'rxjs';

@Component({
  selector: 'app-dynamic',
  templateUrl: './dynamic.component.html',
  styleUrls: ['./dynamic.component.css']
})
export class DynamicComponent implements OnInit {

  counter = 1;

  data$: Observable<any>;

  returnMessage(e){
    if (e.origin != window.location.origin) { // set your origin
      return false;
    }else{
      this.counter++;
    }
  }

  constructor() {
    
  }

  ngOnInit() {
    var iframe = document.getElementById('iframe');
    if (iframe == null) return;
    var iWindow = (<HTMLIFrameElement>iframe).contentWindow;
    iWindow.addEventListener('message',this.returnMessage.bind(this), false);
  }

  callParent(){
      window.parent.postMessage({"user":"test","data":"somedata"}, window.location.origin)
  }
 
}
