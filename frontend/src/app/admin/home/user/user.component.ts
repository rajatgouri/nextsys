import { Component, OnInit } from '@angular/core';
import {AdminService} from "../../../services/admin.service";
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  allUsers: any = []
  searchAll= '';
  
  constructor(
    private admin: AdminService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.admin.getUsers().subscribe((res:any)=>{
      this.allUsers = res.data;
      this.allUsers = this.allUsers.map((p:any)=>{
        const updated = {
          ...p,
          name: p.name.firstName + p.name.lastName,
          picture: environment.url + p.picture
        }
        return updated;
      })
    })
  }

  userDetails(name:any){
    this.router.navigate(['/home/' + name])
  }

}
