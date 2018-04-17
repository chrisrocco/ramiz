import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {eventStream} from "../../app/events"
import {Geolocation} from "@ionic-native/geolocation"

declare let google;

/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public geolocation: Geolocation) {
  }

  ionViewDidLoad() {

    this.geolocation.getCurrentPosition()
      .then((resp) => {
          initMap({
            lat: resp.coords.latitude,
            lng: resp.coords.longitude
          })
        },
        (err) => {
          console.log('Error getting location', err);
        })

    function initMap(center) {
      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center
      });

      map.addListener('dblclick', function(event) {
        eventStream.next({
          type: 'location-picked',
          lat: event.latLng.lat(),
          lng: event.latLng.lng()
        })
      });
    }
  }

  onSubmit() {
    eventStream.next({
      type: 'location-picked',
      payload: {}
    })
  }

}
