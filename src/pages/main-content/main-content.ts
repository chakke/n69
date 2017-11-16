import { Component } from '@angular/core';
import { IonicPage, NavController, Events, App, LoadingController } from 'ionic-angular';

import { Storage } from "@ionic/storage";

import { New69Module } from "../../providers/new69/new69";
import { Post } from "../../providers/new69/new69-post";

import { New69FirebaseService } from "../../providers/new69/new69-firebase-service";

import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from "angularfire2/database-deprecated";


@IonicPage()
@Component({
    selector: 'page-main-content',
    templateUrl: 'main-content.html',
})
export class MainContentPage {
    posts: Array<Post> = [];

    postsFirebase: Array<Post> = [];

    navController: NavController;


    avatarUrl: string;
    categoryName: string;
    contentId: number;
    date: string;
    description: string;
    title: string;
    totalComments: number;

    titlePage: string;
    firstPost: any;
    otherPost: any;
    allPost: any;

    // private start: number = 0;

    post: FirebaseListObservable<any>;
    item: FirebaseObjectObservable<any>;
    constructor(
        public navCtrl: NavController,
        public app: App,
        public mNew69Module: New69Module,
        public event: Events,
        public loadingCtrl: LoadingController,
        private storage: Storage,
        public mFirebase: New69FirebaseService,

        public afd: AngularFireDatabase

    ) {
        this.navController = app.getRootNav();
    }

    ngOnInit() {
        this.post = this.afd.list('post');
        this.item = this.afd.object('post/1');
    }

    ionViewDidLoad() {

    }

    ionViewDidEnter() {
        // this.updateData();
        setTimeout(() => {
            // this.loadAllData(this.mNew69Module.titlePage);
            // this.loadAllDataFirebase(this.mNew69Module.titlePage);
            this.getDataFirebase(this.mNew69Module.titlePage);
        }, 100);
    }


    /**Hàm lấy dữ liệu ra cho từng tiêu đề */
    loadDataPage(index: string, listPost: any[]) {
        if (index == "home") {
            this.loadPost(listPost);
        } else {
            listPost = listPost.filter(element => {
                return element.categoryName.toLowerCase().indexOf(index.toLowerCase()) > -1;
            })
            if (listPost.length == 0) {
                this.otherPost = [];
            } else {
                // console.log(listPost.length);                
                this.loadPost(listPost);
            }
        }
    }

    getDataFirebase(titlePage: string) {
        let loading = this.loadingCtrl.create({
            spinner: "crescent"
        });
        // loading.present();
        this.post.subscribe(data => {
            this.postsFirebase = [];
            data.forEach(item => {
                let post = new Post();
                post.onResponsePost(item);
                this.postsFirebase.push(post);
            });
            this.loadPost(this.postsFirebase);
            loading.dismiss();
            this.loadDataPage(titlePage, this.postsFirebase);
        });
    }

    loadPost(list: any[]) {
        this.firstPost = list[0];
        this.loadFirstPost(this.firstPost);
        this.otherPost = [];
        this.allPost = [];
        for (let i = 0; i < list.length; i++) {
            this.allPost.push(list[i]);
        }
        for (let i = 0; i < 5; i++) {
            if (i > 0) {
                this.otherPost.push(list[i]);
            }
        }
    }
    loadFirstPost(object: any) {
        this.avatarUrl = object.avatarUrl;
        this.categoryName = object.categoryName;
        this.contentId = object.contentId;
        this.date = object.date;
        this.description = object.description;
        this.title = object.title;
        this.totalComments = object.totalComments;
    }

    /**Hàm update dữ liệu */
    updateData() {
        this.mNew69Module.getHttpService().requestPostDetail().then(data => {
            // this.mFirebase.pushData(data);
        });
    }

    editData() {
        this.post.subscribe(data => {
            let lastIndex = data.length - 1;
            let lastIndex10 = data.length - 11;
            console.log(data.length);

            if (data[data.length - 1] == data[data.length - 11]) {
                // this.rmDuplicatePost(data);
            }
            else if (data.length > 250) {
                // this.rmLastPost(data);
            }
            else if (data[data.length - 1] != data[data.length - 11]) {
                // this.rmFirstPost(data);
            }
        });
    }

    rmDuplicatePost(listPost) {
        for (var key in listPost) {
            if (parseInt(key) > listPost.length - 10) {
                this.mFirebase.deletePost(listPost[key])
            }
        }
    }
    rmLastPost(listPost) {
        for (var key in listPost) {
            if (parseInt(key) > 249) {
                this.mFirebase.deletePost(listPost[key])
            }
        }
    }

    rmFirstPost(listPost) {
        for (var key in listPost) {
            if (parseInt(key) < 10) {
                this.mFirebase.deletePost(listPost[key])
            }
        }
    }

    /**Hàm refresh dữ liệu */
    doRefresh(refresher) {
        setTimeout(() => {
            this.updateData();
            // this.editData();
            refresher.complete();
        }, 500);
    }



    /**Hàm thêm dữ liệu khi scroll */
    doInfinite(infiniteScroll: any) {
        setTimeout(() => {
            let startNumberIndex: number = this.otherPost.length;
            console.log(this.allPost);

            if (startNumberIndex < this.allPost.length - 4) {
                for (let i = startNumberIndex; i < startNumberIndex + 4; i++) {
                    if (i > startNumberIndex) {
                        this.otherPost.push(this.allPost[i]);
                    }
                }
            }
            infiniteScroll.complete();
        }, 1000);
    }

    goContentPage(post_content: any) {
        this.navController.push("PageContent", { postId: post_content });
    }

}
