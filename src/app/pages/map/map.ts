import { Component, ElementRef, Inject, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { ConferenceData } from '../../providers/conference-data';
import { Platform } from '@ionic/angular';
import { DOCUMENT} from '@angular/common';
import { NFC, Ndef } from '@ionic-native/nfc/ngx';
import { darkStyle } from './map-dark-style';
import { UserData } from '../../providers/user-data';
import { Router } from '@angular/router';

@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
  styleUrls: ['./map.scss'],
  providers: [NFC, Ndef]
})
export class MapPage implements OnInit {
  @ViewChild('mapCanvas', { static: true }) mapElement: ElementRef;

  constructor(
      private nfc: NFC, private ndef: Ndef,
    public userData: UserData,
    private router: Router) {}

    ngOnInit() {
    }

    ionViewWillEnter(){
      this.userData.TriggerOnConnection();
      this.addListenNFC();
    }
  
    addListenNFC(){
      let flags = this.nfc.FLAG_READER_NFC_A | 
                  this.nfc.FLAG_READER_NFC_V |
                  this.nfc.FLAG_READER_NFC_F |
                  this.nfc.FLAG_READER_NFC_B;
  
      this.nfc.readerMode(flags).subscribe(
        tag => {
          let tagId = this.nfc.bytesToHexString(tag.id);
          this.submitScanForm(tagId);
        },
        err => console.log(err)
      )
    }
  
    submitScanForm(tagId){
      
      const data = {
        nama_kategori : tagId,
        path_gambar   : "Scan NFC"
      };
  
      if(localStorage.getItem('dataTmpOfflineMode') != null){
        let getDataTmpOfflineMode = JSON.parse(localStorage.getItem('dataTmpOfflineMode'));
        localStorage.removeItem('dataTmpOfflineMode'); 
  
        getDataTmpOfflineMode.forEach(element => {
          const dataTmp = {
            nama_kategori : element.name_category_outlet,
            path_gambar   : element.img_path_category_outlet
          };
          this.userData.EngineInsert(dataTmp);
          console.log("Loop Data ==> "+ element.name_category_outlet);
        }); 
  
      }
  
      this.userData.EngineInsert(data);
   
    }
  
}



