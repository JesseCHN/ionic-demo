import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import {BaseUI} from "../../common/baseui";
import { RestProvider } from '../../providers/rest/rest';
import { DetailsPage } from '../details/details';

/**
 * Generated class for the DiscoveryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-discovery',
  templateUrl: 'discovery.html',
})
export class DiscoveryPage extends BaseUI{

  questions: string[];
  errorMessage: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public toastCtrl:ToastController,public  loadingCtrl:LoadingController,public rest:RestProvider) {
    super();
  }

  ionViewDidLoad() {
    this.getQuestions();
  }

  getQuestions() {
    var loading = super.showLoading(this.loadingCtrl,"加载中");
    this.rest.getQuestions()
      .subscribe(f=>{
          this.questions = f;
          loading.dismiss();
        },
        error=>this.errorMessage = <any>error
      );
  }

  doRefresh(refresher){
    this.getQuestions();
    refresher.complete();
  }

  gotoDetails(id){
    this.navCtrl.push(DetailsPage,{id:id});
  }

}
