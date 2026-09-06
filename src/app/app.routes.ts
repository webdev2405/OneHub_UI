import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path:"",
        redirectTo:"/login",
        pathMatch:"full"
    },
    {
        path:"login",
        loadComponent: () => import('./pages/login/login').then((c) => c.Login)
    },
    {
        path:"app",
        loadComponent: () => import('./pages/portal-layout/portal-layout').then( (c) => c.PortalLayout),
        children:[
            {
                path:"",
                redirectTo:"/app/dashboard",
                pathMatch:"full"
            },
            {
                path:"dashboard",
                loadComponent: () => import('./pages/main-app/dashboard/dashboard').then( (c) => c.Dashboard),
            },
            {
                path:"clients",
                loadComponent: () => import('./pages/main-app/users/users').then( (c) => c.Users),
            },
            {
                path:"create-user",
                loadComponent: () => import('./pages/main-app/create-user/create-user').then( (c) => c.CreateUser),
            },
            {
                path:"create-organization",
                loadComponent: () => import('./pages/main-app/organization/organization').then( (c) => c.Organization),
            },
            {
                path:"profile",
                loadComponent: () => import('./pages/main-app/employee/profile/profile').then( (c) => c.Profile),
            },
            {
                path:"leave",
                loadComponent: () => import('./pages/main-app/employee/leave/leave').then( (c) => c.Leave),
            },
            {
                path:"payrole",
                loadComponent: () => import('./pages/main-app/employee/payrole/payrole').then( (c) => c.Payrole),
            },
            {
                path:"attendance",
                loadComponent: () => import('./pages/main-app/employee/attendance/attendance').then( (c) => c.Attendance),
            },
            {
                path:"request",
                loadComponent: () => import('./pages/main-app/employee/requests/requests').then( (c) => c.Requests),
            },
            {
                path:"admin/employee",
                loadComponent: () => import('./pages/main-app/admin/employee/employee').then( (c) => c.Employee),
            },
            {
                path:"admin/create-employee",
                loadComponent: () => import('./pages/main-app/admin/create-employee/create-employee').then( (c) => c.CreateEmployee),
            }
        ]
    }
];
