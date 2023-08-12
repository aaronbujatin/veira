import { Component } from '@angular/core';
import * as Aos from 'aos';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'fe-veira';
  ngOnInit(): void {
    initFlowbite();
    Aos.init();
  }
}
