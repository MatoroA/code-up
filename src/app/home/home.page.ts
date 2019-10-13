import { Component } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  private itemName: string = null;
  constructor(private _api: ApiService) {
    _api.getItemsData().subscribe(res=>{
      console.log(res)
    })
  }

  addItem(){
    console.log(this.itemName)
    this._api.addData(this.itemName)
  }

  

}
