import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserdataListPage } from './userdata-list';

@NgModule({
  declarations: [
    UserdataListPage,
  ],
  imports: [
    IonicPageModule.forChild(UserdataListPage),
  ],
})
export class UserdataListPageModule {}
