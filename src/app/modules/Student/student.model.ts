import { Schema, model } from 'mongoose';
import {
  TGurdian,
  StudentModel,
  TUserName,
  TlocalGurdian,
  Tstudent,
} from './student.interface';
import validator from 'validator';
import bcrypt from 'bcrypt';
import config from '../../config';

const userNameSchema = new Schema<TUserName>({
  FirstName: {
    type: String,
    required: [true, 'need first name'],
    maxlength: [20, 'name must be 20 character'],
    trim: true,
    validate: {
      validator: function (value: string) {
        const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
        return firstNameStr === value;
      },
      message: '{{VALUE} is not capitalize}',
    },
  },
  MiddleName: { type: String },
  LastName: {
    type: String,
    required: [true, 'need last name '],
    validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: '{{VALUE} is not valid}',
    },
  },
});

const gurdianSchema = new Schema<TGurdian>({
  FatherName: { type: String, required: [true, 'need father name'] },
  fatherOccupation: { type: String, required: [true, 'need occupation'] },
  fatherContactNumber: {
    type: String,
    required: [true, 'give contact number'],
  },
  motherName: { type: String, required: [true, 'need mother name '] },
  motherOccupation: {
    type: String,
    required: [true, 'need mother occupation'],
  },
  motherContactNumber: {
    type: String,
    required: [true, 'need mother contact number'],
  },
});

const localGurdianSchema = new Schema<TlocalGurdian>({
  name: { type: String, required: true },
  occupation: { type: String, required: true },
  contactNo: { type: String, required: true },
  address: { type: String, required: true },
});

const StudentSchema = new Schema<Tstudent, StudentModel>(
  {
    id: { type: String, required: true, unique: true },
    password: {
      type: String,
      required: [true, 'password is required'],
      maxlength: [20, 'password can not more than 20 character'],
    },
    name: {
      type: userNameSchema,
      required: [true, 'Need to give Name'],
    },
    gender: {
      type: String,
      enum: {
        values: ['male', 'female'],
        message: 'values can not be {VALUE}',
      },
      required: true,
    },
    dateOfBirth: { type: String },
    email: { type: String, required: true, unique: true },
    contactNo: { type: String, required: true },
    emergencyContactNo: { type: String, required: true },
    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    },
    presentAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    gurdian: gurdianSchema,
    localGurdian: localGurdianSchema,
    profileImg: { type: String, required: true },
    isActive: {
      type: String,
      enum: ['active', 'blocked'],
      default: 'active',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);
// virtuals

StudentSchema.virtual('FullName').get(function () {
  return `${this.name.FirstName} ${this.name.MiddleName} ${this.name.LastName}`;
});
// presave middleware
StudentSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_round_salt),
  );
  next();
});
// Post middleware
StudentSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

StudentSchema.statics.isUserExist = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};

StudentSchema.pre('find', async function (next) {
  // console.log(this);
  this.find({ isDeleted: { $ne: true } });
  next();
});
// [ { '$match': { id: 'S1234' } } ]
StudentSchema.pre('findOne', async function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

StudentSchema.pre('aggregate', async function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

// StudentSchema.methods.isUserExist=async function(id:string){
//    const existingUser = await Student.findOne({id})
//    return existingUser;
// }
// Model part

export const Student = model<Tstudent, StudentModel>('Student', StudentSchema);
