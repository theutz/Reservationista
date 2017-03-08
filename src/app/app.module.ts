import { AppComponent } from './app.component';
import { HotelsModule } from './hotels/hotels.module';
import { BrandingService } from './shared/branding.service';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { DisplayUserComponent } from 'app/display-user/display-user.component';
import { LoginUserComponent } from 'app/login-user/login-user.component';
import { MarketingModule } from 'app/marketing/marketing.module';
import { RoutingModule } from 'app/routing/routing.module';
import { AuthService } from 'app/shared/auth.service';
import { SharedModule } from 'app/shared/shared.module';
import { authConfig, firebaseConfig } from 'environments/firebaseConfig';
import { AccordionModule } from 'ng2-bootstrap/accordion';
import { TabsModule } from 'ng2-bootstrap/tabs';
import { ToastrModule } from 'toastr-ng2';
import { AdminModule } from 'app/admin/admin.module';
import { CreateUserComponent } from './create-user/create-user.component';

@NgModule({
  declarations: [
    AppComponent,
    DisplayUserComponent,
    LoginUserComponent,
    CreateUserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule,
    AngularFireModule.initializeApp(firebaseConfig, authConfig),
    RoutingModule,
    MarketingModule,
    SharedModule,
    ToastrModule.forRoot({ positionClass: 'toast-bottom-right', progressBar: true }),
    HotelsModule,
    TabsModule.forRoot(),
    AccordionModule.forRoot(),
    AdminModule
  ],
  providers: [
    AuthService,
    BrandingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
