import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController, ToastController } from 'ionic-angular';
import { BaseUI } from '../../common/baseui';
import { RestProvider } from '../../providers/rest/rest';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage extends BaseUI{

  mobile: any;
  nickname: any;
  password: any;
  confirmpassword: any;
  errorMessage: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public viewCtrl: ViewController, public loadingCtrl: LoadingController, public rest:RestProvider,
    public toastCtrl:ToastController) {
    super();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  gotoLogin() {
    this.navCtrl.pop();
  }

  doRegister() {
    // 前台验证表单数据的正确性 包括手机号码、昵称的长度、密码的长度
    // 验证国内手机号码的格式,考虑所有的当前手机号码的可能性
    if(!(/^1[34578]\d{9}$/.test(this.mobile))){
      super.showToast(this.toastCtrl,"您的手机号码格式不正确!");
    }else if(this.nickname.length<3 ||this.nickname.length>10){
      super.showToast(this.toastCtrl,"昵称的长度应该在3~10位之间!");
    }else if(this.password.length<5 || this.password.length>20 || this.confirmpassword.length<6 || this.confirmpassword.length>20){
      super.showToast(this.toastCtrl,"密码的长度应该在6~20位之间!");
    }else if (this.password != this.confirmpassword) {
      super.showToast(this.toastCtrl,"两次输入的密码不匹配");
    }else {
      var loading =  super.showLoading(this.loadingCtrl,"注册中");
      this.rest.register(this.mobile,this.nickname,this.password)
      .subscribe(
        f=>{
            if (f["Status"] == "OK") {
              loading.dismiss();
              super.showToast(this.toastCtrl, "注册成功。");
              this.dismiss();
            }
          else {
            loading.dismiss();
            super.showToast(this.toastCtrl,f["StatusContent"])
          }
        },
        error => this.errorMessage = <any>error
      );
    }

  }
}
