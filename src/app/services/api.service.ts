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

  // users
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

  deleteUser(id) {
    return this.http.post(this.config.apiUrl + 'user/delete/' + id, null, {headers: this.headers});
  }


  // profiles

  getProfiles() {
    return this.http.get(this.config.apiUrl + 'profile/get', {headers: this.headers});
  }

  createProfile(name) {
    return this.http.post(this.config.apiUrl + 'profile/create', {
      name: name,
    }, {headers: this.headers});
  }

  updateProfile(name, id) {
    return this.http.post(this.config.apiUrl + 'profile/update/' + id, {
      name: name,
    }, {headers: this.headers});
  }

  deleteProfile(id) {
    return this.http.post(this.config.apiUrl + 'profile/delete/' + id, null, {headers: this.headers});
  }

  // products

  getBranches() {
    return this.http.get(this.config.apiUrl + 'branch/get-all', {headers: this.headers});
  }

  createBranch(name, profile_id) {
    return this.http.post(this.config.apiUrl + 'branch/create', {
      name: name,
      profile_id: profile_id
    }, {headers: this.headers});
  }

  updateBranch(name, profile_id, id) {
    return this.http.post(this.config.apiUrl + 'branch/update/' + id, {
      name: name,
      profile_id: profile_id
    }, {headers: this.headers});
  }

  deleteBranch(id) {
    return this.http.post(this.config.apiUrl + 'branch/delete/' + id, null, {headers: this.headers});
  }

  // crops

  getCrops() {
    return this.http.get(this.config.apiUrl + 'crop/get-all', {headers: this.headers});
  }

  createCrop(name, profile_id) {
    return this.http.post(this.config.apiUrl + 'crop/create', {
      name: name,
      profile_id: profile_id
    }, {headers: this.headers});
  }

  updateCrop(name, profile_id, id) {
    return this.http.post(this.config.apiUrl + 'crop/update/' + id, {
      name: name,
      profile_id: profile_id
    }, {headers: this.headers});
  }

  deleteCrop(id) {
    return this.http.post(this.config.apiUrl + 'crop/delete/' + id, null, {headers: this.headers});
  }

  // products

  getProducts() {
    return this.http.get(this.config.apiUrl + 'product/get-all', {headers: this.headers});
  }

  createProduct(name, profile_id) {
    return this.http.post(this.config.apiUrl + 'product/create', {
      name: name,
      profile_id: profile_id
    }, {headers: this.headers});
  }

  updateProduct(name, profile_id, id) {
    return this.http.post(this.config.apiUrl + 'product/update/' + id, {
      name: name,
      profile_id: profile_id
    }, {headers: this.headers});
  }

  deleteProduct(id) {
    return this.http.post(this.config.apiUrl + 'product/delete/' + id, null, {headers: this.headers});
  }

  // categories

  getCategories() {
    return this.http.get(this.config.apiUrl + 'category/get-all', {headers: this.headers});
  }

  createCategory(name) {
    return this.http.post(this.config.apiUrl + 'category/create', {
      name: name,
    }, {headers: this.headers});
  }

  updateCategory(name,  id) {
    return this.http.post(this.config.apiUrl + 'category/update/' + id, {
      name: name,
    }, {headers: this.headers});
  }

  deleteCategory(id) {
    return this.http.post(this.config.apiUrl + 'category/delete/' + id, null, {headers: this.headers});
  }
}
