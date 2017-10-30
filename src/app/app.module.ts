import { BrowserModule }                            from '@angular/platform-browser';
import { ErrorHandler, NgModule }                   from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen }                             from '@ionic-native/splash-screen';
import { StatusBar }                                from '@ionic-native/status-bar';
import { HttpModule }                               from '@angular/http';
import { IonicStorageModule } from "@ionic/storage";


import { HttpService }          from "../providers/http-service";
import { New69Module }          from "../providers/new69/new69";
import { MyApp }                from './app.component';
import { SuperTabsModule }      from 'ionic2-super-tabs'; 

import { AngularFireModule }    from 'angularfire2';
// import { AngularFireDatabaseModule }  from 'angularfire2/database';
import { AngularFireDatabaseModule }  from 'angularfire2/database-deprecated';
import { CloudSettings, CloudModule } from "@ionic/cloud-angular";

import { New69FirebaseService } from "../providers/new69/new69-firebase-service";


const cloudSettings: CloudSettings = {
  'core': {
    'app_id': 'c1c4169f'
  },
  'auth': {
    'google': {
      'webClientId': '942430182470-ssp9q8d0h7tm3ds8jp83lqq0nmiv00so.apps.googleusercontent.com',
      'scope': ['https://www.googleapis.com/auth/calendar.readonly']
    }
  }
}

export const firebaseConfig = {
      apiKey: "AIzaSyA3Vb6PEGQo8VLcQRrun45Q7d0fkrrqacc",
      authDomain: "fir-new69.firebaseapp.com",
      databaseURL: "https://fir-new69.firebaseio.com",
      projectId: "firebase-new69",
      storageBucket: "firebase-new69.appspot.com",
      messagingSenderId: "84975284739"
};

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp,{
      tabsPlacement:'top'
    }),
    SuperTabsModule.forRoot(),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    CloudModule.forRoot(cloudSettings)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    New69Module,
    HttpService,
    New69FirebaseService,
  ]
})
export class AppModule {}
