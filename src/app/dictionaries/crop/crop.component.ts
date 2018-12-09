import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {ContainerService} from '../../services/container.service';
import {FormControl, FormGroup} from '@angular/forms';
import {Profiles} from '../branch/branch.component';

@Component({
  selector: 'app-crop',
  templateUrl: './crop.component.html',
  styleUrls: ['./crop.component.scss']
})
export class CropComponent implements OnInit {

  crops;
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
    this.crops = [];
    this.apiService.getCrops().subscribe((res) => {
      console.log(res);
      this.crops = res;
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
    this.apiService.createCrop(form.value.name, this.selected)
      .subscribe((res: any) => {
        console.log(res);
        if (res.error) {
        } else {
          this.crops.push({id: res.id, name: res.name, profile_id: res.profile_id});
        }
        this.form.reset();
      });
  }

  showUpdate(i) {
    this.crops[i].edit = !this.crops[i].edit;
    this.selectToUpdate = this.crops[i].profile_id;
    this.formUpdate.value.name = this.crops[i].name;
  }

  update(form, i: number) {
    const id = this.crops[i].id;
    this.apiService.updateCrop(form.value.name, this.selectToUpdate, id)
      .subscribe(
        (branch: any) => {
          this.crops[i].name = branch.name;
          this.crops[i].profile_id = branch.profile_id;
          this.crops[i].edit = false;
          this.formUpdate.reset();
        }
      );
  }

  remove(i: number) {
    const id = this.crops[i].id;
    if (confirm('Вы уверены, что хотите удалить культуру "' + this.crops[i].name + '".')) {
      this.apiService.deleteCrop(id)
        .subscribe(
          (crop) => {
            console.log(crop);
          }
        );
      this.crops = this.crops.filter(branch => branch.id !== id);
    }
  }


}
