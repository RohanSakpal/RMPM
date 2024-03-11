import { Component, HostBinding, Input } from '@angular/core';
import { MenuModel } from '../sidebar/sidebar.component';
import { NavService } from '../../../services/nav.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-menu-list-item',
  standalone: true,
  imports: [CommonModule,FormsModule,MatListModule,MatIconModule],
  templateUrl: './menu-list-item.component.html',
  styleUrl: './menu-list-item.component.scss'
})
export class MenuListItemComponent {
  expanded!:boolean;
  @HostBinding('attr.aria-expanded') ariaExpanded = this.expanded;
  @Input() item!: MenuModel;
  @Input() depth!:number;
  @Input() showLeftNav:boolean = true;

  constructor(private navService:NavService, public router:Router) {
    debugger
    if(this.depth === undefined) {
      this.depth = 0;
    }
  }

  onItemSelected(item: MenuModel) {   
    if(!item.children || !item.children.length) {
      this.router.navigate([item.route]);
      this.navService.closeNav();
    }
    if(item.children && item.children.length) {
      this.expanded = !this.expanded;
    }
  }
}
