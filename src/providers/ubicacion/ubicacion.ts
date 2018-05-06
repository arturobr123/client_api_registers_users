import { Injectable } from '@angular/core';

import { Geolocation } from '@ionic-native/geolocation';
														
														//observador de 1					observador de coleccion
import { AngularFirestore ,AngularFirestoreDocument, AngularFirestoreCollection} from 'angularfire2/firestore';

import {UsuarioProvider} from '../usuario/usuario';

import { Subscription } from 'rxjs/Subscription';

@Injectable()
export class UbicacionProvider {

	//es un observador de un documento
	taxista:AngularFirestoreDocument<any>; //puede haber una intefaz en vez de any (son los datos de los documentos en firestore)

	//un observador
	private watch:Subscription;




  constructor(private geolocation: Geolocation, private _usuarioProv:UsuarioProvider, private afDB:AngularFirestore ) {
    console.log('Hello UbicacionProvider Provider');

    //apuntamos a ese objeto con todos sus cambios ya que estamos usando AngularFirestoreDocument
    //this.taxista = this.afDB.doc('/usuarios/' +this._usuarioProv.clave);

  }

  inicializarTaxista(){
  	//apuntamos a ese objeto con todos sus cambios ya que estamos usando AngularFirestoreDocument
    this.taxista = this.afDB.doc('/usuarios/' +this._usuarioProv.clave);

  }


  iniciarGeoLocalizacion(){

  	var options = {
      enableHighAccuracy: true,
      timeout: 3000,
      maximumAge: 0
    };

  	this.geolocation.getCurrentPosition(options).then((resp) => {

		 // resp.coords.latitude
		 // resp.coords.longitude
		 console.log(resp.coords);

		 //actualiza en la bd de firestore
		 this.taxista.update({
		 	lat:resp.coords.latitude,
		 	lng:resp.coords.longitude,
		 	clave: this._usuarioProv.clave //solo por medida de seguridad, en realidad no es necesario
		 })


		 //OBSERVABLE!!!!!!!! PARA PODER SABER EN TIEMPO REAL SU UBICACION
			this.watch = this.geolocation.watchPosition(options).filter((p) => p.coords !== undefined).subscribe((data) => {
				 // data can be a set of coordinates, or an error (if an error occurred).
				 console.log("watch:" , data.coords);

				 //actualiza en la bd de firestore
				 this.taxista.update({
				 	lat:data.coords.latitude,
				 	lng:data.coords.longitude,
				 	clave: this._usuarioProv.clave //solo por medida de seguridad, en realidad no es necesario
				 })

			});


		}).catch((error) => {
		  console.log('Error getting location', error);
		});

  }




  detenerUbicacion(){

  	try{
  		this.watch.unsubscribe(); //se des-subscribe
  	}
  	catch(e){
  		console.log(JSON.stringify(e)); //pasa el error a json y lo imprime
  	}

  	

  }





}
