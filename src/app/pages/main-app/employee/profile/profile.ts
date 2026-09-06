import { Component, signal, inject } from '@angular/core';
import { Auth } from "../../../../services/auth/auth";
import { single } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [CommonModule],
  templateUrl: './profile.html',
  styleUrl: './profile.less'
})
export class Profile {

  private auth = inject(Auth);

  empDetail = signal<any | null>(null);
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getEmployeeProfile()
  }

  getEmployeeProfile() {
    let empCode = {
      "inputStrVal1": "EMP0001"
    }
    this.auth.fetchEmployeeDetail(empCode).subscribe({

      next: (res) => {

        this.empDetail.set(res);
        console.log("API RESPONSE ::", JSON.stringify(res))

      },
      error: (err) => {

      }
    })
  }

  maskNumbers(num?: string): string {
    if (!num) return '';
    return num.replace(/.(?=.{4})/g, 'X');
  }

}
