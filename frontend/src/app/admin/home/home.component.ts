import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  showProduct:boolean = false;
  showCollections:boolean = true;
  showUsers:boolean = false;

  constructor(
    public auth: AuthService
  ) { }

  ngOnInit(): void {
  }

 openNav() {
   // @ts-ignore
  document.getElementById("mySidebar").style.width = "250px";
   // @ts-ignore
  document.getElementById("sub").style.marginLeft = "260px";
}

  closeNav() {
   // @ts-ignore
  document.getElementById("mySidebar").style.width = "0px";
   // @ts-ignore
  document.getElementById("sub").style.marginLeft = "0px";
}

setRenderNull(){
  this.showCollections = false;
  this.showProduct = false;
  this.showUsers = false;
}

renderComponent(component:string) {
  switch(component) {
    case "products" :
      this.setRenderNull();
      this.showProduct = true;
      break;
    case "users" :
      this.setRenderNull();
      this.showUsers = true;
      break;
    default :
      this.setRenderNull();
      this.showCollections = true;
      break;
  }
}



}
