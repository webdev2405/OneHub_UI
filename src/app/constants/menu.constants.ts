import { MenuItemAdmin, MenuItemExternal, MenuItemInternal, MenuItemSuperAdmin } from "../interfaces/menu-item.interface";

export const MENU_ITEMS_SUPER_ADMIN: MenuItemSuperAdmin[] = [
   {
    label: 'Dashboard',
    icon: 'bi bi-house',
    route: 'dashboard'
  },
  {
    label: 'Client Details',
    icon: 'bi bi-people',
    route: 'clients'
  },
  {
    label: 'Account Details',
    icon: 'bi bi-folder',
    route: 'account-details'
  },
  {
    label: 'Reports',
    icon: 'bi bi-bar-chart',
    submenu: [
      { label: 'Sales Report', route: 'reports/sales' },
      { label: 'User Activity', route: 'reports/activity' }
    ]
  }
];

export const MENU_ITEMS_ADMIN: MenuItemAdmin[] = [
  {
    label: 'Dashboard',
    icon: 'bi bi-house',
    route: 'dashboard'
  },
  {
    label: 'Organization Setup',
    icon: 'bi bi-people',
    submenu: [
      { label: 'Organization Detail', route: 'create-organization' }, // update organization details.
      { label: 'Master Setup', route: 'create-organization' }  // Branch, Department and division
    ]
  },
  {
    label: 'Employee Mgmt',
    icon: 'bi bi-folder',
    submenu: [
      { label: 'Employee List', route: 'admin/employee' },
      { label: 'Employee Setup', route: 'admin/create-employee' }
    ]
  },
  {
    label: 'Request Mgmt',
    icon: 'bi bi-bar-chart',
    submenu: [
      { label: 'Leaves', route: 'reports/sales' },
      { label: 'Holidays', route: 'reports/activity' }
    ]
  },
  {
    label: 'Reports',
    icon: 'bi bi-bar-chart',
    submenu: [
      { label: 'Sales Report', route: 'reports/sales' },
      { label: 'User Activity', route: 'reports/activity' }
    ]
  }
];


export const MENU_ITEMS_INTERNAL_USER: MenuItemInternal[] = [
   {
    label: 'Dashboard',     // Quick overview (leave,attandence, anouncements etc)
    icon: 'bi bi-speedometer2',
    route: 'dashboard',
  },
  {
    label: 'Profile',     // persional details, contact info, documents
    icon: 'bi bi-person',
    route: 'profile',
  },
  {
    label: 'Leave Management',   // l
    icon: 'bi bi-list-check',
    route: 'leave',
  },
  {
    label: 'Payrole',
    icon: 'bi bi-graph-up',
    route: 'payrole'
  }, 
  {
    label: 'Attendance',
    icon: 'bi bi-graph-up',
    route: 'attendance'
  },
   {
    label: 'Requests',
    icon: 'bi bi-graph-up',
    route: 'request'
  }
];

export const MENU_ITEMS_EXTERNAL_USER: MenuItemExternal[] = [
    {
    label: 'Dashboard',
    icon: 'bi bi-house-door',
    route: 'dashboard',
  },
  {
    label: 'My Profile',
    icon: 'bi bi-person-circle',
    route: '/profile',
  },
  {
    label: 'My Orders',
    icon: 'bi bi-bag-check',
    route: '/orders',
  },
  {
    label: 'Support',
    icon: 'bi bi-headset',
    submenu: [
      { label: 'Help Center', route: '/support/help' },
      { label: 'Contact Us', route: '/support/contact' },
    ]
  },
  {
    label: 'Notifications',
    icon: 'bi bi-bell',
    route: '/notifications',
  }
];