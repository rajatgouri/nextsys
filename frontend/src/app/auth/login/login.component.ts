import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  loginForm : FormGroup=new FormGroup({
    email: new FormControl(null,[Validators.email,Validators.required]),
    password: new FormControl(null,Validators.required)
  });

  constructor(private authService: AuthService, private toastService : ToastService, private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    if(!this.loginForm.valid) {
      console.log('invalid'); return;
    }

    this.authService.login(this.loginForm.value).subscribe((response: any) => {
      this.router.navigate(['/user/profile'])
    }, error => {
      console.log(error)
      this.toastService.toast(error)

    })
  }
  


  onSubmit(data: any) {
    this.authService.login(data).subscribe((response: any) => {
      console.log(response)
    })
  }

}
