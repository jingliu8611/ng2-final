import { AdminComponent } from './admin';
import { DashboardComponent } from './dashboard';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const appRoutes: Routes = [
    { path: '', component: AdminComponent },
    { path: 'dashboard', component: DashboardComponent },
];

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
