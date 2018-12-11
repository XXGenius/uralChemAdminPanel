import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {ContainerService} from '../../services/container.service';
import {FormControl, FormGroup} from '@angular/forms';
import {Profiles} from '../branch/branch.component';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.scss']
})
export class SupplierComponent implements OnInit {


  suppliers;
  showSpinner;

  form;
  formUpdate;

  edit;
  selected;
  methods: Profiles[] = [];

  selectToUpdate;

  constructor(private apiService: ApiService, private container: ContainerService) {
    this.form = new FormGroup({
      name: new FormControl()
    });
    this.formUpdate = new FormGroup({
      name: new FormControl()
    });
    setTimeout(() => {
      this.getSuppliers();
    }, 500);
  }

  ngOnInit() {
  }

  public get() {
    this.suppliers = [];
    this.showSpinner = true;
    this.suppliers = [];
    this.apiService.getSuppliers().subscribe((res) => {
      console.log(res);
      this.suppliers = res;
    });
    this.showSpinner = false;
  }

  getSuppliers() {
    this.methods = this.container.methods;
    if (this.methods[0]) {
      this.selected = this.methods[0].id;
    }
    this.container.methodss.subscribe(value => {
      this.get();
    });
    this.get();
  }

  create(form) {
    this.apiService.createSupplier(form.value.name, this.selected)
      .subscribe((res: any) => {
        console.log(res);
        if (res.error) {
        } else {
          this.suppliers.push({id: res.id, name: res.name, purchase_method_id: res.purchase_method_id});
        }
        this.form.reset();
      });
  }

  showUpdate(i) {
    this.suppliers[i].edit = !this.suppliers[i].edit;
    this.selectToUpdate = this.suppliers[i].profile_id;
    this.formUpdate.value.name = this.suppliers[i].name;
  }

  update(form, i: number) {
    const id = this.suppliers[i].id;
    this.apiService.updateSupplier(form.value.name, this.selectToUpdate, id)
      .subscribe(
        (supplier: any) => {
          this.suppliers[i].name = supplier.name;
          this.suppliers[i].purchase_method_id = supplier.purchase_method_id;
          this.suppliers[i].edit = false;
          this.formUpdate.reset();
        }
      );
  }

  remove(i: number) {
    const id = this.suppliers[i].id;
    if (confirm('Вы уверены, что хотите удалить поставщика "' + this.suppliers[i].name + '".')) {
      this.apiService.deleteSupplier(id)
        .subscribe(
          (branch) => {
            console.log(branch);
          }
        );
      this.suppliers = this.suppliers.filter(branch => branch.id !== id);
    }
  }

}
