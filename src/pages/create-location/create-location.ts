import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Geolocation} from "@ionic-native/geolocation"
import {eventStream} from "../../app/events"
import {MapPage} from "../map/map"

declare let google;

@IonicPage()
@Component({
  selector: 'page-create-location',
  templateUrl: 'create-location.html',
})
export class CreateLocationPage {

  formModel = {
    lat: 0,
    lng: 0,
    name: ''
  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private geolocation: Geolocation
  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateLocationPage');

    eventStream.subscribe( event => {
      switch (event['type']) {
        case "location-picked":
          this.formModel.lat = event['lat']
          this.formModel.lng = event['lng']
          this.navCtrl.pop()
      }
    })
  }

  openMap() {

    this.navCtrl.push('MapPage')

    console.log('opening')
  }

  findMe() {
    this.geolocation.getCurrentPosition()
      .then((resp) => {
          this.formModel.lat = resp.coords.latitude
          this.formModel.lng = resp.coords.longitude
        },
        (err) => {
          console.log('Error getting location', err);
        })
  }

  submit() {
    // Save the location to localStorage
    localStorage.locations = localStorage.locations || '[]'
    let locations = JSON.parse(localStorage.locations)
    locations.push({ ...this.formModel })
    localStorage.locations = JSON.stringify(locations)
    console.log(JSON.parse(localStorage.locations))

    // Navigate back to home page
    this.navCtrl.pop()
  }

}
