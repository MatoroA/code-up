import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators'
import { Item } from './home/home.page';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private afs: AngularFirestore) {
    console.log('Hello ServicesApiServiceProvider Provider');
  }


  addData(firstname:string, lastname:string, pledge:string){
    let data ={
      firstName: firstname,
      lastName: lastname,
      pledge: pledge
    };

    return new Promise( (resolve, reject) =>{

      this.afs.collection("items").add(data)
      .then( added =>{
        resolve( added );
      })
      .catch( error =>{
        reject( error );
      })
    })
  }
  delete(id){
    return this.afs.doc("items/"+id).delete();
  }

  getItemsData(){
    return this.afs.collection<Item>('items').snapshotChanges().pipe(
      map( actions => actions.map( a => {
        const data = a.payload.doc.data() as Item;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    )
  }
}

