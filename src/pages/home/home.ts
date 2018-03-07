import { Component } from '@angular/core';
import {NavController, ModalController, Tabs, ToastController, LoadingController} from 'ionic-angular';
import { Globalization } from '@ionic-native/globalization';
import { QuestionPage } from '../question/question';
import {BaseUI} from "../../common/baseui";
import { RestProvider } from '../../providers/rest/rest';
import { DetailsPage } from '../details/details';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage extends BaseUI{
  errorMessage: any;
  feeds: string[];

  constructor(public navCtrl: NavController,private globalization: Globalization,public modalCtrl:ModalController,public toastCtrl:ToastController,public  loadingCtrl:LoadingController,
              public rest:RestProvider) {
    super();
  }

  ionViewWillEnter() {
        this.globalization.getPreferredLanguage()
    .then(res => console.log(res))
    .catch(e => console.log(e));
  }

  ionViewDidLoad(){
    this.getFeeds();
  }

  gotoQuestion() {
    var modal = this.modalCtrl.create(QuestionPage);
    modal.present();
  }

  gotoChat() {
    this.selectTab(2);

  }

  selectTab(index:number) {
    var t:Tabs = this.navCtrl.parent;
    t.select(index);
  }

  getFeeds(){
    var loading = super.showLoading(this.loadingCtrl,"加载中");
    this.rest.getFeeds()
      .subscribe(f=>{
        this.feeds = f;
        loading.dismiss();
      },
      error=>this.errorMessage = <any>error
      );
  }

  gotoDetails(id){
    this.navCtrl.push(DetailsPage,{id:id});
  }

}
