import { LoginUserComponent } from '../login-user/login-user.component';
import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from 'app/marketing/home/home.component';
import { LearnMoreComponent } from 'app/marketing/learn-more/learn-more.component';
import { CreateUserComponent } from '../create-user/create-user.component';

export const appRoutes: Routes = [
    { path: 'home', component: HomeComponent, data: { breadcrumb: 'Home' } },
    { path: 'hotels', loadChildren: 'app/hotels/hotels.module#HotelsModule', data: { preload: true, breadcrumb: 'Hotels' } },
    { path: 'admin', loadChildren: 'app/admin/admin.module#AdminModule', data: { preload: true, breadcrumb: 'Admin' } },
    { path: 'learn-more', component: LearnMoreComponent, data: { breadcrumb: 'Learn More' } },
    { path: 'login', component: LoginUserComponent, data: { breadcrumb: 'Login' } },
    { path: 'create-user', component: CreateUserComponent, data: { breadcrumb: 'Create User' } },
    { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forRoot(appRoutes)
    ],
    declarations: [],
    exports: [RouterModule]
})
export class RoutingModule { }

export const appRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes);
