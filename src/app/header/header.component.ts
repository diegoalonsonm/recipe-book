import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {DataStorageService} from "../shared/data-storage.service";
import {AuthService} from "../auth/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{
  isAuthenticaded = false;
  private userSub: Subscription;

   constructor(private dataStorageService: DataStorageService, private authService: AuthService) {
  }

  ngOnInit(){
     this.userSub = this.authService.user.subscribe(user => {
       this.isAuthenticaded = !!user;
     });
     this.onFetchData();
  }

  onSaveData(){
    this.dataStorageService.storeRecipe();
  }

  onFetchData(){
    this.dataStorageService.fetchRecipe().subscribe();
  }

  onLogout() {
     this.authService.logout();
  }

  ngOnDestroy() {
     this.userSub.unsubscribe();
  }
}
