import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Title } from '@angular/platform-browser';
import { LocalStorageService } from '../local-storage.service';
import { EventEmitterService } from '../event-emitter.service';

@Component({
    selector: 'app-page-feed',
    templateUrl: './page-feed.component.html',
    styleUrls: ['./page-feed.component.css']
})

export class PageFeedComponent implements OnInit {
    
    constructor(
        private api: ApiService,
        private title: Title,
        private storage: LocalStorageService,
        private events: EventEmitterService,
    ) { }
    
    ngOnInit() {
        this.title.setTitle("FriendEnemies - Feed");
        
        let requestObject = {
            location: "users/generate-feed",
            method: "GET",
        }
        
        this.api.makeRequest(requestObject).then((val) => {
            if(val.statusCode == 200) {
                this.bestiePosts = val.bestiePosts
                
                let fullCol1 = val.posts.filter((val, i) => i % 4 === 0);
                let fullCol2 = val.posts.filter((val, i) => i % 4 === 1);
                let fullCol3 = val.posts.filter((val, i) => i % 4 === 2);
                let fullCol4 = val.posts.filter((val, i) => i % 4 === 3);
        
                let cols = [fullCol1, fullCol2, fullCol3, fullCol4];
        
                this.addPostToFeed(cols, 0, 0);
            }
        });
    }
    
    public bestiePosts = [];
    public posts = {
        col1: [],
        col2: [],
        col3: [],
        col4: [],
    }
    
    
    public newPostContent: string = "";
    public newPostTheme: string =  this.storage.getPostTheme() || "primary";
    
    public changeTheme(newTheme) {
        this.newPostTheme = newTheme;
        this.storage.setPostTheme(newTheme);
    }
    
    public createPost() {
        if(this.newPostContent.length == 0) {
            return this.events.onAlertEvent.emit("No hay contenido en tu post.");
        }
        
        
        let requestObject = {
            location: "users/create-post",
            method: "POST",
            body: {
                theme: this.newPostTheme,
                content: this.newPostContent,
            }
        }
        
        this.api.makeRequest(requestObject).then((val) => {
            if(val.statusCode == 201) {
                val.newPost.ago = "Ahora";
                this.posts.col1.unshift(val.newPost);
            } else {
                this.events.onAlertEvent.emit("Algo ha ido mal, tu post no ha sido creado.");
            }
            this.newPostContent = "";
        });
    }
    
    private addPostToFeed(array, colNumber, delay) {
        setTimeout(() => {
            if(array[colNumber].length) {
                this.posts["col" + (colNumber + 1)].push(array[colNumber].splice(0, 1)[0]);
                colNumber = ++colNumber % 4;
                this.addPostToFeed(array, colNumber, 100);
            }
        }, delay);
    }
    
    
}
