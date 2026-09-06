import { Component, inject } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { Auth } from "../../services/auth/auth"

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.less'
})
export class Login {

  isActive = false;

  private auth = inject(Auth);

  loginData = {
    userName: '',
    password: '',
    errorMessage: ''
  };

  SignUpData = {
    orgName: '',
    userEmailId: '',
    userMobileNo: '',
    accessType: 'A',
    errorMessage: '',
    msgStatus: ''
  };

  onRegisterClick() {
    this.isActive = true;
  }

  onLoginClick() {
    this.isActive = false;
  }

  login(): void {
    this.auth.login(this.loginData).subscribe({
      next: (res) => {
        if (res?.statusCode === "200") {
          // Optional: save token / user
          this.setCurrentUser({ "type": res?.accessType, "name": this.loginData.userName });
          this.auth.navigateByUrl('/app');
        }else if (res?.statusCode == "401") {
          this.loginData.errorMessage = "Invalid credentials. Please try again."
        } else {
          alert('May be server down.');
        }
      },
      error: (err) => {
        if (err?.error.statusCode == "401") {
          this.loginData.errorMessage = "Invalid credentials. Please try again."
        } else {
          alert('May be server down.');
        }


      }
    });
  }

  signup(): void {
    this.auth.signup(this.SignUpData).subscribe({
      next: (res) => {
        console.log('Signup response:', res?.statusCode);
        if (res?.statusCode === '201') {
          let self = this;
          this.SignUpData.msgStatus = res?.success
          this.SignUpData.errorMessage = res?.message
          setTimeout(function () {
            self.onLoginClick()
          }, 500)
        } else {
          this.SignUpData.errorMessage = res?.message
        }

      },
      error: (err) => {

      }
    })
  }

setCurrentUser(data: any) {
  localStorage.setItem('currentUser', JSON.stringify(data));
}


  // onSubmit(): void{
  //   const isUser = this.auth.login(this.email, this.password)
  //   console.log('isUser :', isUser)
  //   if(isUser){
  //     this.errorMessage = "";
  //     //navigate to dashboard
  //     this.auth.navigateByUrl("/app/dashboard")
  //   }else{
  //     // Display error message on failed login
  //     this.errorMessage = "Invalid email or password. Please try again."
  //   }
  // }
}
