import { Component } from '@angular/core';
import { NavController,MenuController,AlertController } from 'ionic-angular';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  constructor(public navCtrl: NavController, 
    public menuCtrl:  MenuController,
  public alertController: AlertController) {
  }

  onSelectCity(city){
    if(city&&city!=""){

    }else{
      
    }
  }

  alertCityNotSelected() {
    const alert = this.alertController.create({
      title: 'City not Selected',
      subTitle: 'Please select a city',
      buttons: [{
        text: 'Ok',
        handler: () => {
          this.navCtrl.pop();
        }
      }]
    });
    alert.present();
  }

}
