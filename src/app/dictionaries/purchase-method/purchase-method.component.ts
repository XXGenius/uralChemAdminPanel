import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../services/api.service';
import {ContainerService} from '../../services/container.service';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-purchase-method',
  templateUrl: './purchase-method.component.html',
  styleUrls: ['./purchase-method.component.scss']
})
export class PurchaseMethodComponent implements OnInit {

  methods;
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
      this.getMethods();
    }, 1000);
  }

  ngOnInit() {
  }

  getMethods() {
    this.showSpinner = true;
    this.apiService.getMethods()
      .subscribe((res) => {
        console.log(res);
        this.methods = res;
        this.showSpinner = false;
      });
  }

  create(form) {
    this.apiService.createMethod(form.value.name)
      .subscribe((res: any) => {
        console.log(res);
        if (res.error) {
        } else {
          this.container.methods.push({id: res.id, name: res.name});
          this.methods = this.container.methods;
        }
        this.form.reset();
      });
  }

  showUpdate(i) {
    this.methods[i].edit = !this.methods[i].edit;
  }

  update(form, i: number) {
    const id = this.methods[i].id;
    this.apiService.updateMethod(form.value.name, id).subscribe(
      (method: any) => {
        this.methods[i].name = method.name;
        this.methods[i].edit = false;
        this.formUpdate.reset();
      }
    );
  }

  remove(i: number) {
    const id = this.methods[i].id;
    if (confirm('Вы уверены, что хотите удалить метод закупки "' + this.methods[i].name + '"' +
      '. Вместе с ним удалятся связанные с ним поставщики.')) {
      this.apiService.deleteMethod(id)
        .subscribe(
          (method) => {
            console.log(method);
          }
        );
      this.methods = this.methods.filter(method => method.id !== id);
      this.container.methods = this.container.methods.filter(method => method.id !== id);
      this.container.methodss.next(this.methods);
    }
  }


}
