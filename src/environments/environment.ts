// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
        apiKey: "AIzaSyCS4nvapwnbX3a6o5Dx18dnQrw-Wl7uZxQ",
        authDomain: "visitor-checkin.firebaseapp.com",
        databaseURL: "https://visitor-checkin.firebaseio.com",
        projectId: "visitor-checkin",
        storageBucket: "visitor-checkin.appspot.com",
        messagingSenderId: "836012687521"
    }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
