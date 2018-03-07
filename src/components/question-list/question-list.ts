import { Component,Input } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {BaseUI} from "../../common/baseui";
import {LoadingController, ToastController} from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { Storage } from '@ionic/storage';
import { DetailsPage } from '../../pages/details/details';

/**
 * Generated class for the QuestionListComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'question-list',
  templateUrl: 'question-list.html'
})
export class QuestionListComponent extends BaseUI{

  errorMessage: any;
  questions: string[];


  // datatype是外部传递进来的，dataSourceType是本地接受之后的参数命名
  @Input('datatype') dataSourceType;

  constructor(public navCtrl: NavController, public navParams: NavParams,public storage: Storage, public loadCtrl: LoadingController,public rest:RestProvider,
              public toastCtrl: ToastController) {
    super();
  }

  // 组件里面没有生命周期的函数ionViewDidLoad
  ngAfterContentInit(){
    this.storage.get('UserId').then((val) => {
      if (val != null) {
        //加载用户数据
        var loading = super.showLoading(this.loadCtrl, "加载中...");
        this.rest.getUserQuestionList(val,this.dataSourceType)
          .subscribe(
            q => {
              this.questions = q;
              loading.dismiss();
            },
            error => this.errorMessage = <any>error
          );
      }

    });

  }



  gotoDetails(questionId) {
    this.navCtrl.push(DetailsPage,{id:questionId});
  }
}
