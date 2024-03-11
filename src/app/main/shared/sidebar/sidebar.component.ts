import { Component, ElementRef, VERSION, ViewChild } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon'
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { MenuListItemComponent } from '../menu-list-item/menu-list-item.component';
import { CommonModule } from '@angular/common';
import { NavService } from '../../../services/nav.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { delay, filter, takeUntil } from 'rxjs';

export interface MenuModel {
  menuId: number;
  displayName: string;
  route: string;
  children: MenuModel[];
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MatSidenavModule, MatMenuModule, MatListModule, MatToolbarModule, MatIconModule, RouterOutlet, MenuListItemComponent, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  @ViewChild(MatSidenav) sidenav!: MatSidenav;
  @ViewChild('appDrawer') appDrawer!: ElementRef;
  version = VERSION;
  showLeftNav: boolean = true;
  menuModel: MenuModel[] = [
    {
      menuId: 1,
      displayName: 'Master',
      route: '/master',
      children: [
        {
          menuId: 1.1,
          displayName: 'Base master',
          route: '/master/base',
          children: [
            {
              menuId: 1.2,
              displayName: 'Customer',
              route: '/master/base/customer',
              children: []
            },
            {
              menuId: 1.3,
              displayName: 'City',
              route: '/master/base/city',
              children: []
            }
          ]
        }
      ]
    }
  ];
  user: any = '';

  constructor(private navService: NavService, private observer: BreakpointObserver,
    private router: Router) { }

  ngOnInit(): void {
    this.getMenuList();
  }

  getMenuList() {

  }

  ngAfterViewInit() {
    this.navService.appDrawer = this.appDrawer;
    this.observer.observe(['(max-width:800px)', '(max-height:100%)'])
      .pipe(delay(1))
      .subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });

    this.router.events
      .pipe(
        filter((e) => e instanceof NavigationEnd)
      )
      .subscribe(() => {
        if (this.sidenav.mode == 'over') {
          this.sidenav.close();
        }
      });
  }

  showAndHideLeftNav() {
    debugger
    if (this.showLeftNav) {
      this.sidenav.close();
    } else {
      this.sidenav.open();
    }
    this.showLeftNav = !this.showLeftNav;
  }

  logout() {

  }
}
