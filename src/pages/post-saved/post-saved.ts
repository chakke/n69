import { Component } from '@angular/core';
import { IonicPage, App } from "ionic-angular";

@IonicPage()
@Component({
    selector: 'post-saved-page',
    templateUrl: 'post-saved.html'
})
export class PostSavedPage {
    constructor(
        public app : App,
    ){}
    exit() {
        this.app.getRootNav().setRoot("HomePage");
    }
}