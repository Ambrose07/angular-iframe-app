import { Component,ComponentRef,AfterViewInit,ViewContainerRef, ComponentFactoryResolver, OnDestroy, OnInit,ViewChild,ElementRef,HostListener } from '@angular/core';
import { Subject } from 'rxjs';
import { UserService } from '../user.service';
import { AuthenticationService } from '../authentication.service';
import { DynamicComponent } from '../dynamic/dynamic.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements AfterViewInit, OnDestroy, OnInit {
    counter = 1;
    loading = false;
    data$: Subject<string> = new Subject();
    @ViewChild('iframe', {static: false}) iframe: ElementRef;
    doc: any;
    compRef: ComponentRef<DynamicComponent>;


    constructor(private vcRef: ViewContainerRef,
      private resolver: ComponentFactoryResolver,
      private authenticationService: AuthenticationService, 
      private userService: UserService) {
      
     }

    ngOnInit() {
        this.loading = true;
    }

    ngAfterViewInit() {
      this.onLoad();
      this.createComponent();
    }
  
    ngOnDestroy() {
      if(this.compRef) {
        //this.compRef.changeDetectorRef.detach();
        this.compRef.destroy();
      }
    }

    createComponent() {
      const compFactory = this.resolver.resolveComponentFactory(DynamicComponent);
      this.compRef = this.vcRef.createComponent(compFactory);
      
      this.doc.body.appendChild(this.compRef.location.nativeElement);

      this.compRef.changeDetectorRef.detectChanges();
    }
  
    onLoad() {
      this.doc = this.iframe.nativeElement.contentDocument || this.iframe.nativeElement.contentWindow;
    }
    
    @HostListener('window:message', ['$event'])
      onMessage(e) {
        if (e.origin != window.location.origin) { // set your origin
          return false;
        }else{
          this.counter++;
        }
      }

    callIframe(){
      //this.iframe.nativeElement.contentWindow.postMessage({"user":"test","data":"somedata"}, window.location.origin)
          var iframe = document.getElementById('iframe');
        if (iframe == null) return;
        var iWindow = (<HTMLIFrameElement>iframe).contentWindow;

        iWindow.postMessage({"user":"test","data":"somedata"}, window.location.origin);
    }

}
