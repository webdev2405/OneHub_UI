import { Component, inject, input, signal, TemplateRef, viewChild } from '@angular/core';
import { ContentHeader } from "../../../widgets/content-header/content-header";
import { ColumnMode, DatatableComponent, NgxDatatableModule } from '@swimlane/ngx-datatable';
//import { USERS } from '../../../mock-data/users.mock';
import { User } from '../../../interfaces/user.interface';
//import { DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ModalModule, BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver'
import { EditUser } from "./components/edit-user/edit-user";
import { Auth } from "../../../services/auth/auth";
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-users',
  //imports: [ContentHeader, NgxDatatableModule, DatePipe, MatButtonModule, MatIconModule, ModalModule, EditUser],
  imports: [ContentHeader, NgxDatatableModule, MatButtonModule, MatIconModule, ModalModule, EditUser, CommonModule],
  providers: [BsModalService],
  templateUrl: './users.html',
  styleUrl: './users.less'
})
export class Users {
  // @viewChild(DatatableComponent) table = DatatableComponent;
  table = viewChild<DatatableComponent>(DatatableComponent)
  title = "CLIENTS"
  users = signal<User[]>([])
  temp = signal<User[]>([])
  columnMode = ColumnMode
  loadingIndicator = signal<boolean>(false)
  modalRef = signal<BsModalRef | null>(null)
  updateItem = signal<User | null>(null)

  // check card for component reusability
  isCard = input<boolean>(false)

  private modalService = inject(BsModalService);
  private auth = inject(Auth)

  setLoadingIndicator(value: boolean) {
    this.loadingIndicator.set(value)
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getUsers()
    //this.users.set(USERS)

  }

  // async getUsers() {
  //   try {
  //     this.setLoadingIndicator(true)
  //     const users = USERS
  //     this.temp.set(users)
  //     this.users.set(users)
  //   } catch (e) {
  //     console.error(e)
  //   } finally {
  //     this.setLoadingIndicator(false)
  //   }
  // }

  async getUsers() {
    this.setLoadingIndicator(true);

    this.auth.fetchClients().subscribe({
      next: (res: User[]) => {
        console.log(res);

        this.temp.set(res);
        this.users.set(res);

        console.log(`Data ::${this.users}`)

        this.setLoadingIndicator(false);
      },
      error: (err) => {
        console.error(err);
        this.setLoadingIndicator(false);
      }
    });
  }

  onPageChange(event: any) {
    console.log(event)
  }

  onFilterChange(event: any) {
    console.log(event.target.value)
    const val = event.target.value.toLowerCase();

    const filterData = this.temp().filter((item) => {
      return item?.orgName.toLowerCase().indexOf(val) !== -1 ||
        item?.orgEmailId.toLowerCase().indexOf(val) !== -1 ||
        item?.orgContactNo.toLowerCase().indexOf(val) !== -1 ||
        !val
    });
    this.users.set(filterData)
    this.table()!.offset = 0
  }



  onSortChange(event: any) {
    console.log(event)
  }

  exportToExcel() {
    const fields = ['id', 'name', 'email', 'phone', 'address']
    const values = this.users();
    const sheetName = 'users'

    const data = this.prepareDateInExcel(values, fields)
    const headers = fields.reduce((acc, field) => {
      //acc[field] = field;
      acc[field] = field.charAt(0).toUpperCase() + field.slice(1);
      return acc;
    }, {} as Record<string, string>);

    /***Custom Header***/
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet([headers, ...data], {
      skipHeader: true
    })

    /***Default Header***/
    // const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data, {
    //    header: Object.keys(data[0]),
    // }) 
    const workBook: XLSX.WorkBook = {
      Sheets: { [sheetName]: worksheet },
      SheetNames: [sheetName],
    };

    const excelBuffer = XLSX.write(workBook, {
      bookType: 'xlsx',
      type: 'array'
    });

    const file = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=UTF-8'
    });

    saveAs(file, 'users.xlsx')
  }

  prepareDateInExcel(values: User[], fields: string[]) {
    const dataExport = values.map((value) => {
      const filteredRow: Record<string, any> = {}
      fields.forEach((field, index) => {
        if (field in value) {
          filteredRow[field] = value[field as keyof User]
        }
      });
      return filteredRow;
    });
    return dataExport;
  }

  // deleteItem(user: User) {
  //   this.temp.update((users) => users.filter((usr) => usr.id !== user.id));
  //   this.users.update((users) => users.filter((usr) => usr.id !== user.id))
  // }

  deleteItem(user: User) { }

  openUserFormModal(template: TemplateRef<void>, user?: User) {
    //this.updateItem.set(user ?? null)    // Both working same.
    this.updateItem.set(user!)
    this.modalRef.set(this.modalService.show(template, { class: 'modal-lg' }));
    
  }

  closeUserModal() {
    this.modalRef()?.hide()
  }

  addUser(){
    this.auth.navigateByUrl('/app/create-user');
  }

  updateUser(updateUser: User) {
    this.temp.update((users) =>
      users.map((user) => (user.uniqueId === updateUser.uniqueId ? updateUser : user))
    );
    this.users.update((users) =>
      users.map((user) => (user.uniqueId === updateUser.uniqueId ? updateUser : user))
    );

    this.closeUserModal();

  }

 toggleStatus(updateUser: User) {
  const updatedStatus = updateUser.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';

  const updatedUser: User = {
    ...updateUser,
    status: updatedStatus
  };

  console.log('updatedUser ::', updatedUser);

  // ✅ send updated object
  this.auth.updateAdminUser(updatedUser).subscribe({
    next: (res) => {
      if (res?.statusCode === '200' || res?.statusCode === '201') {

        // ✅ update UI only after API success
        this.temp.update(users =>
          users.map(user =>
            user.uniqueId === updatedUser.uniqueId ? updatedUser : user
          )
        );

        this.users.update(users =>
          users.map(user =>
            user.uniqueId === updatedUser.uniqueId ? updatedUser : user
          )
        );

        console.log('Status updated successfully');
      }
    },
    error: (err) => {
      console.error('Update failed', err);
    }
  });
}

onClientTypeChange(event: Event) {
  const selectedValue = (event.target as HTMLSelectElement).value;

  const payload = {
    inputStrVal: selectedValue
  };

  this.auth.fetchClientsByType(payload).subscribe({
    next: (res) => {
      this.users.set(res);
      this.temp.set(res);
    },
    error: (err) => {
      console.error('Failed to fetch clients by type', err);
    }
  });
}




  // addUser(user: User) {
  //   // this.temp.update((users) => [user, ...users]);
  //   // this.users.update((users) => [user, ...users]);
  //   // this.closeUserModal();
  // }



}
