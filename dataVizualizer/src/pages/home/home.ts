import { Component } from '@angular/core';
import { NavController,MenuController } from 'ionic-angular';
import { MusicGenrePage } from '../../pages/music-genre/music-genre';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  musicGenrePage: any;
  constructor(public navCtrl: NavController, public menuCtrl:  MenuController) {
    this.musicGenrePage = MusicGenrePage;
  }

  openMusicGenre() {
    this.navCtrl.push(this.musicGenrePage, {

    });
  }
  toggleMenu() {
    this.menuCtrl.open();
  }
}
