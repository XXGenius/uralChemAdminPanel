import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {ContainerService} from '../../services/container.service';
import {FormControl, FormGroup} from '@angular/forms';
import {Profiles} from '../branch/branch.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  products;
  showSpinner;

  form;
  formUpdate;

  edit;
  selected;
  profiles: Profiles[] = [];

  selectToUpdate;

  constructor(private apiService: ApiService, private container: ContainerService) {
    this.form = new FormGroup({
      name: new FormControl()
    });
    this.formUpdate = new FormGroup({
      name: new FormControl()
    });
    setTimeout(() => {
      this.getProfiles();
    }, 1000);
  }

  ngOnInit() {
  }

  public get() {
    this.showSpinner = true;
    this.products = [];
    this.apiService.getProducts().subscribe((res) => {
      console.log(res);
      this.products = res;
      this.showSpinner = false;
    });
  }

  getProfiles() {
    this.profiles = this.container.profiles;
    if (this.profiles[0]) {
      this.selected = this.profiles[0].id;
    }
    this.container.profiless.subscribe(value => {
      this.get();
    });
    this.get();
  }

  create(form) {
    this.apiService.createProduct(form.value.name, this.selected)
      .subscribe((res: any) => {
        console.log(res);
        if (res.error) {
        } else {
          this.products.push({id: res.id, name: res.name, profile_id: res.profile_id});
        }
        this.form.reset();
      });
  }

  showUpdate(i) {
    this.products[i].edit = !this.products[i].edit;
    this.selectToUpdate = this.products[i].profile_id;
    this.formUpdate.value.name = this.products[i].name;
  }

  update(form, i: number) {
    const id = this.products[i].id;
    this.apiService.updateProduct(form.value.name, this.selectToUpdate, id)
      .subscribe(
        (product: any) => {
          this.products[i].name = product.name;
          this.products[i].profile_id = product.profile_id;
          this.products[i].edit = false;
          this.formUpdate.reset();
        }
      );
  }

  remove(i: number) {
    const id = this.products[i].id;
    if (confirm('Вы уверены, что хотите удалить продукт "' + this.products[i].name + '".')) {
      this.apiService.deleteProduct(id)
        .subscribe(
          (product) => {
            console.log(product);
          }
        );
      this.products = this.products.filter(product => product.id !== id);
    }
  }

}
