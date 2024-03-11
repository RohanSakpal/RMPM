import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavService {

  public appDrawer: any;

  public closeNav() {
    this.appDrawer?.close();
  }
  public openNav() {
    this.appDrawer?.open();
  }
}
