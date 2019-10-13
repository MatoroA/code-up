import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private afs: AngularFirestore) {
    console.log('Hello ServicesApiServiceProvider Provider');
  }


  addData(item:string){
    let data ={
      itemName: item
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

  getItemsData(){
    return this.afs.collection<Items>('items').snapshotChanges().pipe(
      map( actions => actions.map( a => {
        const data = a.payload.doc.data() as Items;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    )
  }
}

