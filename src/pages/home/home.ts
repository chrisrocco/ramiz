import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {CreateLocationPage} from "../create-location/create-location"
import {getRepository} from "typeorm";
import {eventStream} from "../../app/events";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  locations: any

  constructor(public navCtrl: NavController) {
  }

  ionViewDidLoad() {
    setTimeout(this.loadLocations.bind(this)  , 3000)


    eventStream.subscribe( event => {
      if(event['type'] === 'location-added') {
        this.loadLocations()
      }
    })
  }

  async loadLocations() {
    const locationsRepo = getRepository('location')
    this.locations = await locationsRepo.find()
    console.log(this.locations)
  }

  newLocation () {
    console.log("clicked!")
    this.navCtrl.push('CreateLocationPage')
  }

}
