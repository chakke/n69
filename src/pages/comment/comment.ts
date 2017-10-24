import { Component } from '@angular/core';
import { IonicPage, App } from "ionic-angular";

@IonicPage()
@Component({
    selector: 'comment-page',
    templateUrl: 'comment.html'
})
export class CommentPage {
    constructor (
        public app: App,
    ){}
    exit() {
        this.app.getRootNav().setRoot("HomePage");
    }
}