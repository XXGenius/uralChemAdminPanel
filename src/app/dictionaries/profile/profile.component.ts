import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {FormControl, FormGroup} from '@angular/forms';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {ContainerService} from '../../services/container.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  animations: [
    trigger('list', [
      state('in', style({
        opacity: 1,
        transform: 'translateX(0)'
      })),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateX(-100px)'
        }),
        animate(300)
      ]),
      transition('* => void', [
        animate(300, style({
          opacity: 0,
          transform: 'translateX(100px)'
        }))
      ]),
    ])
  ]
})
export class ProfileComponent implements OnInit {

  profiles;
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
    this.getProfiles();
  }

  ngOnInit() {
  }

  getProfiles() {
    this.showSpinner = true;
    this.apiService.getProfiles()
      .subscribe((res) => {
        console.log(res);
        this.container.profiles = res;
        this.profiles = res;
        this.showSpinner = false;
      });
  }

  createProfile(form) {
    this.apiService.createProfile(form.value.name)
      .subscribe((res: any) => {
        console.log(res);
        if (res.error) {
        } else {
          this.container.profiles.push({id: res.id, name: res.name});
          this.profiles = this.container.profiles;
        }
        this.form.reset();
      });
  }

  showUpdate(i) {
    this.profiles[i].edit = !this.profiles[i].edit;
  }

  update(form, i: number) {
    const id = this.profiles[i].id;
    this.apiService.updateProfile(form.value.name, id).subscribe(
      (profile: any) => {
        this.profiles[i].name = profile.name;
        this.profiles[i].edit = false;
        this.formUpdate.reset();
      }
    );
  }

  remove(i: number) {
    const id = this.profiles[i].id;
    if (confirm('Вы уверены, что хотите удалить профиль "' + this.profiles[i].name + '".' +
      ' Вместе с ним удаляться связанные с ним отрасли, культуры и продукты.')) {
      this.apiService.deleteProfile(id)
        .subscribe(
          (profile) => {
            console.log(profile);
          }
        );
      this.profiles = this.profiles.filter(profile => profile.id !== id);
      this.container.profiles = this.container.profiles.filter(profile => profile.id !== id);
      this.container.profiless.next(this.profiles);
    }
  }

}
