import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ConfigService} from './config.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  authToken: string;
  apiUrl: string;


  headers;

  constructor(
    private http: HttpClient,
    private  config: ConfigService
  ) {
    this.apiUrl = this.config.apiUrl;
    console.log(this.config.authToken);
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'multipart/form-data',
      'Access-Control-Allow-Origin': '*',
      'Authorization': this.config.authToken
    });
  }


  getUsers() {
    return this.http.get(this.config.apiUrl + 'user/get', {headers: this.headers});
  }

  createUser(firstName, lastName, email, password) {
    return this.http.post(this.config.apiUrl + 'user/create', {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password
    }, {headers: this.headers});
  }


}
