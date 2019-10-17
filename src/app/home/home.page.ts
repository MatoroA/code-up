import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { AlertController } from '@ionic/angular';
import { database } from 'firebase';

export interface Item{
  firstName: string;
  lastName: string;
  userProfile: string;
  selected: boolean;
  pledge: string;
  id: number;
  color: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public progress: number = 0;
  public pressState: string = "released";

  // Interval function
  protected interval: any;
  private itemName: string = null;

  private selectedItems: Item[] = [];
  private temporarySelectedItems: Item[] = [];
  private listOfPeople = [];

  private arrayColors: string[] = [
    "#e84e40","#ec407a","#ab47bc","#7e57c2","#9ccc65","#ff7043",
    "#e51c23","#9c27b0","#3f51b5","#03a9f4","#00bcd4","#009688",
    "#259b24","#cddc39","#8bc34a","#5c6bc0","#738ffe","#29b6f6",
    "#26c6da","#26a69a","#2baf2b","#e91e63","#673ab7","#5677fc",
    "#607d8b","#9e9e9e","#795548","#ff5722","#ffeb3b","#ffeb3b"
  ]
  constructor(private _api: ApiService, public alertController: AlertController) {
    
    _api.getItemsData().subscribe(res => {
      this.listOfPeople = [];
      for(let i = 0; i < res.length; i++){
        let color = this.arrayColors[ Math.floor(Math.random() * this.arrayColors.length)  ];
        let obj = {
          firstname: res[i].firstName,
          lastname: res[i].lastName,
          pledge: res[i].pledge,
          selected: false,
          userProfile: res[i].firstName.substring(0,1),
          color: color,
          id: res[i].id
        };

        this.listOfPeople.push(obj);
      }
    })

    
  }
  ionViewDidLoad(){

    
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Confirm',
      message: 'Are you sure you wanna delete?',
      buttons: [{
        text: 'Delete',
        handler: () => {
          console.log(this.selectedItems)
          for(let d = 0; d < this.selectedItems.length; d++){
            this._api.delete(this.selectedItems[d].id);
          }
          this.selectedItems = []
        }
        }],
    });

    await alert.present();
  }

  cancelSelection(){
    for(let i = 0; i < this.selectedItems.length; i++){
      if(this.selectedItems[i].selected){
        this.selectedItems[i].selected = !this.selectedItems[i].selected;
      }
    }
    this.selectedItems = [];
  }

  async addItem() {

    const alert = await this.alertController.create({
      header: 'Prompt!',
      inputs: [
        {
          name: 'firstname',
          type: 'text',
          placeholder: 'Firstname'
        },
        {
          name: 'lastname',
          type: 'text',
          placeholder: 'Lastname'
        },
        {
          name: 'pledge',
          type: 'text',
          placeholder: 'Am pledging...'
        },
        
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (data) => {
            if(data.firstname != '' && data.lastname !='' && data.pledge != ''){
              this._api.addData(data.firstname, data.lastname, data.pledge);
            }
          }
        }
      ]
    });

    await alert.present();
    // console.log(this.itemName)
    // this._api.addData(this.itemName)
  }

  onPress(item: Item) {

    setTimeout(() => {
      /** spinner ends after .5 seconds */
      this.selectedItem(item);
    }, 500);
  }
  onItemClick(item: Item){
    console.log(item)

    if(this.selectedItems.length > 0 ){
      this.selectedItem(item);
    }else{
      console.log('okay this should works just fine...')
    }
  }
  selectedItem(item: Item){

    this.temporarySelectedItems = [];
    item.selected = !item.selected;

    if(item.selected){
      this.selectedItems.push(item);
    }else{
      for(let i = 0; i < this.selectedItems.length; i++){
        if(this.selectedItems[i].selected){
          this.temporarySelectedItems.push(this.selectedItems[i])
        }
      }

      this.selectedItems = this.temporarySelectedItems;
    }
    
  }



}
