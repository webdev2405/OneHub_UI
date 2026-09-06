import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Auth } from "../../../services/auth/auth"
import { RouterLink } from "@angular/router";


@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './create-user.html',
  styleUrl: './create-user.less'
})
export class CreateUser {

  user: any = {
    orgType: '',
    orgName: '',
    orgEmailId: '',
    orgContactNo: '',
    status: 'ACTIVE',
    errorMessage: ''
  };

  private auth = inject(Auth);
  createUser(form: NgForm): void {
    if (form.invalid) {
      return;
    }

    // ✅ Form data ready
    this.auth.createAdminUser(this.user).subscribe({
      next: (res) => {
        if (res?.statusCode == "201") {
          let self = this;
          this.user.msgStatus = res?.statusMsg
          setTimeout(function () {
            self.user.msgStatus = ""
            self.auth.navigateByUrl('/app/clients');
            form.resetForm();
          }, 1500)
        }

      },
      error: (err) => {
        console.log(`createAdminUser function  error response :: ${JSON.stringify(err)}`)
        if (err?.error.statusCode == "400") {
          this.user.errorMessage = err?.error.statusMsg
        } else {
          this.user.errorMessage = err?.error.statusMsg
        }
        let self = this;
        setTimeout(function () {
          self.user.errorMessage = "";
          form.resetForm();
        }, 1500)


      }
    })


  }
}
