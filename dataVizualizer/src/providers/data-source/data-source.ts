import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';
import { ApiProvider } from '../api/api';

@Injectable()
export class DataSourceProvider {

  constructor(public httpGeneral: Http, public apiProvider: ApiProvider) {
    console.log('Hello DataSourceProvider Provider');
  }

  getData(city: string, param: string) {
    var parameters = { "city": city, "param": param };
    let seq = this.apiProvider.post('login', parameters);

    seq.subscribe((res: any) => {

      console.log('TOKEN');
      console.log(res);

    }, (err: any) => {
      console.log(err);
    });
    return seq;

  }

}
