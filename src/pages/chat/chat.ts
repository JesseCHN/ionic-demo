import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ChatdetailsPage } from '../chatdetails/chatdetails';

/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  userinfo: object;
  ChatdetailsPage: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.userinfo = {
      userid: '123321',
      username: '慕女神'
    };
    this.ChatdetailsPage = ChatdetailsPage;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
  }

}
