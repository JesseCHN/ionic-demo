import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the UserdataListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-userdata-list',
  templateUrl: 'userdata-list.html',
})
export class UserdataListPage {

  dataType: string;
  title: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.dataType = navParams.get('dataType');
    switch (this.dataType){
      case "question":
        this.title = "我的提问";
        break;
      case "answer":
        this.title = "我的回答";
        break;
      case "favourite":
        this.title = "我的关注";
        break;

    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserdataListPage');
  }

}
