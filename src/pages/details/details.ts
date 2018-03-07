import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams, ToastController, ModalController} from 'ionic-angular';
import {BaseUI} from "../../common/baseui";
import { RestProvider } from '../../providers/rest/rest';
import { Storage } from '@ionic/storage';
import { AnswerPage } from '../answer/answer';

/**
 * Generated class for the DetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage extends BaseUI{

  id: string;
  userId: string;
  question: string[];
  answers: string[];
  errorMessage: any;
  IsFavourite: boolean;
  isMyQuestion: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams,public loadingCtrl:LoadingController,public rest:RestProvider,
              public toastCtrl:ToastController,public storage:Storage, public modal:ModalController) {
    super();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailsPage');
    this.id = this.navParams.get('id');
    this.loadQuestion(this.id);
  }

  loadQuestion(id) {
    this.storage.get('UserId').then((val)=>{
      if(val !== null){
        this.userId = val;
        var loading = super.showLoading(this.loadingCtrl,"加载中");
        this.rest.getQuestionWithUser(id,val)
          .subscribe(f=>{
              this.question = f;
              this.answers = f["Answers"];
              this.IsFavourite = f["IsFavourite"];
              this.isMyQuestion = (f["OwnUserId"] == val);
              loading.dismiss();
            },
            error=>{
              this.errorMessage = <any>error;
              loading.dismiss();
            }
          );

      }
    });
  }

  saveFavorite() {
    var loading = super.showLoading(this.loadingCtrl,"加载中");
    this.rest.saveFavourite(this.id,this.userId)
      .subscribe(f=>{
          if(f["Status"] == "OK"){
            loading.dismiss();
            super.showToast(this.toastCtrl,this.IsFavourite?"取消关注成功":"关注成功");
            this.IsFavourite = !this.IsFavourite;
          }
        },
        error=>{
          this.errorMessage = <any>error;
          loading.dismiss();
        }
      );

  }
  replyQuestion(){
    let modal = this.modal.create(AnswerPage,{id:this.id});
    //关闭后的回调
    modal.onDidDismiss(()=>{
      this.loadQuestion(this.id);
    });
    modal.present();
  }

}
