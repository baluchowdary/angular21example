import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login-component/login-component';
import { LayoutComponent } from './pages/layout-component/layout-component';
import { DashboardComponent } from './pages/dashboard-component/dashboard-component';
import { authGuard } from './guard/auth-guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },

    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '',
        component: LayoutComponent,
        children: [
            { 
                path: 'dashboard', 
                component: DashboardComponent,
                // Added auth gurd concept to restrict unauthorized access
                canActivate: [authGuard]
            }
        ]
    },

    {
        path: '**',
        redirectTo: 'login'
    }

];
