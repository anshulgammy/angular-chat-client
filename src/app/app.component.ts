import { Component } from '@angular/core';
import { ChatService } from './chat.service';

@Component({
  selector: 'chat-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  currentUser: string;
  currentMessage: string;
  msg: any = {};
  buttonDisabled: boolean = false;

  allMessages : string[] = [];

  constructor(private _chatService : ChatService) {

   }

  createSocket = function() {
    this._chatService.createSocket(this.currentUser);
    this.listenToUsersJoined();
    this.listenToMessages();
    this.listenToUsersTyping();
    this.buttonDisabled = true;
  }

  sendMessage = function() {
    this.msg.username = this.currentUser;
    this.msg.message = this.currentMessage;
    this._chatService.sendMessage(this.msg);
    this.currentMessage = "";
  }

  public listenToMessages() {
      this._chatService
        .getMessages()
        .subscribe((msg: {username, message}) => {
          console.log(msg);
          this.allMessages.push(msg.username + ' : ' + msg.message);
        });
  }

  public listenToUsersJoined() {
    this._chatService
      .getUsers()
      .subscribe((msg: string) => {
        console.log(msg);
        this.allMessages.push(msg + ' joined the conversation');
      });
  }

  public listenToUsersTyping() {
    this._chatService
      .whoseTyping()
      .subscribe((msg: {username}) => {
        console.log(msg);
        this.allMessages.push(msg.username + ' is typing...');
      });
  }
}
