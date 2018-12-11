import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../services/api.service';
import {ContainerService} from '../../services/container.service';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  posts;
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
      this.getPosts();
    }, 1000);
  }

  ngOnInit() {
  }

  getPosts() {
    this.showSpinner = true;
    this.apiService.getPosts()
      .subscribe((res) => {
        console.log(res);
        this.posts = res;
        this.showSpinner = false;
      });
  }

  create(form) {
    this.apiService.createPost(form.value.name)
      .subscribe((res: any) => {
        console.log(res);
        if (res.error) {
        } else {
          this.posts.push({id: res.id, name: res.name});
        }
        this.form.reset();
      });
  }

  showUpdate(i) {
    this.posts[i].edit = !this.posts[i].edit;
  }

  update(form, i: number) {
    const id = this.posts[i].id;
    this.apiService.updatePost(form.value.name, id).subscribe(
      (post: any) => {
        this.posts[i].name = post.name;
        this.posts[i].edit = false;
        this.formUpdate.reset();
      }
    );
  }

  remove(i: number) {
    const id = this.posts[i].id;
    if (confirm('Вы уверены, что хотите удалить должность "' + this.posts[i].name + '".')) {
      this.apiService.deletePost(id)
        .subscribe(
          (post) => {
            console.log(post);
          }
        );
      this.posts = this.posts.filter(posts => posts.id !== id);
    }
  }

}
