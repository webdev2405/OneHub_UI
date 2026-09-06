import { Component, inject, input, OnInit, output, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmployeeList } from '../../../../../../interfaces/user.interface';
import { BsDatepickerConfig, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgxSelectModule } from 'ngx-select-ex';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Auth } from '../../../../../../services/auth/auth';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-edit-employee',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    BsDatepickerModule,
    NgxSelectModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './edit-employee.html',
  styleUrl: './edit-employee.less'
})
export class EditEmployee implements OnInit {

  formData = signal<FormGroup | null>(null);

  updateItem = input<EmployeeList | null>(null);
  updatedData = output<EmployeeList>();

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
      firstName: [{ value: item?.firstName ?? null, disabled: true }],
      lastName: [item?.lastName ?? null, Validators.required],
      orgEmailId: [item?.email ?? null, [Validators.required, Validators.email]],
      orgContactNo: [item?.phone ?? null, Validators.required],
      status: [item?.status ?? null, Validators.required],
      statusOnly: false
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
