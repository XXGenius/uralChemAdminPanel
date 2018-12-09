import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {ContainerService} from '../../services/container.service';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  categories;
  showSpinner;

  form;
  formUpdate;

  edit;

  constructor(private apiService: ApiService, private container: ContainerService) {
    this.form = new FormGroup({
      name: new FormControl()
    });
    this.formUpdate = new FormGroup({
      name: new FormControl()
    });
    setTimeout(() => {
      this.getCategories();
    }, 1000);
  }

  ngOnInit() {
  }

  getCategories() {
    this.showSpinner = true;
    this.apiService.getCategories()
      .subscribe((res) => {
        console.log(res);
        this.categories = res;
        this.showSpinner = false;
      });
  }

  create(form) {
    this.apiService.createCategory(form.value.name)
      .subscribe((res: any) => {
        console.log(res);
        if (res.error) {
        } else {
          this.categories.push({id: res.id, name: res.name});
        }
        this.form.reset();
      });
  }

  showUpdate(i) {
    this.categories[i].edit = !this.categories[i].edit;
  }

  update(form, i: number) {
    const id = this.categories[i].id;
    this.apiService.updateCategory(form.value.name, id).subscribe(
      (category: any) => {
        this.categories[i].name = category.name;
        this.categories[i].edit = false;
        this.formUpdate.reset();
      }
    );
  }

  remove(i: number) {
    const id = this.categories[i].id;
    if (confirm('Вы уверены, что хотите удалить категорию "' + this.categories[i].name + '".')) {
      this.apiService.deleteCategory(id)
        .subscribe(
          (category) => {
            console.log(category);
          }
        );
      this.categories = this.categories.filter(category => category.id !== id);
    }
  }
}
