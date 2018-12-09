import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ConfigService} from '../../services/config.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {


  constructor(
    private config: ConfigService,
    private router: Router) {
  }

  logout() {
    this.config.authToken = null;
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  ngOnInit() {
  }

}
