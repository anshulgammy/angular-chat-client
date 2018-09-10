import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ChatService {
  private socket;

  constructor() { }

  createSocket = function(username) {
    this.socket = io.connect(environment.serverURL);
    this.socket.emit('new_user', username);
  }

  sendMessage = function(msg) {
    this.socket.emit('new_msg', {message: msg.message, username: msg.username});
  }

  public getMessages = () => {
    return Observable.create((observer) => {
        this.socket.on('new_msg_server', (message) => {
            observer.next(message);
        });
    });
  }

  public getUsers = () => {
    return Observable.create((observer) => {
        this.socket.on('new_user_server', (message) => {
            observer.next(message);
        });
    });
  }

  public whoseTyping = () => {
    return Observable.create((observer) => {
        this.socket.on('whosetyping_server', (message) => {
            observer.next(message);
        });
    });
  }

}
