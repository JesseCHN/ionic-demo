import { Component, ViewChild } from '@angular/core';
import { Platform, Tabs } from 'ionic-angular';

import { HomePage } from '../home/home';
import { DiscoveryPage } from '../discovery/discovery';
import { ChatPage } from '../chat/chat';
import { NotificationPage } from '../notification/notification';
import { MorePage } from '../more/more';
import { BackButtonService } from "../../providers/back/backButton";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  @ViewChild('myTabs') tabRef: Tabs;

  tabHome = HomePage;
  tabDiscovery = DiscoveryPage;
  tabChat = ChatPage;
  tabNotification = NotificationPage;
  tabMore = MorePage;

  constructor(public backButtonService: BackButtonService,
              private platform: Platform) {
    platform.ready().then(() => {
          this.backButtonService.registerBackButtonAction(this.tabRef);
      });
  }
  
}
