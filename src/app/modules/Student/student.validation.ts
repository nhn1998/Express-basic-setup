import { z } from 'zod';


// Define the Zod schemas for the sub-documents first

const userNameValidationSchema = z.object({
  FirstName: z.string()
    .max(20, 'Name must be 20 characters or less')
    .refine(value => value.charAt(0).toUpperCase() + value.slice(1) === value, {
      message: 'First name must be capitalized',
    }),
  MiddleName: z.string().optional(),
  LastName: z.string()
    .refine(value => /^[A-Za-z]+$/.test(value), {
      message: 'Last name must contain only alphabetic characters',
    })
});

const gurdianValidationSchema = z.object({
  FatherName: z.string().nonempty('Father name is required'),
  fatherOccupation: z.string().nonempty('Father occupation is required'),
  fatherContactNumber: z.string().nonempty('Father contact number is required'),
  motherName: z.string().nonempty('Mother name is required'),
  motherOccupation: z.string().nonempty('Mother occupation is required'),
  motherContactNumber: z.string().nonempty('Mother contact number is required'),
});

const localGurdianValidationSchema = z.object({
  name: z.string().nonempty('Name is required'),
  occupation: z.string().nonempty('Occupation is required'),
  contactNo: z.string().nonempty('Contact number is required'),
  address: z.string().nonempty('Address is required'),
});

// Define the main student schema

const studentValidationSchema = z.object({
  id: z.string().nonempty('ID is required'),
  password:z.string().max(20),
  name: userNameValidationSchema,
  gender: z.enum(['male', 'female'], {
    errorMap: () => ({ message: 'Gender must be either male or female' }),
  }),
  dateOfBirth: z.string().optional(),
  email: z.string().email('Invalid email address'),
  contactNo: z.string().nonempty('Contact number is required'),
  emergencyContactNo: z.string().nonempty('Emergency contact number is required'),
  bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']).optional(),
  presentAddress: z.string().nonempty('Present address is required'),
  permanentAddress: z.string().nonempty('Permanent address is required'),
  gurdian: gurdianValidationSchema,
  localGurdian: localGurdianValidationSchema,
  profileImg: z.string().nonempty('Profile image is required'),
  isActive: z.enum(['active', 'blocked']).default('active'),
  isDeleled: z.boolean()
});

export default studentValidationSchema;