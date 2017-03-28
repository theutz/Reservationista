import { ToastrService } from 'toastr-ng2/toastr-service';
import { UserInfo } from '../user-info';
import { Observable } from 'rxjs/Rx';
import { AuthService } from '../auth.service';
import { BrandingService } from '../branding.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CollapseDirective } from 'ng2-bootstrap';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  title: string = '';
  isCollapsed: boolean = true;

  constructor(
    private _brandingService: BrandingService,
    private _authService: AuthService,
    private _router: Router,
    private _toastrService: ToastrService
  ) { }

  ngOnInit() {
    this._setTitle();
    this._autoCollapseNavbar();
  }

  private _autoCollapseNavbar() {
    Observable.fromEvent(window, 'click')
      .filter((event: any) => {
        return event.target.id != 'navbar-toggler'
      })
      .subscribe(event => {
        this.isCollapsed = true;
      })
  }

  toggleNavbar(event: Event): void {
    event.preventDefault();
    this.isCollapsed = !this.isCollapsed;
  }

  isLoggedIn(): Observable<boolean> {
    return this._authService.isLoggedIn();
  }

  private _setTitle(): void {
    this._brandingService.title$.subscribe(title => this.title = title);
  }

  currentUser(): Observable<UserInfo> {
    return this._authService.currentUser();
  }

  logout() {
    this._authService.logout();
    this._router.navigateByUrl('/home').then(() => {
      this._toastrService.success('Logged out!');
    });
  }

}
