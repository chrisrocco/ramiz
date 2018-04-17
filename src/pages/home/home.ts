import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {CreateLocationPage} from "../create-location/create-location"

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  locations = []

  constructor(public navCtrl: NavController) {
  }

  ionViewDidLoad() {
    this.locations = JSON.parse(localStorage.locations || '[]')
    setInterval(() => {
      this.locations = JSON.parse(localStorage.locations || '[]')
    }, 500)
  }

  newLocation () {
    console.log("clicked!")
    this.navCtrl.push('CreateLocationPage')
  }

}
