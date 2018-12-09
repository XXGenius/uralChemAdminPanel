import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl} from '@angular/forms';
import {AuthService} from '../services/auth.service';
import {ConfigService} from '../services/config.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  showSpinner = false;
  email = new FormControl();
  password = new FormControl();
  error: string;

  emailPattern = '[A-Za-z0-9._%+-]{1,}@[a-zA-Z]{1,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{1,})';

  constructor(private router: Router, private auth: AuthService, private config: ConfigService) {
    const token = localStorage.getItem('authToken');
    if (token) {
      this.router.navigate(['/questionnaires']);
    }
  }

  login(): void {
    this.showSpinner = true;
    this.auth.authenticate(this.email.value, this.password.value)
      .subscribe((res: any) => {
          console.log(res);
          localStorage.setItem('authToken', res.authToken);
          this.showSpinner = false;
          this.router.navigate(['/questionnaires']);
        },
        (error) => {
          console.log(error.error);
          this.error = error.error.message;
          this.showSpinner = false;
        });
  }


  focusInput() {
    this.error = null;
  }

  ngOnInit() {
  }

}
