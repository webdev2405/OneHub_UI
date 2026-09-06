import { Component, inject, input, OnInit, output, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../../../../interfaces/user.interface';
import { BsDatepickerConfig, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgxSelectModule } from 'ngx-select-ex';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Auth } from '../../../../../services/auth/auth';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    BsDatepickerModule,
    NgxSelectModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './edit-user.html',
  styleUrls: ['./edit-user.less']
})
export class EditUser implements OnInit {

  formData = signal<FormGroup | null>(null);

  updateItem = input<User | null>(null);
  updatedData = output<User>();

  private fb = inject(FormBuilder);
  private auth = inject(Auth);

  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    const item = this.updateItem();

    const form = this.fb.group({
      uniqueId: [{ value: item?.uniqueId ?? null, disabled: true }],
      orgCode: [{ value: item?.orgCode ?? null, disabled: true }],
      orgName: [item?.orgName ?? null, Validators.required],
      orgEmailId: [item?.orgEmailId ?? null, [Validators.required, Validators.email]],
      orgContactNo: [item?.orgContactNo ?? null, Validators.required],
      status: [item?.status ?? null, Validators.required]
    });

    this.formData.set(form);
  }

  onSubmit() {
    if (this.formData()?.invalid) {
      this.formData()?.markAllAsTouched();
      return;
    }

    // ✅ get disabled values also
    const payload = this.formData()!.getRawValue();

    this.auth.updateAdminUser(payload).subscribe({
      next: (res) => {
        

        // ✅ close modal ONLY after success
        this.bsModalRef.hide();
        // ✅ notify parent
        this.updatedData.emit(payload);
      },
      error: (err) => {
        console.error('Update failed', err);
      }
    });
  }
}
