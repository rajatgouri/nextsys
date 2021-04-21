import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm:FormGroup = new FormGroup({
    firstName:new FormControl(null,Validators.required),
    lastName:new FormControl(null,Validators.required),
    email:new FormControl(null,[Validators.email,Validators.required]),
    password:new FormControl(null,[Validators.required,Validators.maxLength(10), Validators.minLength(8),this.createPasswordStrengthValidator()]),
    cpassword:new FormControl(null,[Validators.required,Validators.maxLength(10), Validators.minLength(8),this.createPasswordStrengthValidator(),this.createPasswordMatchValidator()])
  })

  constructor(private authService:AuthService, private router: Router, private toastService: ToastService) { }

  ngOnInit(): void {
  }

  signup(){
    if(!this.signupForm.valid || (this.signupForm.controls.password.value != this.signupForm.controls.cpassword.value)) {
      console.log('invalid Form'); return;
      alert("Password")
    }

    // console.log(this.signupForm.value);

    this.authService.signup(this.signupForm.value).subscribe((response: any) =>{
      console.log(response)
      
      this.toastService.toast('signup successfully')
      this.router.navigate(['/auth/login'])


    }, error => {
      console.log('erroroor')
      console.log(error.error.msg)
      this.toastService.toast(error.error.msg)

    })

  }



  createPasswordMatchValidator(): ValidatorFn {
    return (control:AbstractControl) : ValidationErrors | null => {

      
      const password = this.signupForm?.controls.password.value;
      const confirmPassword = this.signupForm?.controls.cpassword.value;
    
      return password === confirmPassword ? null : { passwordMatch: true } 

    }
  }

  createPasswordStrengthValidator(): ValidatorFn {
    return (control:AbstractControl) : ValidationErrors | null => {

        const value = control.value;

        if (!value) {
            return null;
        }

        const hasUpperCase = /[A-Z]+/.test(value);

        const hasLowerCase = /[a-z]+/.test(value);

        const hasNumeric = /[0-9]+/.test(value);

        const passwordValid = hasUpperCase && hasLowerCase && hasNumeric;

        return !passwordValid ? {passwordStrength:true}: null;


    }
}

}
