import { LoginUserComponent } from '../login-user/login-user.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from 'app/marketing/home/home.component';
import { LearnMoreComponent } from 'app/marketing/learn-more/learn-more.component';

export const appRoutes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'hotels', loadChildren: 'app/hotels/hotels.module#HotelsModule', data: { preload: true } },
    { path: 'learn-more', component: LearnMoreComponent },
    { path: 'login', component: LoginUserComponent },
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
