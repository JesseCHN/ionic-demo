import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';

/**
 * Generated class for the ScanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-scan',
  templateUrl: 'scan.html',
})
export class ScanPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public qrScanner: QRScanner,public alertCtrl:AlertController) {
  }

  ionViewDidLoad() {
  }

  ionViewDidEnter() {
    this.scanQRCode();
  }

  ionViewDidLeave() {
    window.document.querySelector('ion-app').classList.remove('transparent-body');
  }

  scanQRCode(){
    this.qrScanner.prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized) {
          // camera permission was granted


          // start scanning
          let scanSub = this.qrScanner.scan().subscribe((text: string) => {
            console.log('Scanned something', text);
            let alert = this.alertCtrl.create({
              title: '二维码内容',
              subTitle: text,
              buttons:['OK']
            });
            alert.present();

            this.qrScanner.hide(); // hide camera preview
            scanSub.unsubscribe(); // stop scanning
            window.document.querySelector('ion-app').classList.remove('transparent-body');
          });

          // show camera preview
          this.qrScanner.show();
          window.document.querySelector('ion-app').classList.add('transparent-body');

          // wait for user to scan something, then the observable callback will be called

        } else if (status.denied) {
          // 用户没有开启相机权限
          // camera permission was permanently denied
          // you must use QRScanner.openSettings() method to guide the user to the settings page
          // then they can grant the permission from there
        } else {
          // 其他错误
          // permission was denied, but not permanently. You can ask for permission again at a later time.
        }
      })
      .catch((e: any) => console.log('Error is', e));
  }

}
