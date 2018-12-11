import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../services/api.service';
import {ContainerService} from '../../services/container.service';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-goal',
  templateUrl: './goal.component.html',
  styleUrls: ['./goal.component.scss']
})
export class GoalComponent implements OnInit {

  goals;
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
      this.getGoals();
    }, 1000);
  }

  ngOnInit() {
  }

  getGoals() {
    this.showSpinner = true;
    this.apiService.getGoals()
      .subscribe((res) => {
        console.log(res);
        this.goals = res;
        this.showSpinner = false;
      });
  }

  create(form) {
    this.apiService.createGoal(form.value.name)
      .subscribe((res: any) => {
        console.log(res);
        if (res.error) {
        } else {
          this.goals.push({id: res.id, name: res.name});
        }
        this.form.reset();
      });
  }

  showUpdate(i) {
    this.goals[i].edit = !this.goals[i].edit;
  }

  update(form, i: number) {
    const id = this.goals[i].id;
    this.apiService.updateGoal(form.value.name, id).subscribe(
      (goal: any) => {
        this.goals[i].name = goal.name;
        this.goals[i].edit = false;
        this.formUpdate.reset();
      }
    );
  }

  remove(i: number) {
    const id = this.goals[i].id;
    if (confirm('Вы уверены, что хотите удалить компанию "' + this.goals[i].name + '".')) {
      this.apiService.deleteGoal(id)
        .subscribe(
          (goal) => {
            console.log(goal);
          }
        );
      this.goals = this.goals.filter(goals => goals.id !== id);
    }
  }

}
