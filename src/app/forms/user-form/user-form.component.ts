import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  form: FormGroup;
  error: string;

  emailPattern = '[A-Za-z0-9._%+-]{1,}@[a-zA-Z]{1,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{1,})';

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<UserFormComponent>
  ) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      firstName: new FormControl(),
      lastName: new FormControl(),
      email: new FormControl(),
      password: new FormControl(),
      password2: new FormControl()
    });
  }

  submit(form) {
    console.log(form.value.password);
    if (form.value.password === form.value.password2) {
      this.dialogRef.close(form.value);
    } else {
      this.error = 'Пароли не совпадают';
    }
  }

}
