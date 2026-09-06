import { Component, inject, signal } from '@angular/core';
import { OverlayscrollbarsModule } from 'overlayscrollbars-ngx';
import { RouterLinkActive, RouterLink } from "@angular/router";
import { NgClass } from "@angular/common";

// Interfaces
import { 
  MenuItemSuperAdmin, 
  MenuItemAdmin, 
  MenuItemExternal,
  MenuItemInternal 
} from '../../../interfaces/menu-item.interface';

// Menu constants
import { 
  MENU_ITEMS_SUPER_ADMIN, 
  MENU_ITEMS_ADMIN, 
  MENU_ITEMS_INTERNAL_USER, 
  MENU_ITEMS_EXTERNAL_USER 
} from '../../../constants/menu.constants';

// Auth service (must expose `getRole()`)
import { Auth } from '../../../services/auth/auth';

@Component({
  selector: 'app-sidebar',
  imports: [OverlayscrollbarsModule, RouterLinkActive, RouterLink, NgClass],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.less'
})
export class Sidebar {
  // Reactive state
  menuItems = signal<any[]>([]);          // holds current user's menu
  userRole = signal<string | null | undefined>(null); // holds current user's role
  activeMenu = signal<string | null>(null); // tracks open/close menu

  // Inject Auth service
  private authService = inject(Auth);

  constructor() {
    this.loadMenuByRole();
  }

  /**
   * Loads menu items based on user role
   */
  loadMenuByRole() {
    const role = this.authService.getRole(); // get role from service
    console.log(`Role :: ${role.type} ${role.name}`)
    switch (role.type) {
      case 'S':
        this.menuItems.set(MENU_ITEMS_SUPER_ADMIN);
        break;

      case 'A':
        this.menuItems.set(MENU_ITEMS_ADMIN);
        break;

      case 'N':
        this.menuItems.set(MENU_ITEMS_INTERNAL_USER);
        break;

      case 'external':
        this.menuItems.set(MENU_ITEMS_EXTERNAL_USER);
    }

    // store current role
    this.userRole.set(role?.name.toUpperCase());
  }

  /**
   * Expand / Collapse menu
   */
  toggleMenu(label: string | undefined) {
    this.activeMenu.set(
      this.activeMenu() === label ? null : label ?? ''
    );
  }
}
