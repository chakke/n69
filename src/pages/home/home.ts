import { Component, ViewChild } from '@angular/core';
import { NavController, IonicPage, MenuController, App, LoadingController } from 'ionic-angular';
import { New69Module } from '../../providers/new69/new69';
import { Storage } from "@ionic/storage";

import { SuperTabs } from "ionic2-super-tabs";




@IonicPage()
@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})


export class HomePage {
    @ViewChild(SuperTabs) superTabs: SuperTabs;
    pageMain: any = 'MainContentPage';
    pageVideo: any = 'VideoPage';
    isShow: boolean = false;
    tabIndex: string;
    titlePage: Array<any>;
    show: boolean = true;

    mDidLoadTitle: boolean;
    mViewData: any = [];
    mCategories: any = [];
    constructor(
        public navCtrl: NavController,
        public mNew69Module: New69Module,
        public mMenuCtrl: MenuController,
        public app: App,
        public loadingCtrl: LoadingController,
        private storage: Storage,
    ) {
    }

    ionViewDidLoad() {
        this.mNew69Module.titlePage = "home";
        this.getTitlePage();
        // let loading = this.loadingCtrl.create({
        //     spinner: "crescent",
        //     duration: 500
        // })
        // loading.present();



    }

    getTitlePage() {
        this.storage.get('titlePage').then(data => {
            if (data == null || data == undefined) {
                let mViewData: any = [];
                mViewData = this.mNew69Module.getAppConfig().getViewData("menuTitle");
                this.mDidLoadTitle = true;
                this.mCategories = mViewData.categorieName;
                this.storage.set("titlePage", this.mCategories).then(() => {
                    console.log("Stored item!");
                }, error => console.log(error));
            } else {
                this.mDidLoadTitle = true;
                this.mCategories = data;
            }
        });
    }

    loadTitle(menuTitle: any = []) {
        this.mNew69Module.mCategories = [];
        menuTitle.forEach(element => {
            if (element.isShow) {
                this.mNew69Module.mCategories.push(element);
            }
        });
        this.mCategories = this.mNew69Module.mCategories;
    }

    indexPage(index) {
        this.mNew69Module.titlePage = index.id;
        this.storage.get(index.id).then(data => {
            if (data == null || data == undefined) {
                let loading = this.loadingCtrl.create({
                    spinner: "crescent",
                    duration: 500
                });
                this.storage.set(index.id, index.id).then(() => {
                    console.log("Did load title!")
                }, error => console.log(error));
                loading.present();
            }
        });
    }
    

    onClickBack() {
        this.navCtrl.setRoot("HomePage");
    }

    goLogin() {
        this.navCtrl.push("New69LoginPage");
    }
    goShare() {
        this.app.getRootNav().setRoot("ListPage");
    }
    goHomePage() {
        this.superTabs.slideTo(0);
    }

    enableMenu(isLogin: boolean) {
        this.mMenuCtrl.enable(isLogin, 'logoutNew69');
        this.mMenuCtrl.enable(!isLogin, 'loginNew69')
    }
}
