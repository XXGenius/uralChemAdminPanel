import {Component, OnInit} from '@angular/core';
import {ContainerService} from '../services/container.service';
import {ApiService} from '../services/api.service';

@Component({
  selector: 'app-dictionaries',
  templateUrl: './dictionaries.component.html',
  styleUrls: ['./dictionaries.component.scss']
})
export class DictionariesComponent implements OnInit {
  showSpinner;

  constructor(private container: ContainerService, private apiService: ApiService) {
    this.showSpinner = true;
    this.apiService.getProfiles().subscribe((res) => {
      this.container.profiles = res;
    });
    this.apiService.getMethods().subscribe((res) => {
      this.container.methods = res;
      this.showSpinner = false;
    });
  }

  ngOnInit() {
  }
}
