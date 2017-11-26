import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MusicGenrePage } from './music-genre';

@NgModule({
  declarations: [
    MusicGenrePage,
  ],
  imports: [
    IonicPageModule.forChild(MusicGenrePage),
  ],
})
export class MusicGenrePageModule {}
