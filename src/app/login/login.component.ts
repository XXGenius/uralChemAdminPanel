import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  showSpinner = false;
  email = new FormControl();
  password = new FormControl();

  constructor(private router: Router) {
  }

  login(): void {
    if (this.email.value === 'admin@uralchem.com' && this.password.value === 'admin') {
      this.router.navigate(['user']);
    } else {
      this.showSpinner = true;
    }
  }

  ngOnInit() {
  }

}
