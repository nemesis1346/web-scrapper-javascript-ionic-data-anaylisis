import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataSourceProvider } from '../../providers/data-source/data-source';
/**
 * Generated class for the MusicGenrePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-music-genre',
  templateUrl: 'music-genre.html',
  providers: [DataSourceProvider]
})
export class MusicGenrePage {

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public dataSourceProvider: DataSourceProvider) {
  }

  ionViewDidLoad() {
    //this is a test
    this.dataSourceProvider.getData('musicGenreToronto').subscribe((data) => {
      console.log(data);
   });
  }

}
