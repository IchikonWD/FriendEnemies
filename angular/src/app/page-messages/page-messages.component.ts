import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ApiService } from '../api.service';
import { AutoUnsubscribe } from '../unsubscribe';
import { EventEmitterService } from '../event-emitter.service';

@Component({
    selector: 'app-page-messages',
    templateUrl: './page-messages.component.html',
    styleUrls: ['./page-messages.component.css']
})


@AutoUnsubscribe
export class PageMessagesComponent implements OnInit {
    
    constructor(
        private title: Title,
        private api: ApiService,
        private events: EventEmitterService,
    ) { }
    
    ngOnInit() {
        this.title.setTitle("FriendEnemies - Mensajes"); 
        this.api.resetMessageNotifications(); 
        
        if(history.state.data && history.state.data.msgId) {
            this.activeMessage.fromId = history.state.data.msgId;
        }
        
        let userDataEvent = this.events.getUserData.subscribe((user) => {
            if(!user.messages.length) { return; }
            this.activeMessage.fromId = this.activeMessage.fromId || user.messages[0].from_id;
            this.messages = user.messages.reverse();
            this.usersName = user.name;
            this.usersId = user._id;
            this.usersProfileImage = user.profile_image;
            this.setActiveMessage(this.activeMessage.fromId);
        });
        
        this.subscriptions.push(userDataEvent);
    }
    
    public activeMessage = {
        fromId: "",
        fromName: "",
        fromProfilePicture: "",
        messageGroups: []
    }
    
    public messages = [];
    public usersProfileImage = "default-avatar";
    public usersName = "";
    public usersId = "";
    public newMessage = "";
    private subscriptions = [];
    
    public setActiveMessage(id) {
        for(let message of this.messages) {
            if(message.from_id == id) {
                this.activeMessage.fromId = message.from_id;
                this.activeMessage.fromName = message.messengerName;
                this.activeMessage.fromProfilePicture = message.messengerProfileImage;
                
                let groups = (this.activeMessage.messageGroups = []);
                for(let content of message.content) {
                    
                    let me = (content.messenger == this.usersId);

                    if(groups.length) {
                        var lastMessengerId = groups[groups.length - 1].id;
                        
                        if(content.messenger == lastMessengerId) {
                            groups[groups.length - 1].messages.push(content.message);
                            continue;
                        }
                    }
                    
                    let group = {
                        image: me ? this.usersProfileImage : message.messengerProfileImage,
                        name: me ? "Me" : message.messengerName,
                        id: content.messenger,
                        messages: [content.message],
                        isMe: me
                    }
                    groups.push(group);
                }
            }
        }
    }
    
    public sendMessage() {
        if(!this.newMessage) { return; }
        let obj = {
            content: this.newMessage,
            id: this.activeMessage.fromId
        }
        
        
        this.api.sendMessage(obj, false).then((val: any) => {
            if(val.statusCode == 201) {
                let groups = this.activeMessage.messageGroups;
                if(groups[groups.length - 1].isMe) {
                    groups[groups.length - 1].messages.push(this.newMessage);
                } else {
                    let newGroup = {
                        image: this.usersProfileImage,
                        name: this.usersName,
                        id: this.usersId,
                        messages: [this.newMessage],
                        isMe: true
                    }
                    groups.push(newGroup);
                }
                
                for(let message of this.messages) {
                    if(message.from_id == this.activeMessage.fromId) {
                        let newContent = {
                            message: this.newMessage,
                            messenger: this.usersId
                        }
                        message.content.push(newContent);
                    }
                }
                
                this.newMessage = "";
            }
        });
    }
    
    public deleteMessage(msgId) {
        let requestObject = {
            location: `users/delete-message/${msgId}`,
            method: "POST"
        }
        
        this.api.makeRequest(requestObject).then((val) => {
            if(val.statusCode == 201) {
                for(let i = 0; i < this.messages.length; i++) {
                    if(this.messages[i]._id == msgId) {
                        this.messages.splice(i, 1);
                        if(!this.messages.length) { return; }
                        this.setActiveMessage(this.messages[0].from_id);
                        break;
                    }
                }
            }
        });
    }
    
    
    
}
