import {Component, OnInit} from '@angular/core';
import {ApiService} from '../services/api.service';
import {UserFormComponent} from '../forms/user-form/user-form.component';
import {MatDialog, MatDialogRef} from '@angular/material';
import {filter} from 'rxjs/operators';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  animations: [
    trigger('list', [
      state('in', style({
        opacity: 1,
        transform: 'translateX(0)'
      })),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateX(-100px)'
        }),
        animate(300)
      ]),
      transition('* => void', [
        animate(300, style({
          opacity: 0,
          transform: 'translateX(100px)'
        }))
      ]),
    ])
  ]
})
export class UsersComponent implements OnInit {
  users;
  showSpinner = false;
  userNameDialogRef: MatDialogRef<UserFormComponent>;

  constructor(private apiService: ApiService,
              private dialog: MatDialog) {
    this.getUser();
  }

  getUser() {
    this.showSpinner = true;
    this.apiService.getUsers().subscribe((res) => {
      console.log(res);
      this.users = res;
      this.showSpinner = false;
    });
  }

  openAddUserDialog() {
    this.userNameDialogRef = this.dialog.open(UserFormComponent, {
      hasBackdrop: false
    });
    this.userNameDialogRef
      .afterClosed()
      .subscribe(form => {
        console.log(form);
        this.createUser(form);
      });
  }

  ngOnInit() {
  }

  create(myForm) {

  };

  createUser(form) {
    this.apiService.createUser(form.firstName, form.lastName, form.email, form.password)
      .subscribe((res) => {
        console.log(res);
        this.users.push({id: 4, lastName: form.firstName, firstName: form.lastName, email: form.email});
      });
  }

  remove(i: number) {
    const id = this.users[i].id;
    if (confirm('Are you sure to delete: ' + this.users[i].firstName)) {
      this.apiService.deleteUser(id)
        .subscribe(
          (user) => {
            console.log(user);
          }
        );
      this.users = this.users.filter(user => user.id !== id);
    }
  }

}
