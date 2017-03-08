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
        // console.log("AuthService");
        _afAuth.subscribe(auth => {
            // console.log("auth: ", JSON.stringify(auth));
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

    login(email: string, password: string) {
        // console.log("login: ", email);
        this.initUserInfoSubject();
        this._afAuth.login({ email: email, password: password });
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
            // console.log("isLoggedIn: anonymous=" + ui.isAnonymous);
            isLoggedInBS.next(!ui.isAnonymous);
            isLoggedInBS.complete();
            // setTimeout(() => {
            // }, 0);
        });
        return isLoggedInBS;
    }

    updateDisplayName(displayName: string): Observable<string> {
        let result = new Subject<string>();
        //noinspection TypeScriptUnresolvedFunction
        this._auth.updateProfile({ displayName: displayName, photoURL: null }).then(a => {
            result.next("success");
        }).catch(err => result.error(err));
        return result;
    }

    createUser(email: string, password: string, displayName: string) {
        //noinspection TypeScriptUnresolvedFunction
        this._afAuth.createUser({ email: email, password: password })
            .then(auth => auth.auth.updateProfile(
                { displayName: displayName, photoURL: null }
            ));
    }

    updateEmail(email: string): Observable<string> {
        let result = new Subject<string>();
        //noinspection TypeScriptUnresolvedFunction
        this._auth.updateEmail(email).then(a => {
            result.next("success");
        }).catch(err => result.error(err));
        return result.asObservable();
    }

    updatePassword(password: string): Observable<string> {
        let result = new Subject<string>();
        //noinspection TypeScriptUnresolvedFunction
        this._auth.updatePassword(password).then(a => {
            result.next("success");
        }).catch(err => result.error(err));
        return result.asObservable();
    }

    loginViaProvider(provider: string): Observable<String> {
        let result = new Subject<string>();
        if (provider === "google") {
            //noinspection TypeScriptUnresolvedFunction
            this._afAuth
                .login({ provider: AuthProviders.Google, method: AuthMethods.Popup })
                //noinspection TypeScriptUnresolvedFunction
                .  //noinspection TypeScriptUnresolvedFunction
                then(auth => result.next("success"))
                .catch(err => result.error(err));
            return result.asObservable();
        }
        else if (provider === "twitter") {
            //noinspection TypeScriptUnresolvedFunction
            this._afAuth
                .login({ provider: AuthProviders.Twitter, method: AuthMethods.Popup })
                //noinspection TypeScriptUnresolvedFunction
                .  //noinspection TypeScriptUnresolvedFunction
                then(auth => {
                    result.next("success")
                })
                .catch(err => result.error(err));
            return result.asObservable();
        }
        result.error("Not a supported authentication method: " + provider)
        return result.asObservable();
    }
}
