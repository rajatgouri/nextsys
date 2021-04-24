import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  homeRoute : any ;

  constructor(
    public auth : AuthService
  ) { }

  ngOnInit(): void {
    const user:any = this.auth.getUser();
    this.homeRoute = [
      '/home',
      {
        username: user.username
      }
    ];
  }
}
