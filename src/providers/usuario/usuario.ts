import { Injectable } from '@angular/core';

import { AngularFirestore } from 'angularfire2/firestore';

//PARA DETECTAR SI ESTAMOS EN WEB O EN TELEFONO
import {Platform} from 'ionic-angular';

//BD LOCAL
import { Storage } from '@ionic/storage';

import { Subscription } from 'rxjs/Subscription';

@Injectable()
export class UsuarioProvider {

	clave :string;
	user: any;

	private doc:Subscription;

  constructor(private afDB:AngularFirestore , private platform:Platform, private storage:Storage) {
    console.log('Hello UsuarioProvider Provider');
  }

  verificaUsuario(clave:string){

  	//es ascincrono por eso usamos promesas

  	//estructura basica de una promesa
  	// return new Promise((resolve,reject) =>{. 
  		
  	// })

  	clave = clave.toLowerCase();

  	return new Promise((resolve,reject) =>{
  		//subcribir y estoy pendiende en los cambios que haya en ese usuario
  		this.doc = this.afDB.doc('/usuarios/' + clave).valueChanges().subscribe( data => { 
  			console.log(data);

  			if(data){
  				//correcto
  				this.clave = clave;
  				this.user = data;
  				this.guardarStorage();
  				resolve(true);
  			}
  			else{
  				//incorrecto
  				resolve(false);
  			}

  			
  		}) 

  	})


  }

  //GUARDAMOS EN EL DISPOSITIVO NATIVO
  guardarStorage(){
  	if(this.platform.is('cordova')){
  		//MOVIL
  		this.storage.set('clave', this.clave);
  	}	
  	else{
  		//ESCRITORIO
  		localStorage.setItem('clave', this.clave);
  	}
  }


  //LEEAR DEL LOCAL STORAGE
  cargarStorage(){

  	return new Promise((resolve, reject) => {

  		if(this.platform.is('cordova')){
	  		//MOVIL
	  		this.storage.get('clave').then((val) => {

	  			if(val){
	  				this.clave = val;
	  				resolve(true);
	  			}
	  			else{
	  				resolve(false);
	  			}

		    });

	  	}	
	  	else{
	  		//ESCRITORIO
	  		if(localStorage.getItem('clave')){
	  			this.clave = localStorage.getItem('clave');
	  			resolve(true);
	  		}
	  		else{
	  			resolve(false);
	  		}
	  	}

  	})

  }



  //borrar la info del usuario incluyendo la informacion guardada en la bd local
  borrarUsuario(){
  	this.clave = null;

  	if(this.platform.is('cordova')){
  		//MOVIL
  		this.storage.remove('clave');
  	}	
  	else{
  		//ESCRITORIO
  		localStorage.removeItem('clave');
  	}

  	this.doc.unsubscribe(); //para dejar de seguir escuchando!! y cancelar los observadores

  }


}







