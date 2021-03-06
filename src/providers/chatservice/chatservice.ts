import { Injectable } from '@angular/core';
import { Http,Response } from '@angular/http';
import { Events } from 'ionic-angular';

/*
  Generated class for the ChatserviceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

// 聊天信息的属性
export class ChatMessage {
  messageId: string;
  userId: string;
  username: string;
  userImgUrl: string;
  toUserId: string;
  time: number | string;
  message: string;
  status: string;
}

// 用户信息的属性
export class UserInfo {
  userId: string;
  userName: string;
  userImgUrl: string;
}


@Injectable()
export class ChatserviceProvider {

  constructor(public http: Http,public event:Events) {

  }

  // 获取消息列表
  getMessageList(): Promise<ChatMessage[]> {
    const url = '../assets/mock/msg-list.json';
    return this.http.get(url)
      .toPromise()
      .then(response => response.json()['array'] as ChatMessage[])
      .catch(error => Promise.reject(error || '错误信息'));
  }

  sendMessage(message: ChatMessage) {
    return new Promise(resolve => setTimeout(() => {
      resolve(message)
    }, Math.random() * 1000))
      .then(() => {
        this.mockNewMessage(message); // 慕女神mock 数据
      });
  }

  // 引入event模块

  mockNewMessage(message: any) {
    const  id =Date.now().toString();
    let messageSend : ChatMessage = {
      messageId : id,
      userId : '123321',
      username: '慕女神',
      userImgUrl: 'http://img.mukewang.com/user/57a322f00001e4ae02560256-40-40.jpg',
      toUserId: message.userId,
      time: Date.now(),
      message: '你是不是刚才给我发送了「' + message.message + '」？',
      status:'success'
    }

    setTimeout(()=>{
      this.event.publish('chat.received',messageSend,Date.now());
    },Math.random()*1000);

  }

}
