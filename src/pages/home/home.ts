import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { LoginPage } from '../../pages/login/login';

import {UbicacionProvider} from '../../providers/ubicacion/ubicacion';

import {UsuarioProvider} from '../../providers/usuario/usuario';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	lat: number = 51.678418;
  lng: number = 7.809007;

  user:any = {};

  constructor(public navCtrl: NavController, public _ubicacionProv:UbicacionProvider, public _usuarioProv: UsuarioProvider) {

  	this._ubicacionProv.iniciarGeoLocalizacion();

  	this._ubicacionProv.inicializarTaxista();

  	this._ubicacionProv.taxista.valueChanges().subscribe(data =>{ //data = dato del usuario de la db
  		this.user = data;
  	})
  }


  salir(){
  	
  	this._ubicacionProv.detenerUbicacion();

  	this._usuarioProv.borrarUsuario();

  	this.navCtrl.setRoot(LoginPage);
  }



}
