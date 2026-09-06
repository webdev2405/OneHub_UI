import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { Auth } from '../../../../services/auth/auth';

@Component({
  selector: 'app-create-employee',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './create-employee.html',
  styleUrls: ['./create-employee.less']
})
export class CreateEmployee {

  private auth = inject(Auth);

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    const tobj: any = {
      "inputStrVal1": "branchCode",
      "inputStrVal2": "2601261415185"
    };
    this.getDepartments(tobj);
  }

  user: any = {
    errorMessage: '',
    msgStatus: ''
  };

  /* ---------------- BLOOD / MARITAL ---------------- */

  selectedBloodGroup = '';
  selectedMaritalStatus = '';

  maritalStatuses = ['Single', 'Married', 'Divorced', 'Widowed'];
  bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  /* ---------------- COUNTRY DATA ---------------- */
  countries = ['USA', 'India', 'Canada'];

  // States mapping
  statesMap: any = {
    USA: ['California', 'Texas', 'New York'],
    India: ['Maharashtra', 'Delhi', 'Karnataka'],
    Canada: ['Ontario', 'Quebec', 'British Columbia']
  };

  // Cities mapping
  citiesMap: any = {
    California: [{ name: 'Los Angeles', pincode: '90001' }, { name: 'San Francisco', pincode: '94102' }, { name: 'San Diego', pincode: '92101' }],
    Texas: [{ name: 'Houston', pincode: '77001' }, { name: 'Dallas', pincode: '75201' }, { name: 'Austin', pincode: '78701' }],
    'New York': [{ name: 'New York City', pincode: '10001' }, { name: 'Buffalo', pincode: '14201' }, { name: 'Rochester', pincode: '14601' }],
    Maharashtra: [{ name: 'Mumbai', pincode: '400001' }, { name: 'Pune', pincode: '411001' }, { name: 'Nagpur', pincode: '440001' }],
    Delhi: [{ name: 'New Delhi', pincode: '110001' }, { name: 'Dwarka', pincode: '110075' }, { name: 'Rohini', pincode: '110085' }],
    Karnataka: [{ name: 'Bangalore', pincode: '560001' }, { name: 'Mysore', pincode: '570001' }, { name: 'Mangalore', pincode: '574001' }],
    Ontario: [{ name: 'Toronto', pincode: 'M4W 1E3' }, { name: 'Ottawa', pincode: 'K2P 2H9' }, { name: 'Hamilton', pincode: 'L8N 3C6' }],
    Quebec: [{ name: 'Montreal', pincode: 'H2Y 2A9' }, { name: 'Quebec City', pincode: 'G1R 4J4' }, { name: 'Laval', pincode: 'H7T 2B8' }],
    'British Columbia': [{ name: 'Vancouver', pincode: 'V6B 3K7' }, { name: 'Victoria', pincode: 'V8W 2Y9' }, { name: 'Richmond', pincode: 'H7T 2B9' }]
  };

  /* ================= CURRENT ADDRESS ================= */

  currentAddress = {
    line1: '',
    line2: '',
    country: null as any,
    state: null as any,
    city: null as any,
    pincode: ''
  };

  currentStates: any[] = [];
  currentCities: any[] = [];

  resetSelctBox(obj: any) {

    if (obj) {
      console.log('Checked');
      this.sameAsCurrent = false;
      this.permanentAddress.country = null;
      this.permanentAddress.state = null;
      this.permanentStates = [];
      this.permanentCities = [];
      this.permanentAddress.city = null;
      this.permanentAddress.pincode = '';
      this.permanentAddress.line1 = '';
      this.permanentAddress.line2 = '';

    } else {
      // Reset Current Address values
      this.currentAddress = {
        line1: '',
        line2: '',
        country: null,
        state: null,
        city: null,
        pincode: ''
      };

      this.permanentAddress = {
        line1: '',
        line2: '',
        country: null as any,
        state: null as any,
        city: null as any,
        pincode: ''
      };

      // Clear dependent dropdowns
      this.currentStates = [];
      this.currentCities = [];
      this.permanentStates = [];
      this.permanentCities = [];
      this.sameAsCurrent = false;
    }


  }


  onCurrentCountryChange(type: string) {


    if (type === 'current') {
      this.currentStates = this.statesMap[this.currentAddress.country] || [];
      this.currentAddress.state = null;
      this.currentCities = [];
      this.currentAddress.city = null;
      this.currentAddress.pincode = '';
      if (this.sameAsCurrent) {
        this.resetSelctBox(this.sameAsCurrent)
      }


    } else {
      this.permanentStates = this.statesMap[this.permanentAddress.country] || [];
      this.permanentAddress.state = null;
      this.permanentCities = [];
      this.permanentAddress.city = null;
      this.permanentAddress.pincode = '';
    }
  }

  onCurrentStateChange(type: 'current' | 'permanent') {
    if (type === 'current') {
      this.currentCities = this.citiesMap[this.currentAddress.state] || [];
      this.currentAddress.city = null;
      this.currentAddress.pincode = '';
      if (this.sameAsCurrent) {
        this.resetSelctBox(this.sameAsCurrent)
      }

    } else {
      this.permanentCities = this.citiesMap[this.permanentAddress.state] || [];
      this.permanentAddress.city = null;
      this.permanentAddress.pincode = '';
    }
  }

  onCurrentCityChange() {
    if (this.sameAsCurrent) {
      this.resetSelctBox(this.sameAsCurrent)
    }
    this.currentAddress.pincode =
      this.currentAddress.city?.pincode || '';
  }


  /* ================= PERMANENT ADDRESS ================= */

  permanentAddress = {
    line1: '',
    line2: '',
    country: null as any,
    state: null as any,
    city: null as any,
    pincode: ''
  };

  permanentStates: any[] = [];
  permanentCities: any[] = [];

  onPermanentCountryChange() {
    this.permanentStates = this.permanentAddress.country?.states || [];
    this.permanentCities = [];
    this.permanentAddress.state = null;
    this.permanentAddress.city = null;
    this.permanentAddress.pincode = '';
  }

  onPermanentStateChange() {
    this.permanentCities = this.permanentAddress.state?.cities || [];
    this.permanentAddress.city = null;
    this.permanentAddress.pincode = '';
  }

  onPermanentCityChange() {
    this.permanentAddress.pincode =
      this.permanentAddress.city?.pincode || '';
  }

  /* ================= SAME AS CURRENT ================= */

  sameAsCurrent = false;

  copyCurrentAddress(event: any) {
    //this.sameAsCurrent = event.target.checked;

    if (this.sameAsCurrent) {
      // Copy the current address object
      this.permanentAddress = { ...this.currentAddress };

      // Copy dependent dropdowns
      this.permanentStates = [...this.currentStates];
      this.permanentCities = [...this.currentCities];
    } else {
      // Reset permanent address
      this.permanentAddress = { line1: '', line2: '', country: null, state: null, city: null, pincode: '' };
      this.permanentStates = [];
      this.permanentCities = [];
    }
  }


  /* ---------------- CREATE EMPLOYEE (UNCHANGED) ---------------- */

  employee = {
    uniqueId: 0,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    countryCode: '+91',
    gender: '',
    bloodGroup: '',
    maritalStatus: '',
    panNo: '',
    aadharNo: '',
    status: "ACTIVE"
  };

  addEmployee(form: any) {
    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }

    this.auth.createEmployee(this.employee).subscribe({
      next: (res) => {
        if (res && res.statusCode === '200') {
          this.user.msgStatus = res.statusMsg
        } else {
          this.user.errorMessage = res?.statusMsg || 'Failed to create employee.';
        }
        console.log('Employee created successfully:', res);
      },
      error: (err) => {
        this.user.errorMessage = err?.error.errorMessage || 'Failed to create employee1212.';
        
        console.error('Error creating employee:', err);
      }
    });
  }

  cancel() {
    // router navigation here
  }


  /* ---------------- FAMILY MEMBERS ---------------- */

  familyMembers: any[] = [this.createEmptyFamilyMember()];

  createEmptyFamilyMember() {
    return {
      name: '',
      relationship: '',
      email: '',
      mobile: '',
      dob: '',
      gender: '',
      occupation: '',
      dependent: 'YES'
    };
  }

  addFamilyMember(): void {
    this.familyMembers.push(this.createEmptyFamilyMember());
  }

  removeFamilyMember(index: number): void {
    if (this.familyMembers.length > 1) {
      this.familyMembers.splice(index, 1);
    }
  }

  /* ---------------- EXPERIENCE ---------------- */

  experiences: any[] = [this.createEmptyExperience()];

  createEmptyExperience() {
    return {
      organizationName: '',
      employeeCode: '',
      organizationEmail: '',
      organizationContact: '',
      referenceEmail: '',
      referenceContact: '',
      startDate: '',
      endDate: '',
      designation: '',
      responsibilities: '',
      location: '',
      employmentType: 'PERMANENT'
    };
  }

  addExperience(): void {
    this.experiences.push(this.createEmptyExperience());
  }

  removeExperience(index: number): void {
    if (this.experiences.length > 1) {
      this.experiences.splice(index, 1);
    }
  }

  /* ---------------- FETCH DEPARTMENT LIST ---------------- */

  selectdepartments: string = '';
  selectedDivision: string = '';
  selectedReportingManager: string = '';
  selectLevel: string = '';
  departments: any[] = [];
  divisionList: any[] = [];
  reportingManagerList: any[] = [];
  levelList: any[] = [];


  getDepartments(tobj: any): void {
    this.auth.fetchDepartmentsList(tobj).subscribe({
      next: (res) => {
        if (res && res.length > 0) {
          this.departments = res || [];
        }
      },
      error: () => {
        console.error('Failed to fetch departments');
      }
    });
  }

  onDepartmentChange(event: any): void {
    const coobj = event.target.value;

    this.auth.fetchDivisionList({ inputIntegerVal1: coobj }).subscribe({
      next: (res) => {
        if (res && res.length > 0) {
          this.divisionList = res || [];
        } else {
          this.divisionList = [];
        }
      },
      error: () => {
        console.error('Failed to fetch department details');
      }
    });
    this.reportingManagerList = [];
    this.selectedReportingManager = '';
    this.selectedDivision = '';
    this.levelList = [];
    this.selectLevel = '';
  }

  onDivisionChange(event: any): void {
    // Handle division change if needed

    this.levelList = [{ id: '1', value: 'Level 1' }, { id: '2', value: 'Level 2' }, { id: '3', value: 'Level 3' }, { id: '4', value: 'Level 4' }];
    this.reportingManagerList = [];
    this.selectedReportingManager = '';
    this.selectLevel = '';

  }
  onLevelChange(event: any): void {
    // Handle level change if needed
    this.auth.fetchFilteredEmployeeNameList({ inputIntegerVal1: this.selectLevel }).subscribe({
      next: (res) => {
        if (res && res.length > 0) {
          this.reportingManagerList = res || [];
        } else {
          this.reportingManagerList = [];
        }
      },
      error: () => {
        console.error('Failed to fetch reporting managers');
      }
    });
  }
}
