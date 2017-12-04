import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class DataSourceProvider {

  constructor(public httpGeneral: Http) {
    console.log('Hello DataSourceProvider Provider');
  }

  getData(fileName: string) {
    return this.httpGeneral.get('assets/' + fileName+'.json').map((res: Response) => res.json());
  }
  //  login(username: string, password: string) {
  //   var parameters = { "username": username, "password": password };
  //   let seq = this.apiProvider.post('login', parameters, { responseType:'json',headers: this.headers });

  //   seq.subscribe((res: any) => {
  //     if(res.token.length>0){
  //       console.log('TOKEN');
  //       console.log(res);        
  //     }
  //   }, (err:any) => {
  //     console.log(err);
  //   });
  //   return seq;
  // }
}
