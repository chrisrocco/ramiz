import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { createConnection } from 'typeorm'

/*
  Generated class for the DbProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DbProvider {

  constructor(public http: HttpClient) {

  }

}
