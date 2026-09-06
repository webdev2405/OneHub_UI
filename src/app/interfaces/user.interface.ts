export interface User {
    uniqueId: number,
    orgCode: string,
    orgName: string,
    orgEmailId: string,
    orgContactNo: string,
    status: string,
    adminSetupStatus: string,
    orgType: string
}

export interface EmployeeList {
    uniqueId: number,
    firstName: string,
    lastName: string,
    phone: string,
    email: string,
    dateOfBirth: string,
    gender: string,
    maritalStatus: string,
    status: string,
    bloodGroup: string,
    panNumber: string,
    aadharNumber: string,
    statusOnly: boolean
}

export interface LoginUser{
    id: number,
    email: string,
    password: string,
    role: 'super' | 'admin' | 'internal' | 'external'
}
