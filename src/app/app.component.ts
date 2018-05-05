import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';


import {UsuarioProvider} from '../providers/usuario/usuario';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public _usuarioProv:UsuarioProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      

      this._usuarioProv.cargarStorage().then(existe =>{

        statusBar.styleDefault();
        splashScreen.hide();

        //si el usuario ya se logeo
        if(existe){
          this.rootPage = HomePage;
        }
        //si el usuario NO se HA logeo
        else{
          this.rootPage = LoginPage;
        }
      })

      
    });
  }
}

