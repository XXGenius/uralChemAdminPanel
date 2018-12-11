import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../services/api.service';
import {ContainerService} from '../../services/container.service';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ServiceComponent implements OnInit {

  services;
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
      this.getServices();
    }, 1000);
  }

  ngOnInit() {
  }

  getServices() {
    this.showSpinner = true;
    this.apiService.getServices()
      .subscribe((res) => {
        console.log(res);
        this.services = res;
        this.showSpinner = false;
      });
  }

  create(form) {
    this.apiService.createService(form.value.name)
      .subscribe((res: any) => {
        console.log(res);
        if (res.error) {
        } else {
          this.services.push({id: res.id, name: res.name});
        }
        this.form.reset();
      });
  }

  showUpdate(i) {
    this.services[i].edit = !this.services[i].edit;
  }

  update(form, i: number) {
    const id = this.services[i].id;
    this.apiService.updateService(form.value.name, id).subscribe(
      (service: any) => {
        this.services[i].name = service.name;
        this.services[i].edit = false;
        this.formUpdate.reset();
      }
    );
  }

  remove(i: number) {
    const id = this.services[i].id;
    if (confirm('Вы уверены, что хотите удалить сервис "' + this.services[i].name + '".')) {
      this.apiService.deleteService(id)
        .subscribe(
          (service) => {
            console.log(service);
          }
        );
      this.services = this.services.filter(services => services.id !== id);
    }
  }

}
