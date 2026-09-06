import { inject, Injectable } from '@angular/core';
import { LoginUser } from '../../interfaces/user.interface';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Auth {

  private router = inject(Router)

  private readonly API_URL = 'http://localhost:8081/api/v1';
  private readonly API_URL_EMPLOYEE = 'http://localhost:8083/api/v1';
  private readonly API_URL_CLIENT = 'http://localhost:8082/api/v1';
  private readonly API_URL_MONGO = 'http://localhost:8072/api/users';

  constructor(private http: HttpClient) { }

  login(data: { userName: string; password: string }): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.API_URL}/validateUser`, data, { headers });
  }

  createAdminUser(data: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.API_URL}/createAdminUser`, data, { headers });
  }

  fetchClients(): Observable<any> {
    return this.http.get(`${this.API_URL}/fetchClients`)
  }

  fetchAllEmployees(): Observable<any> {
    return this.http.get(`${this.API_URL_EMPLOYEE}/fetchAllEmployees`)
  }

  fetchClientsByType(data: any): Observable<any> {
    console.log('get Data :: ', data); // ✅ safe logging
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.API_URL}/fetchClientsByType`, data, { headers });
  }
  updateAdminUser(data: any): Observable<any> {
    console.log('get Data :: ', data); // ✅ safe logging
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<any>(`${this.API_URL}/updateAdminUser`, data, { headers });
  }

  fetchEmployeeDetail(data: any): Observable<any> {
    console.log('get Data fetchEmployeeDetail :: ', data); // ✅ safe logging
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.API_URL_EMPLOYEE}/fetchEmployeeDetail`, data, { headers });
  }

  fetchDepartmentsList(tobj: any) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.API_URL_CLIENT}/fetchDepartmentsList`, tobj, { headers });
  }

  fetchDivisionList(tobj: any) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.API_URL_CLIENT}/fetchDivisionList`, tobj, { headers });
  }

  fetchFilteredEmployeeNameList(tobj: any) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.API_URL_EMPLOYEE}/fetchFilteredEmployeeNameList`, tobj, { headers });
  }

  createEmployee(data: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.API_URL_EMPLOYEE}/createEmployee`, data, { headers });
  }

  updateEmployeeDetail(data: any): Observable<any> {
    console.log('get Data updateEmployeeDetail :: ', data); // ✅ safe logging
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<any>(`${this.API_URL_EMPLOYEE}/updateEmployeeDetail`, data, { headers });
  }

  // signup(data:any): Observable<any> {
  //   const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  //   return this.http.post<any>(this.API_URL_MONGO, data, { headers });
  // }

  signup(data: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.API_URL}/userSetup`, data, { headers });
  }

  createUser(data: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.API_URL_MONGO}/create-user`, data, { headers });
  }

  logout(): void {
    localStorage.removeItem("currentUser");
    this.navigateByUrl('/login')
  }

  isAuthenticated(): boolean {
    return !!this.getCurrentUser();
  }

  hasRole(role: string): boolean {
    return this.getCurrentUser()?.type === role;
  }

  getCurrentUser() {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  }

  getRole() {
    return this.getCurrentUser();
  }
  navigateByUrl(url: string): void {
    this.router.navigateByUrl(url, { replaceUrl: true })
  }

}
