import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from 'angularfire2';
import { DisplayUserComponent } from 'app/display-user/display-user.component';
import { LoginUserComponent } from 'app/login-user/login-user.component';
import { MarketingModule } from 'app/marketing/marketing.module';
import { RoutingModule } from 'app/routing/routing.module';
import { AuthService } from 'app/shared/auth.service';
import { authConfig, firebaseConfig } from 'environments/firebaseConfig';

@NgModule({
  declarations: [
    AppComponent,
    DisplayUserComponent,
    LoginUserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig, authConfig),
    RoutingModule,
    MarketingModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
