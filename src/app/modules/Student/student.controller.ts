import { Request, Response } from 'express';
import { studentServices } from './student.service';
import studentValidationSchema from './student.validation';

const createStudent = async (req: Request, res: Response) => {
  try {
    // const joiValidation = Joi.object({
    //     id: Joi.string(),
    //     name:{
    //         FirstName : Joi.string().max(20).required(),
    //         MiddleName : Joi.string().max(20),
    //         LastName: Joi.string().max(20).required
    //     }
    // })
    const student = req.body.Student;

    const zodParseData = studentValidationSchema.parse(student);

    const result = await studentServices.createStudentDB(zodParseData);
    res.status(200).json({
      success: true,
      message: 'student is created successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    });
  }
};

const getStudent = async (req: Request, res: Response) => {
  try {
    const result = await studentServices.getStudentsDB();
    res.status(200).json({
      success: true,
      message: 'Get Student Successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    });
  }
};

const getSingleStudent = async (req: Request, res: Response) => {
  const { studentId } = req.params;
  const result = await studentServices.getSingleStudentDB(studentId);
  res.status(200).json({
    success: true,
    message: 'single student get successfully',
    data: result,
  });
};

const deleteStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await studentServices.deleteStudentDB(studentId);
    res.status(200).json({
      success: true,
      message: 'student deleted succesfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    });
  }
};
export const studentController = {
  createStudent,
  getStudent,
  getSingleStudent,
  deleteStudent,
};
