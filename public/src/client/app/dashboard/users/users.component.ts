import { Component } from '@angular/core';
import { UserService } from '../../shared/services/user.service';

@Component({
  moduleId: module.id,
  selector: 'app-users',
  templateUrl: './users.component.html'
})
export class UsersComponent {

  constructor(private users:UserService) { }


}
