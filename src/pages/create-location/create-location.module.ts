import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateLocationPage } from './create-location';
import {Geolocation} from "@ionic-native/geolocation"

@NgModule({
  declarations: [
    CreateLocationPage,
  ],
  exports: [
    CreateLocationPage
  ],
  imports: [
    IonicPageModule.forChild(CreateLocationPage),
  ],
  providers: [
    Geolocation
  ]
})
export class CreateLocationPageModule {}
