import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UserData {
  favorites: string[] = [];
  HAS_LOGGED_IN = 'hasLoggedIn';
  HAS_SEEN_TUTORIAL = 'hasSeenTutorial';

  constructor(
    public storage: Storage,
    private http: HttpClient,
    private router: Router
  ) { }

  hasFavorite(sessionName: string): boolean {
    return (this.favorites.indexOf(sessionName) > -1);
  }

  addFavorite(sessionName: string): void {
    this.favorites.push(sessionName);
  }

  removeFavorite(sessionName: string): void {
    const index = this.favorites.indexOf(sessionName);
    if (index > -1) {
      this.favorites.splice(index, 1);
    }
  }

  login(username: string): Promise<any> {
    return this.storage.set(this.HAS_LOGGED_IN, true).then(() => {
      this.setUsername(username);
      return window.dispatchEvent(new CustomEvent('user:login'));
    });
  }

  signup(username: string): Promise<any> {
    return this.storage.set(this.HAS_LOGGED_IN, true).then(() => {
      this.setUsername(username);
      return window.dispatchEvent(new CustomEvent('user:signup'));
    });
  }

  logout(): Promise<any> {
    return this.storage.remove(this.HAS_LOGGED_IN).then(() => {
      return this.storage.remove('username');
    }).then(() => {
      window.dispatchEvent(new CustomEvent('user:logout'));
    });
  }

  setUsername(username: string): Promise<any> {
    return this.storage.set('username', username);
  }

  getUsername(): Promise<string> {
    return this.storage.get('username').then((value) => {
      return value;
    });
  }

  isLoggedIn(): Promise<boolean> {
    return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
      return value === true;
    });
  }

  checkHasSeenTutorial(): Promise<string> {
    return this.storage.get(this.HAS_SEEN_TUTORIAL).then((value) => {
      return value;
    });
  }

  public getData(){
    return this.http.get<any>(environment.api + '/customer/GetListCategory', {});
  }

  public EngineInsert(data){
    this.addData(data).subscribe( res => {
        if(res['error'] == false){
          console.log("Success ==> "+ JSON.stringify(res));
          this.router.navigateByUrl('/app/tabs/data');  
        } else{
          console.log("Fail ==> "+ JSON.stringify(res));
          this.router.navigateByUrl('/app/tabs/data');  
        }
      },
      err => {

        let myDataOfflineMode;

        if(localStorage.getItem('dataTmpOfflineMode') != null){

          myDataOfflineMode = JSON.parse(localStorage.getItem('dataTmpOfflineMode'));

          myDataOfflineMode.push({
            "id_category_outlet": "Offline Mode",
            "name_category_outlet": data.nama_kategori,
            "img_path_category_outlet": data.path_gambar
          });

          console.log(' <== Insert By Offline Mode Ketika ada Data Offline lalu di tambah ==> '+JSON.stringify(myDataOfflineMode));
        
        }else{

          myDataOfflineMode = [{
            "id_category_outlet": "Offline Mode",
            "name_category_outlet": data.nama_kategori,
            "img_path_category_outlet": data.path_gambar
          }];

        }
        
        localStorage.setItem('dataTmpOfflineMode', JSON.stringify(myDataOfflineMode));
        console.log(' <== Insert By Offline Mode ==> '+myDataOfflineMode);
        this.router.navigateByUrl('/app/tabs/data');  
      }
    );
  }

  public addData(data){
    return this.http.post(environment.api + "/customer/AddDataCategory", 
    {
      'name_category_outlet': data.nama_kategori, 
      'img_path_category_outlet': data.path_gambar
    },
    {headers:new HttpHeaders(
      {"content-Type":"application/json"}
    )});
  }

  public TriggerOnConnection(){

    this.getData().subscribe( res => {
      
      if(localStorage.getItem('dataTmpOfflineMode') != null){
        let getDataTmpOfflineMode = JSON.parse(localStorage.getItem('dataTmpOfflineMode'));
        localStorage.removeItem('dataTmpOfflineMode'); 
  
        getDataTmpOfflineMode.forEach(element => {
          const dataTmp = {
            nama_kategori : element.name_category_outlet,
            path_gambar   : element.img_path_category_outlet
          };
          this.EngineInsertTrigger(dataTmp);
        }); 
      }

    });
    
  }

  public EngineInsertTrigger(data){
    this.addData(data).subscribe( res => {
        if(res['error'] == false){
          console.log("Success ==> "+ JSON.stringify(res));
        } else{
          console.log("Fail ==> "+ JSON.stringify(res));
        }
      },
      err => {

        let myDataOfflineMode;

        if(localStorage.getItem('dataTmpOfflineMode') != null){

          myDataOfflineMode = JSON.parse(localStorage.getItem('dataTmpOfflineMode'));

          myDataOfflineMode.push({
            "id_category_outlet": "Offline Mode",
            "name_category_outlet": data.nama_kategori,
            "img_path_category_outlet": data.path_gambar
          });

          console.log(' <== Insert By Offline Mode Ketika ada Data Offline lalu di tambah ==> '+JSON.stringify(myDataOfflineMode));
        
        }else{

          myDataOfflineMode = [{
            "id_category_outlet": "Offline Mode",
            "name_category_outlet": data.nama_kategori,
            "img_path_category_outlet": data.path_gambar
          }];

        }
        
        localStorage.setItem('dataTmpOfflineMode', JSON.stringify(myDataOfflineMode));
        console.log(' <== Insert By Offline Mode ==> '+myDataOfflineMode);
        this.router.navigateByUrl('/app/tabs/data');  
      }
    );
  }
}
