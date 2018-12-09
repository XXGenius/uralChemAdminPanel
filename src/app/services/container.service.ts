import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContainerService {
  public profiless: Subject<Array> = new Subject<Array>();

  public profiles;

  constructor() {
  }
}
