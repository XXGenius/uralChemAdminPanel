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

  // companies

  getCompanies() {
    return this.http.get(this.config.apiUrl + 'company/get-all', {headers: this.headers});
  }

  createCompany(name) {
    return this.http.post(this.config.apiUrl + 'company/create', {
      name: name,
    }, {headers: this.headers});
  }

  updateCompany(name,  id) {
    return this.http.post(this.config.apiUrl + 'company/update/' + id, {
      name: name,
    }, {headers: this.headers});
  }

  deleteCompany(id) {
    return this.http.post(this.config.apiUrl + 'company/delete/' + id, null, {headers: this.headers});
  }

  // goals

  getGoals() {
    return this.http.get(this.config.apiUrl + 'goal/get-all', {headers: this.headers});
  }

  createGoal(name) {
    return this.http.post(this.config.apiUrl + 'goal/create', {
      name: name,
    }, {headers: this.headers});
  }

  updateGoal(name,  id) {
    return this.http.post(this.config.apiUrl + 'goal/update/' + id, {
      name: name,
    }, {headers: this.headers});
  }

  deleteGoal(id) {
    return this.http.post(this.config.apiUrl + 'goal/delete/' + id, null, {headers: this.headers});
  }

  // posts

  getPosts() {
    return this.http.get(this.config.apiUrl + 'post/get-all', {headers: this.headers});
  }

  createPost(name) {
    return this.http.post(this.config.apiUrl + 'post/create', {
      name: name,
    }, {headers: this.headers});
  }

  updatePost(name,  id) {
    return this.http.post(this.config.apiUrl + 'post/update/' + id, {
      name: name,
    }, {headers: this.headers});
  }

  deletePost(id) {
    return this.http.post(this.config.apiUrl + 'post/delete/' + id, null, {headers: this.headers});
  }

  // services

  getServices() {
    return this.http.get(this.config.apiUrl + 'service/get-all', {headers: this.headers});
  }

  createService(name) {
    return this.http.post(this.config.apiUrl + 'service/create', {
      name: name,
    }, {headers: this.headers});
  }

  updateService(name,  id) {
    return this.http.post(this.config.apiUrl + 'service/update/' + id, {
      name: name,
    }, {headers: this.headers});
  }

  deleteService(id) {
    return this.http.post(this.config.apiUrl + 'service/delete/' + id, null, {headers: this.headers});
  }

  // purchase methods

  getMethods() {
    return this.http.get(this.config.apiUrl + 'purchase/get-all', {headers: this.headers});
  }

  createMethod(name) {
    return this.http.post(this.config.apiUrl + 'purchase/create', {
      name: name,
    }, {headers: this.headers});
  }

  updateMethod(name,  id) {
    return this.http.post(this.config.apiUrl + 'purchase/update/' + id, {
      name: name,
    }, {headers: this.headers});
  }

  deleteMethod(id) {
    return this.http.post(this.config.apiUrl + 'purchase/delete/' + id, null, {headers: this.headers});
  }

  getSuppliers() {
    return this.http.get(this.config.apiUrl + 'supplier/get-all', {headers: this.headers});
  }

  createSupplier(name, purchase_method_id) {
    return this.http.post(this.config.apiUrl + 'supplier/create', {
      name: name,
      purchase_method_id: purchase_method_id
    }, {headers: this.headers});
  }

  updateSupplier(name, purchase_method_id, id) {
    return this.http.post(this.config.apiUrl + 'supplier/update/' + id, {
      name: name,
      purchase_method_id: purchase_method_id
    }, {headers: this.headers});
  }

  deleteSupplier(id) {
    return this.http.post(this.config.apiUrl + 'supplier/delete/' + id, null, {headers: this.headers});
  }


}
