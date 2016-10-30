import {Component, OnInit, OnDestroy} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';

import {UserService} from '../../../shared/services/user.service';
import {User} from '../../../shared/classes/user';

@Component({
    moduleId: module.id,
    selector: 'user-edit',
    templateUrl: './user-edit.component.html'
})
export class UserEditComponent implements OnInit, OnDestroy {
    userForm: FormGroup;
    private user_id: string;
    private user: User;
    private isNew = true;
    private subscription: Subscription;

    constructor(private route: ActivatedRoute,
                private userService: UserService,
                private router: Router) {
    }

    ngOnInit() {
        this.userForm = new FormGroup({
            name: new FormControl('', Validators.required),
            username: new FormControl('', Validators.required),
            password: new FormControl(''),
            profile: new FormControl('user', Validators.required),
        });

        this.subscription = this.route.params.subscribe(
            (params: any) => {
                if (params.hasOwnProperty('id')) {
                    this.isNew = false;
                    this.user_id = params['id'];
                    this.userService.getUser(this.user_id).subscribe(
                        data => {
                            this.user = data;
                            this.setValues();
                        }
                    );
                } else {
                    this.isNew = true;
                    this.user = null;
                }
            }
        );
    }

    onSubmit() {
        const newUser: User = this.userForm.value;
        if (this.isNew) {
            this.userService.createUser(newUser).subscribe(
                data => this.router.navigate(['/dashboard', 'users', data._id]),
                error => console.log(error)
            );
        } else {
            newUser._id = this.user_id;
            this.userService.saveUser(newUser).subscribe(
                data => this.router.navigate(['/dashboard', 'users', data._id]),
                error => console.log(error)
            );
        }
    }


    onCancel() {
        this.navigateBack();
    }

    setValues() {
        (<FormControl>this.userForm.controls['name']).setValue(this.user.name);
        (<FormControl>this.userForm.controls['username']).setValue(this.user.username);
        (<FormControl>this.userForm.controls['profile']).setValue(this.user.profile);
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    private navigateBack() {
        this.router.navigate(['/dashboard', 'users']);
    }
}
