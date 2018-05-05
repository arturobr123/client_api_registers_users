import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController } from 'ionic-angular';

import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import {UsuarioProvider} from '../../providers/usuario/usuario';

import { HomePage } from '../../pages/home/home';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
	@ViewChild(Slides) slides: Slides;

  constructor(public navCtrl: NavController, public alertCtrl:AlertController, 
  						public loadingCtrl:LoadingController, public _usuarioProv : UsuarioProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');

    this.slides.paginationType = 'progress'; //que los slides se vean como lineas de progreso
    this.slides.lockSwipes(true); //bloquear que se puedan mov er por los slides
    this.slides.freeMode = false; //bloquear que se puedan mov er por los slides

  }


  mostrarInput(){

  	let alert = this.alertCtrl.create({
  		title: 'Low battery',
    	inputs: [{
    		name: 'username', //este el dato que voy obtener.    data.username
    		placeholder: 'username'
    	}],
    	buttons: [{
    		text:'Cancelar',
    		role:'cancel'
    	},
    	{
    		text:'Ingresar',
    		handler: data =>{
    			console.log(data);
    			this.verificarUsuario(data.username);
    		}
    	}]
  	})

  	alert.present();


  }


  verificarUsuario(clave:string){
  	let loading = this.loadingCtrl.create({
  		content:"verificando"
  	});

  	loading.present();

  	//verifica que el usuario ingresado exista en la bd
  	this._usuarioProv.verificaUsuario(clave).then(existe => {

  		loading.dismiss(); //quitar loading

  		//si el usuario si existe
  		if(existe == true){

  			this.slides.lockSwipes(false);  //desbloquear slides
    		this.slides.freeMode = true; //desbloquear slides
    		this.slides.slideNext(); //MOVERTE AL SIGUIENTE SLIDE !!!!
    		this.slides.lockSwipes(true);  //volver a bloquer slides
    		this.slides.freeMode = false; //volver a bloquer slides

  		}
  		else{

  			let noUsuario = this.alertCtrl.create({
  				title:"Usuario incorrecto",
  				subTitle:"Hable con el administrador o intente de nuevo",
  				buttons: ['Aceptar']
  			});

  			noUsuario.present();

  		}
  	})

  }



  //ingresar a la app
  ingresar(){
  	this.navCtrl.setRoot(HomePage);
  }


}











