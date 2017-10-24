import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MainContentPage } from './main-content';

@NgModule({
  declarations: [
    MainContentPage,
  ],
  imports: [
    IonicPageModule.forChild(MainContentPage),
  ],
})
export class MainContentPageModule {}
