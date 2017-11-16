import { Component } from '@angular/core';
import { Platform, MenuController, App, LoadingController, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from "@ionic/storage";

import { New69Module } from "../providers/new69/new69";

export class MenuItem {
  name: string;
  id: number;
  icon: string;
  page: string;
  isActive: boolean;
  isLogin: boolean;

}
export class MenuCategory {
  id: number;
  name: string;
  items: Array<MenuItem>;
}
export class Menu {
  id: number;
  name: string;
  active: boolean;
  categories: Array<MenuCategory>;
}
export class AppMenu {
  menus: Array<Menu>;
}

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = "LoadingPage";

  mNew69Menu: any = [];

  userInfo: any = [];

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    public event: Events,
    public mNew69Module: New69Module,
    public app: App,
    public menuCtrl: MenuController,
    private storage: Storage,
    public loadingCtrl: LoadingController,
  ) {
    platform.ready().then(() => {
      statusBar.styleLightContent();
      splashScreen.hide();
      this.mNew69Menu = this.mNew69Module.mNew69Menu;
      this.menuCtrl.enable(true, "loginNew69");
      this.menuCtrl.enable(false, "logoutNew69");
      this.event.subscribe("userInfo", (user) => {
        this.userInfo = user[0];
      });
      this.storage.get('userInfo').then(user =>{
        if(user != null && user != undefined){
          this.userInfo = user[0];          
        }
      });
      let mViewData = this.mNew69Module.getAppConfig().getViewData("menuTitle");
      this.storage.set("allList", mViewData.categorieName);
    });
  }

  onClickLogin() {
    this.menuCtrl.close().then(() => {
      this.app.getRootNav().setRoot("LoginPage")
    })
  }

  onClickGoLogout() {

    this.menuCtrl.close().then(() => {
      this.storage.remove("userInfo");
      this.app.getRootNav().setRoot("HomePage");
    })
  }


  onClickItem(category: MenuCategory, item: MenuItem) {
    this.menuCtrl.close();
    this.setItemActive(item.page);
    if (item.page == "SearchPage") {
      this.app.getRootNav().setRoot(item.page);
    }
    if (item.page == "ListPage") {
      console.log(item.page);

      this.app.getRootNav().setRoot(item.page);
    }
    if (item.page == "PostReadPage") {
      this.app.getRootNav().setRoot(item.page);
    }
    if (item.page == "PostSavedPage") {
      if (this.mNew69Module.isLogin == false) {
        this.app.getRootNav().setRoot("LoginPage");
      } else {
        this.app.getRootNav().setRoot(item.page);
      }
    }
    if (item.page == "CommentPage") {
      if (this.mNew69Module.isLogin == false) {
        this.app.getRootNav().setRoot("LoginPage");
      } else {
        this.app.getRootNav().setRoot(item.page);
      }
    }
    if (item.name == "Xóa bộ nhớ đệm") {
      let loading = this.loadingCtrl.create({
        spinner: "crescent",
        duration: 2000
      });
      loading.present();
      // this.storage.clear().then(() => {
      //   loading.dismiss();
      // })
    }
  }

  setItemActive(page: string) {
    if (page && page.length > 0) {
      this.mNew69Menu.categories.forEach(element => {
        element.items.forEach(elm => {
          elm.isActive = false;
          if (element.page == page) elm.page = true;
        });
      });
    }

  }
}

