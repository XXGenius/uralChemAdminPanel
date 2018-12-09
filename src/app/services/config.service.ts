import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  public apiUrl = 'http://apiural.com/api/';
  public authToken = localStorage.getItem('authToken');

  constructor() {
  }
}
