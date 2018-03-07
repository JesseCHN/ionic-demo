import { Loading, LoadingController, Toast, ToastController } from 'ionic-angular';


export abstract class BaseUI {

  constructor() {}

  // 通用展示
  protected showLoading(loadingCtrl:LoadingController,message:string):Loading {
    let loader = loadingCtrl.create({
      content: message
    });
    loader.present();
    return loader;
  }

  protected showToast(toastCtrl: ToastController,message:string):Toast{
    let toast = toastCtrl.create({message:message,duration:3000,position:'bottom'});
    toast.present();
    return toast;
  }

}
