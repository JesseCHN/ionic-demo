import { NgModule, ErrorHandler } from '@angular/core';
import { Globalization } from '@ionic-native/globalization';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';

import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { DiscoveryPage } from '../pages/discovery/discovery';
import { ChatPage } from '../pages/chat/chat';
import { NotificationPage } from '../pages/notification/notification';
import { MorePage } from '../pages/more/more';
import { UserPage } from '../pages/user/user';
import { HeadfacePage } from '../pages/headface/headface';
import { DetailsPage } from '../pages/details/details';
import { AnswerPage } from '../pages/answer/answer';
import { ChatdetailsPage } from '../pages/chatdetails/chatdetails';
import { ScanPage } from '../pages/scan/scan';

import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { QuestionPage } from '../pages/question/question';
import { UserdataListPage } from '../pages/userdata-list/userdata-list';
import { VersionsPage } from '../pages/versions/versions';

import { ComponentsModule } from '../components/components.module';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { RestProvider } from '../providers/rest/rest';
import { BackButtonService } from '../providers/back/backButton';

import { File } from '@ionic-native/file';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { EmojiProvider } from '../providers/emoji/emoji';
import { ChatserviceProvider } from '../providers/chatservice/chatservice';

import { RelativetimePipe } from '../pipes/relativetime/relativetime';
import { SettingsProvider } from '../providers/settings/settings';

import { QRScanner } from '@ionic-native/qr-scanner';
import { AppVersion } from '@ionic-native/app-version';

@NgModule({
  declarations: [
    MyApp,
    DiscoveryPage,
    ChatPage,
    NotificationPage,
    MorePage,
    HomePage,
    TabsPage,
    LoginPage,
    RegisterPage,
    UserPage,
    HeadfacePage,
    QuestionPage,
    DetailsPage,
    AnswerPage,
    ChatdetailsPage,
    RelativetimePipe,
    UserdataListPage,
    ScanPage,
    VersionsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp,{
      backButtonText: '返回'
    }),
    ComponentsModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    DiscoveryPage,
    ChatPage,
    NotificationPage,
    MorePage,
    HomePage,
    TabsPage,
    LoginPage,
    RegisterPage,
    UserPage,
    HeadfacePage,
    QuestionPage,
    DetailsPage,
    AnswerPage,
    ChatdetailsPage,
    UserdataListPage,
    ScanPage,
    VersionsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RestProvider,
    BackButtonService,
    Globalization,
    File,
    FilePath,
    Camera,
    FileTransfer,
    EmojiProvider,
    ChatserviceProvider,
    SettingsProvider,
    QRScanner,
    AppVersion
  ]
})
export class AppModule {}
