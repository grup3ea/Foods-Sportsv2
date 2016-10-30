import { Component } from '@angular/core';

@Component({
	moduleId: module.id,
	selector: 'home-cmp',
	templateUrl: 'home.component.html'
})
export class HomeComponent {
  numUsers:number=0;
  petAPI:number=0;
}
