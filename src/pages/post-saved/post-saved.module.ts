import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PostSavedPage } from "./post-saved";

@NgModule({
    declarations: [
        PostSavedPage
    ],
    imports: [
        IonicPageModule.forChild(PostSavedPage)
    ]
})
export class HomeModule { }