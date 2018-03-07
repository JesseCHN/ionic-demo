import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams, ToastController, ViewController} from 'ionic-angular';
import {BaseUI} from "../../common/baseui";
import {RestProvider} from "../../providers/rest/rest";
import { Storage } from '@ionic/storage';

/**
 * Generated class for the AnswerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-answer',
  templateUrl: 'answer.html',
})
export class AnswerPage extends BaseUI{

  id: string;
  content: string;
  errorMessage: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl:ViewController,public loadingCtrl:LoadingController,
              public storage:Storage,public rest:RestProvider,public toastCtrl:ToastController) {
    super();
    this.id = this.navParams.get('id');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AnswerPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
  publish(){
    this.storage.get('UserId').then((val)=>{
      if(val !== null){
        var loading = super.showLoading(this.loadingCtrl,"发表中");
        this.rest.answer(val,this.id,this.content)
          .subscribe(f=>{
              if(f["Status"]=="OK"){
                loading.dismiss();
                this.dismiss();
              }else {
                loading.dismiss();
                super.showToast(this.toastCtrl,f["StatusContent"]);
              }
            },
            error=>{
              this.errorMessage = <any>error;
              loading.dismiss();
            }
          );

      }else {
        super.showToast(this.toastCtrl,"请登录在发表回答");
      }
    });

  }

}
