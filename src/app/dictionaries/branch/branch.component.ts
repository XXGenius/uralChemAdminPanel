import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {FormControl, FormGroup} from '@angular/forms';
import {ContainerService} from '../../services/container.service';

export interface Profiles {
  name: string;
  id: string;
}

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.scss']
})
export class BranchComponent implements OnInit {

  branches;
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
    }, 500);
  }

  ngOnInit() {
  }

  public get() {
    this.showSpinner = true;
    this.branches = [];
    this.apiService.getBranches().subscribe((res) => {
      console.log(res);
      this.branches = res;
    });
    this.showSpinner = false;
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
    this.apiService.createBranch(form.value.name, this.selected)
      .subscribe((res: any) => {
        console.log(res);
        if (res.error) {
        } else {
          this.branches.push({id: res.branch.id, name: res.branch.name, profile_id: res.branch.profile_id});
        }
        this.form.reset();
      });
  }

  showUpdate(i) {
    this.branches[i].edit = !this.branches[i].edit;
    this.selectToUpdate = this.branches[i].profile_id;
    this.formUpdate.value.name = this.branches[i].name;
  }

  update(form, i: number) {
    const id = this.branches[i].id;
    this.apiService.updateBranch(form.value.name, this.selectToUpdate, id)
      .subscribe(
        (branch: any) => {
          this.branches[i].name = branch.name;
          this.branches[i].profile_id = branch.profile_id;
          this.branches[i].edit = false;
          this.formUpdate.reset();
        }
      );
  }

  remove(i: number) {
    const id = this.branches[i].id;
    if (confirm('Вы уверены, что хотите удалить отрасль "' + this.branches[i].name + '".')) {
      this.apiService.deleteBranch(id)
        .subscribe(
          (branch) => {
            console.log(branch);
          }
        );
      this.branches = this.branches.filter(branch => branch.id !== id);
    }
  }


}
