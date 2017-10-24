import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PageContent } from './page-content';

@NgModule({
    declarations: [
        PageContent
    ],
    imports:[
        IonicPageModule.forChild(PageContent)
    ]
})
export class HomeModule { }
