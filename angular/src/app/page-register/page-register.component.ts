import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { LocalStorageService } from '../local-storage.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-page-register',
    templateUrl: './page-register.component.html',
    styleUrls: ['./page-register.component.css']
})

export class PageRegisterComponent implements OnInit {
    
    constructor(
        private api: ApiService,
        private storage: LocalStorageService,
        private router: Router,
        private title: Title,
    ) { }
    
    ngOnInit() {
        this.title.setTitle("FriendEnemies - Registro");
    }
    
    public formError = "";
        
    public credentials = {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        password_confirm: ''
    };
    
    public formSubmit() {
        this.formError = "";
        
        if(
            !this.credentials.first_name ||
            !this.credentials.last_name ||
            !this.credentials.email ||
            !this.credentials.password ||
            !this.credentials.password_confirm
        ) {
            return this.formError = "Todos los campos son requeridos.";
        }
        
        // Descomentar para validar que el formato sea el de correo electronico.
        // var re = new RegExp(/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/);
        // if (!re.test(this.credentials.email)) {
        //     return this.formError = "Por favor usa un email válido.";
        // }
        
        if(this.credentials.password !== this.credentials.password_confirm) {
            return this.formError = "La contraseña no coincide."
        }
        
        this.register();
    }
    
    
    private register() {
        let requestObject = {
            method: "POST",
            location: "users/register",
            body: this.credentials
        }
        
        this.api.makeRequest(requestObject).then((val) => {
            if(val.token) {
                this.storage.setToken(val.token);
                this.router.navigate(['/']);
                return;
            }
            if(val.message) { this.formError = val.message }
        });
    }
    
    
}
