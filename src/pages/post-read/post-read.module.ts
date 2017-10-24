import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PostReadPage } from './post-read';

@NgModule({
  declarations: [
    PostReadPage,
  ],
  imports: [
    IonicPageModule.forChild(PostReadPage),
  ],
})
export class PostReadPageModule {}
