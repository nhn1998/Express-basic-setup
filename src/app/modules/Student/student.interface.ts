import { Model } from 'mongoose';

export type TGurdian = {
  FatherName: string;
  fatherOccupation: string;
  fatherContactNumber: string;
  motherName: string;
  motherOccupation: string;
  motherContactNumber: string;
};
export type TUserName = {
  FirstName: string;
  MiddleName?: string;
  LastName: string;
};
export type TlocalGurdian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

export type Tstudent = {
  id: string;
  password: string;
  name: TUserName;
  gender: 'male' | 'female' | 'other';
  dateOfBirth?: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress: string;
  permanentAddress: string;
  gurdian: TGurdian;
  localGurdian: TlocalGurdian;
  profileImg?: string;
  isActive: 'active' | 'blocked';
  isDeleted: boolean;
};

// static

export interface StudentModel extends Model<Tstudent>{
  isUserExist(id:string): Promise<Tstudent | null>
}

// for creatign instace
// export type studentMethod = {
//   isUserExist(id: string): Promise<Tstudent | null>;
// };

// export type StudentModel = Model<
//   Tstudent,
//   Record<string, never>,
//   studentMethod
// >;
