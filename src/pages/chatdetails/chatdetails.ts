import {Component, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams, Content, TextInput } from 'ionic-angular';
import {ChatMessage, ChatserviceProvider} from '../../providers/chatservice/chatservice';
import {RestProvider} from "../../providers/rest/rest";
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';

/**
 * Generated class for the ChatdetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chatdetails',
  templateUrl: 'chatdetails.html',
})
export class ChatdetailsPage {

  chatUserName: string;
  chatUserId: string;
  userId:string;
  userName: string;
  userImgUrl: string;
  editorMessage: string = '';
  isOpenEmojiPicker = false;
  messageList: ChatMessage[];
  errMessage: any;
  @ViewChild(Content) content:Content;
  @ViewChild('chatInput') messageInput:TextInput;

  constructor(public navCtrl: NavController, public navParams: NavParams, public  chatService:ChatserviceProvider,
              public storage:Storage, public rest:RestProvider,public event:Events) {
    this.chatUserName = navParams.get('username');
    this.chatUserId = navParams.get('userid');
  }

  ionViewDidLoad() {
  }

  ionViewDidEnter() {
    this.storage.get('UserId').then((val)=>{
      if (val!=null){
        this.rest.getUserInfo(val)
          .subscribe(
            userinfo =>{
              this.userId = '140000198202211138';
              this.userName = userinfo['UserNickName'];
              this.userImgUrl = userinfo["UserHeadface"] + "?" + (new Date().valueOf());
              this.getMessages()
                .then(()=>{
                  this.scrollToBottom();
                });
            },
            error => this.errMessage = <any>error
          );
      }
    });

    this.event.subscribe('chat.received', (msg,time)=> {
      this.messageList.push(msg);
      this.scrollToBottom();
    });

  }

  getMessages() {
    return this.chatService.getMessageList()
      .then(res=>{
        this.messageList = res;
      })
      .catch(error =>{
        console.error(error);
      });
  }

  switchEmoji(){
    this.isOpenEmojiPicker = !this.isOpenEmojiPicker;
  }

  sendMessage() {
    if(!this.editorMessage.trim()){
      return;
    }
    const  id =Date.now().toString();
    let messageSend : ChatMessage = {
      messageId : id,
      userId : this.userId,
      username: this.userName,
      userImgUrl: this.userImgUrl,
      toUserId: this.chatUserId,
      time: Date.now(),
      message: this.editorMessage,
      status:'pending'
    };

    this.messageList.push(messageSend);
    this.scrollToBottom();

    this.editorMessage = '';

    if(!this.isOpenEmojiPicker){
      this.messageInput.setFocus();

    }
    this.chatService.sendMessage(messageSend)
      .then(()=>{
        let index = this.getMessagesIndex(id);
        if(index!== -1){
          this.messageList[index].status = 'success';
        }
      });

  }

  getMessagesIndex(id){
    return this.messageList.findIndex(e=> e.messageId === id);

  }

  focus(){
    this.isOpenEmojiPicker = false;
    this.content.resize();

  }

  ionViewWillLeave() {
    this.event.unsubscribe('chat.received');
  }

  scrollToBottom(): any {
    setTimeout(()=>{
      if(this.content.scrollToBottom){
        this.content.scrollToBottom();
      }
    },400);
  }

}
