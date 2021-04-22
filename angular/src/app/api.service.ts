import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalStorageService } from './local-storage.service';
import { EventEmitterService } from './event-emitter.service';
import { environment } from '../environments/environment';

@Injectable({
    providedIn: 'root'
})

export class ApiService {
    
    constructor(
        private http: HttpClient,
        private storage: LocalStorageService,
        private events: EventEmitterService,
    ) { }
    
    private baseUrl = environment.baseUrl;
    
    private successHandler(value) { return value; }
    private errorHandler(error) { return error; }
    
    
    public makeRequest(requestObject): any {
        let method = requestObject.method.toLowerCase();
        if(!method) { return console.log("No se ha especificado un metodo en la petición del objeto.") }
        
        let body = requestObject.body || {};
        let location = requestObject.location;
        if(!location) { return console.log("No se ha especificado una localización en la petición del objeto."); }
        
        let url = `${this.baseUrl}/${location}`;
        
        let httpOptions = {};
        
        
        if(this.storage.getToken()) {
            httpOptions = {
                headers: new HttpHeaders({
                    'Authorization': `Bearer ${this.storage.getToken()}`
                })
            }
        }
        
        
        if(method === "get") {
            return this.http.get(url, httpOptions).toPromise()
            .then(this.successHandler)
            .catch(this.errorHandler);
        }
        if(method === "post") {
            return this.http.post(url, body, httpOptions).toPromise()
            .then(this.successHandler)
            .catch(this.errorHandler);
        }
        
        console.log("No se ha podido realizar la petición. Comprueba que se utiliza el metodo GET o POST.");
    }
    
    public makeFriendRequest(to: string) {
        let from = this.storage.getParsedToken()._id;
        
        let requestObject = {
            location: `users/make-friend-request/${from}/${to}`,
            method: "POST"
        }
        
        return new Promise((resolve, reject) => {
            this.makeRequest(requestObject).then((val) => {
                if(val.statusCode === 201) {
                    this.events.onAlertEvent.emit("Petición de amistad enviada correctamente!");
                } else {
                    this.events.onAlertEvent.emit("Algo ha ido mal, no hemos podido enviar la petición de amistad. A lo mejor ya le has enviado una petición a ete usuario.");
                }
                resolve(val);
            });
        });
    }
    
    public resolveFriendRequest(resolution, id) {
        let to = this.storage.getParsedToken()._id;
        
        return new Promise((resolve, reject) => {
            let requestObject = {
                location: `users/resolve-friend-request/${id}/${to}?resolution=${resolution}`,
                method: "POST"
            }
            
            this.makeRequest(requestObject).then((val) => {
                if(val.statusCode === 201) {
                    this.events.updateNumOfFriendRequestsEvent.emit();
                    let resolutioned = (resolution == "accept") ? "aceptado" : "rechazado";
                    this.events.onAlertEvent.emit(`Se ha ${resolutioned} tu petición de amistad.`);
                } else {
                    this.events.onAlertEvent.emit("Algo ha ido mal y no se ha podido manejar tu petición de amistad.");
                }
                resolve(val);
            });
        });
    }
    
    public sendMessage(sendMessageObject, showAlerts = true) {
        if(!sendMessageObject.content && showAlerts) {
            this.events.onAlertEvent.emit("Tu mensaje no se ha enviado. Tienes que añadir contenido a tu mensaje");
            return;
        }
        
        let requestObject = {
            location: `users/send-message/${sendMessageObject.id}`,
            method: "POST",
            body: {
                content: sendMessageObject.content
            }
        }
        
        return new Promise((resolve, reject) => {
            this.makeRequest(requestObject).then((val) => {
                if(val.statusCode == 201 && showAlerts) {
                    this.events.onAlertEvent.emit("Tu mensaje se ha enviado.");
                }
                resolve(val);
            });
        });
    }
    
    public resetMessageNotifications() {    
        let requestObject = {
            location: "users/reset-message-notifications",
            method: "POST"
        }
        
        return new Promise((resolve, reject) => {
            this.makeRequest(requestObject).then((val) => {
                if(val.statusCode == 201) {
                    this.events.resetMessageNotificationsEvent.emit();
                }
                resolve();
            });
        });
        
    }
    
    
}
