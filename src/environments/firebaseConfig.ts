
import {AuthMethods, AuthProviders} from "angularfire2";


export const firebaseConfig = {
    // Paste all this from the Firebase console...
    apiKey: "AIzaSyCn0WponeEVRt-W1Bt9xaK-VLzAtXgMXf4",
    authDomain: "reservationista-80500.firebaseapp.com",
    databaseURL: "https://reservationista-80500.firebaseio.com",
    storageBucket: "reservationista-80500.appspot.com",
    messagingSenderId: "932796346752"
};

export const authConfig = {
    provider: AuthProviders.Password,
    method: AuthMethods.Password
};
