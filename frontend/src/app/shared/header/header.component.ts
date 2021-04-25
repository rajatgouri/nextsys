import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user: any;
  constructor(
    public auth : AuthService
  ) { }

  ngOnInit(): void {
    this.user = this.auth.getUser();
  }
}
