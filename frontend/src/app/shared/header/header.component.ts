import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user: any;
  baseUrl : any = environment.url;
  constructor(
    public auth : AuthService
  ) { }

  ngOnInit(): void {
    this.user = this.auth.getUser();
  }
}
