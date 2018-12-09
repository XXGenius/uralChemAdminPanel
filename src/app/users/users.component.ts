import {Component, OnInit} from '@angular/core';
import {ApiService} from '../services/api.service';
import {UserFormComponent} from '../forms/user-form/user-form.component';
import {MatDialog, MatDialogRef} from '@angular/material';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
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

  createUser(form) {
    this.showSpinner = true;
    this.apiService.createUser(form.firstName, form.lastName, form.email, form.password)
      .subscribe((res) => {
        console.log(res);
        this.showSpinner = false;
        this.getUser();
      });
  }

}
