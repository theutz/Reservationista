import { FirebaseAuthState } from 'angularfire2/auth';
import { Injectable, EventEmitter, Output } from "@angular/core";
import { User } from "firebase";
import { AngularFireAuth, AuthProviders, AuthMethods } from "angularfire2";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { UserInfo } from "./user-info";
import { Observable, Subject, ReplaySubject, AsyncSubject } from "rxjs";
import { UsersService } from '../shared/users.service';

@Injectable()
export class AuthService {
    private _userInfoSubject: ReplaySubject<UserInfo>;
    private _auth: User;

    constructor(
        private _afAuth: AngularFireAuth,
        private _users: UsersService
    ) {
        this.initUserInfoSubject();
        _afAuth.subscribe(auth => {
            let userInfo = new UserInfo();
            if (auth != null) {
                this._auth = auth.auth;
                userInfo.isAnonymous = auth.auth.isAnonymous;
                userInfo.email = auth.auth.email;
                userInfo.displayName = auth.auth.displayName;
                userInfo.providerId = auth.auth.providerId;
                userInfo.photoURL = auth.auth.photoURL;
                userInfo.uid = auth.auth.uid;
            } else {
                this._auth = null;
                userInfo.isAnonymous = true;
            }
            this._userInfoSubject.next(userInfo);
        });
    }

    login(email: string, password: string): Observable<User> {
        this.initUserInfoSubject();
        let sub = new ReplaySubject<User>(1);
        this._afAuth.login({ email: email, password: password })
            .then(auth => {
                this._updateUserInDb();
                sub.next(auth.auth);
                sub.complete();
            });
        return sub.asObservable();
    }

    private initUserInfoSubject() {
        this._userInfoSubject = new ReplaySubject<UserInfo>(1);
    }

    currentUser(): Observable<UserInfo> {
        return this._userInfoSubject.asObservable();
    }

    logout() {
        this.initUserInfoSubject();
        this._afAuth.logout();
    }

    isLoggedIn(): Observable<boolean> {
        let isLoggedInBS = new AsyncSubject<boolean>();
        this._userInfoSubject.subscribe(ui => {
            isLoggedInBS.next(!ui.isAnonymous);
            isLoggedInBS.complete();
        });
        return isLoggedInBS;
    }

    updateDisplayName(displayName: string): Observable<string> {
        let result = new Subject<string>();
        this._auth.updateProfile({ displayName: displayName, photoURL: null }).then(a => {
            result.next("success");
        }).catch(err => result.error(err));
        return result;
    }

    createUser(email: string, password: string, displayName: string): Observable<FirebaseAuthState> {
        let sub = new ReplaySubject<FirebaseAuthState>();
        this._afAuth.createUser({ email: email, password: password })
            .then(auth => {
                auth.auth.updateProfile(
                    { displayName: displayName, photoURL: null }
                )
                    .then(() => {
                        sub.next(auth);
                        sub.complete();
                    })
            })
        return sub.asObservable();
    }

    updateEmail(email: string): Observable<string> {
        let result = new Subject<string>();
        this._auth.updateEmail(email).then(a => {
            result.next("success");
        }).catch(err => result.error(err));
        return result.asObservable();
    }

    updatePassword(password: string): Observable<string> {
        let result = new Subject<string>();
        this._auth.updatePassword(password).then(a => {
            result.next("success");
        }).catch(err => result.error(err));
        return result.asObservable();
    }

    loginViaProvider(provider: string): Observable<String> {
        let result = new Subject<string>();
        if (provider === "google") {
            this._afAuth
                .login({ provider: AuthProviders.Google, method: AuthMethods.Popup })
                .then(auth => {
                    result.next("success")
                    this._updateUserInDb();
                })
                .catch(err => result.error(err));
            return result.asObservable();
        }
        else if (provider === "twitter") {
            this._afAuth
                .login({ provider: AuthProviders.Twitter, method: AuthMethods.Popup })
                .then(auth => {
                    result.next("success");
                    this._updateUserInDb();
                })
                .catch(err => result.error(err));
            return result.asObservable();
        }
        result.error("Not a supported authentication method: " + provider)
        return result.asObservable();
    }

    private _updateUserInDb() {
        this.currentUser()
            .take(1)
            .subscribe(user => this._users.create(user))
    }
}
