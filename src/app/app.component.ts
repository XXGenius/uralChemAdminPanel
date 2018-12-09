import {Component} from '@angular/core';
import {ConfigService} from './services/config.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'UralChemAdmin';
  auth: boolean;

  constructor(private config: ConfigService, private router: Router) {
    console.log(config.authToken);
    this.auth = config.authToken !== null;
  }

  logout() {
    this.auth = false;
    this.config.authToken = null;
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
