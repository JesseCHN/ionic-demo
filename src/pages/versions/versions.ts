import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppVersion } from '@ionic-native/app-version';

/**
 * Generated class for the VersionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-versions',
  templateUrl: 'versions.html',
})
export class VersionsPage {

  AppName:any;
  PackageName:any;
  VersionCode:any;
  VersionNumber:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,private appVersion: AppVersion) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VersionsPage');
  }

  ionViewDidEnter() {
    this.appVersion.getAppName()
      .then(value=>this.AppName = value);
    this.appVersion.getPackageName()
      .then(value=>this.PackageName = value);
    this.appVersion.getVersionCode()
      .then(value=>this.VersionCode = value);

    // 版本号
    this.appVersion.getVersionNumber()
      .then(value=>this.VersionNumber = value);
  }

}
