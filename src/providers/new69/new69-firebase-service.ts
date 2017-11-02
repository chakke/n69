import { Injectable } from "@angular/core";

import firebase from 'firebase';


// import { AngularFireDatabase } from "angularfire2/database";
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database-deprecated";


@Injectable()
export class New69FirebaseService {

    postFirebase = firebase.database().ref('/post');

    post: FirebaseListObservable<any>;
    video: FirebaseListObservable<any>;
    comment: FirebaseListObservable<any>;
    commentOfCmt: FirebaseListObservable<any>;
    constructor(
        public mFirebase: AngularFireDatabase,
    ) { }

    addComment(key, user, cmtContent) {
        var promise = new Promise((resolve) => {

            this.postFirebase.child(key).child(user).push({
                userCmt: user,
                cmtContent: cmtContent,
                timeCmt: new Date().getTime()
            }).then(() => {
                resolve(true)
            })
        });
        return promise;
    }

    getCommentPerEachPost() {
        this.comment = this.mFirebase.list('/post/0/user1');
    }

    getCommentOfComment(namePost, nameUser, keyUser) {
        this.commentOfCmt = this.mFirebase.list('/post' + '/' + namePost + '/' + nameUser + '/' + keyUser);
    }


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