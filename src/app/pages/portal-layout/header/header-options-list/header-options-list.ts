import { Component, inject, signal } from '@angular/core';
import { NgClass } from "@angular/common";
import { Auth } from '../../../../services/auth/auth';


@Component({
  selector: 'app-header-options-list',
  imports: [NgClass],
  templateUrl: './header-options-list.html',
  styleUrl: './header-options-list.less'
})
export class HeaderOptionsList {
  isMessage = signal<boolean>(false)
  isNotification = signal<boolean>(false)
  isProfile = signal<boolean>(false)
  userName = signal<string | null | undefined>(null); // holds current user's role

  private auth = inject(Auth); 

  logoutUser(){
    this.auth.logout()
  }

  ngOnInit(): void {
    this.userName.set(this.auth.getRole()?.name.toUpperCase());
  }

  setMessages(value?: boolean) {
    this.isMessage.set(value ?? !this.isMessage())
  }

  setNotification(value?: boolean) {
    this.isNotification.set(value ?? !this.isNotification())
  }

  setProfile(value?: boolean) {
    this.isProfile.set(value ?? !this.isProfile())
  }

  toggleMessageDropdown() {
    this.setMessages()
    this.setNotification(false)
    this.setProfile(false)
  }

  toggleNotificationDropdown() {
    this.setNotification()
    this.setMessages(false)
    this.setProfile(false)
  }

  toggleProfileDropdown() {
    this.setProfile()
    this.setNotification(false)
    this.setMessages(false)
  }

  // toggleFullScreen(){
  //   const doc: any = document;

  //   if(!doc.fullscreenElement){
  //     doc.documentElement.requestFullscreen()
  //   }else{
  //     doc.exitFullscreen()
  //   }

  // }

   toggleFullScreen(){
    const doc: any = document;
    const docEl: any = document.documentElement;
    if(!doc.fullscreenElement && 
      !doc.webkitFullscreenElement && 
      !doc.mozFullscreenElement && 
      !doc.msFullscreenElement
    ){
      if(docEl.requestFullscreen){
        docEl.requestFullscreen()
      }else if(docEl.webkitRequestFullscreen){
        docEl.webkitRequestFullscreen()
      }else if(docEl.mozRequestFullscreen){
        docEl.mozRequestFullscreen()
      }else if(docEl.msRequestFullscreen){
        docEl.msRequestFullscreen()
      }
    }else {
      if(doc.exitFullscreen){
        doc.exitFullscreen()
      }else if(doc.webkitExitFullscreen){
        doc.webkitExitFullscreen()
      }else if(doc.mozExitFullscreen){
        doc.mozExitFullscreen()
      }else if(doc.msExitFullscreen){
        doc.msExitFullscreen()
      }
    }
   }
}
