import { RequestHandler } from 'express';
import { studentServices } from './student.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';




const getStudent = catchAsync(async (req, res) => {
  const result = await studentServices.getStudentsDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'student get successfully',
    data: result,
  });
});

const getSingleStudent: RequestHandler = catchAsync(async (req, res) => {

  const { studentId } = req.params;
  const result = await studentServices.getSingleStudentDB(studentId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'single student get successfully',
    data: result,
  });

})

const deleteStudent: RequestHandler = catchAsync(async (req, res) => {

  const { studentId } = req.params;
  const result = await studentServices.deleteStudentDB(studentId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Delete student successfully',
    data: result,
  });

});
export const studentController = {
  getStudent,
  getSingleStudent,
  deleteStudent,
};
