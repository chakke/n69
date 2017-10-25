import { Injectable } from "@angular/core";


// import { AngularFireDatabase } from "angularfire2/database";
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database-deprecated";


@Injectable()
export class New69FirebaseService {

    // post: any;
    // video: any;
    post: FirebaseListObservable<any>;
    video: FirebaseListObservable<any>;
    constructor(
        public mFirebase: AngularFireDatabase,
    ) { }



    getData() {
        this.video = this.mFirebase.list('/video');
    }

    getPostFirebase() {
        this.post = this.mFirebase.list('/post');
    }
    pushData(data: any) {
        this.post.push({
            contentId: data.contentId,
            url: data.url,
            date: data.date,
            title: data.title,
            description: data.description,
            avatarUrl: data.avatarUrl,
            categoryName: data.categoryName,
            totalComments: data.totalComments
        }).then(() => {
            console.log("done!");
        }, (error) => console.log(error));
    }

    pushClipData(url: string, title: string, contentId: string, description: string, totalComments: string) {
        this.video = this.mFirebase.list('/video');
        this.video.push({
            contentId: parseInt(contentId),
            url: url,
            date: new Date().getTime(),
            title: title,
            description: description,
            avatarUrl: "",
            categoryName: "Giải trí",
            totalComments: parseInt(totalComments),
        }).then(() => {
            console.log("done!");
        }, (error) => console.log(error));
    }

}