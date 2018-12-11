import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../services/api.service';
import {ContainerService} from '../../services/container.service';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {

  companies;
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
      this.getCompanies();
    }, 1000);
  }

  ngOnInit() {
  }

  getCompanies() {
    this.showSpinner = true;
    this.apiService.getCompanies()
      .subscribe((res) => {
        console.log(res);
        this.companies = res;
        this.showSpinner = false;
      });
  }

  create(form) {
    this.apiService.createCompany(form.value.name)
      .subscribe((res: any) => {
        console.log(res);
        if (res.error) {
        } else {
          this.companies.push({id: res.id, name: res.name});
        }
        this.form.reset();
      });
  }

  showUpdate(i) {
    this.companies[i].edit = !this.companies[i].edit;
  }

  update(form, i: number) {
    const id = this.companies[i].id;
    this.apiService.updateCompany(form.value.name, id).subscribe(
      (company: any) => {
        this.companies[i].name = company.name;
        this.companies[i].edit = false;
        this.formUpdate.reset();
      }
    );
  }

  remove(i: number) {
    const id = this.companies[i].id;
    if (confirm('Вы уверены, что хотите удалить компанию "' + this.companies[i].name + '".')) {
      this.apiService.deleteCompany(id)
        .subscribe(
          (company) => {
            console.log(company);
          }
        );
      this.companies = this.companies.filter(companies => companies.id !== id);
    }
  }

}
