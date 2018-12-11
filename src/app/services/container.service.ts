import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContainerService {
  public profiless: Subject<any> = new Subject<any>();
  public methodss: Subject<any> = new Subject<any>();
  public methods;
  public profiles;


  constructor() {
  }
}
