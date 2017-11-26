import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';

/*
  Generated class for the DataSourceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataSourceProvider {

  constructor(public httpGeneral: Http) {
    console.log('Hello DataSourceProvider Provider');
  }

  getData(fileName: string) {
    return this.httpGeneral.get('assets/' + fileName+'.json').map((res: Response) => res.json());
  }
}
