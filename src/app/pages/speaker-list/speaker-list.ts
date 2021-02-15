import { Component } from '@angular/core';
import { ConferenceData } from '../../providers/conference-data';
import { UserData } from '../../providers/user-data';

@Component({
  selector: 'page-speaker-list',
  templateUrl: 'speaker-list.html',
  styleUrls: ['./speaker-list.scss'],
})
export class SpeakerListPage {
  speakers: any[] = [];
  myData            : any;
  myDataOfflineMode : any;

  constructor(
    public confData: ConferenceData,
    public userData: UserData
    ) {}

  ionViewDidEnter() {
    this.loadDataRestApi();
  }

  loadDataRestApi(){
    this.userData.getData().subscribe( (data:any[]) =>{
      // console.log('Data Saya ===>'+JSON.stringify(data['category']));
      localStorage.setItem('dataTmp', JSON.stringify(data['category']));
      this.myData = JSON.parse(localStorage.getItem('dataTmp'));
      this.myDataOfflineMode = JSON.parse(localStorage.getItem('dataTmpOfflineMode'));
    },
    err => {
      this.myData = JSON.parse(localStorage.getItem('dataTmp'));
      this.myDataOfflineMode = JSON.parse(localStorage.getItem('dataTmpOfflineMode'));
      console.log(' <== Offline Mode ==> '+ this.myDataOfflineMode);
    });
  }
}
