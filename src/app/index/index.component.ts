import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfigService} from '../services/config.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  constructor(activatedRoute: ActivatedRoute,
              router: Router,
              private config: ConfigService) {
    if (config.authToken) {
      router.navigate(['/questionnaires']);
    } else {
      router.navigate(['/login']);
    }
  }

  ngOnInit() {
  }

}
