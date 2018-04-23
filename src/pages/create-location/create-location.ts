import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Geolocation} from "@ionic-native/geolocation"
import {eventStream} from "../../app/events"
import {MapPage} from "../map/map"
import {getRepository} from "typeorm";
import {Location} from "../../entities/location";

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

  async submit() {

    const locationsRepo = getRepository('location')


    let location = new Location()
    location.lat = this.formModel.lat.toString()
    location.lng = this.formModel.lng.toString()
    location.name = this.formModel.name

    locationsRepo.save(location)

    eventStream.next({
      type: 'location-added',
      payload: {}
    })

    // Navigate back to home page
    this.navCtrl.pop()
  }

}
