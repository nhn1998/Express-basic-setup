import {  RequestHandler, } from 'express';
import { studentServices } from './student.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const getStudent:RequestHandler = async (req, res, next) => {
  try {
    const result = await studentServices.getStudentsDB();
    sendResponse(res, {
      statusCode:httpStatus.OK,
      success:true,
      message:"student get successfully",
      data:result
    })
  } catch (err) {
    next(err)
  }
};

const getSingleStudent:RequestHandler = async (req, res,next) => {
  try{
    const { studentId } = req.params;
  const result = await studentServices.getSingleStudentDB(studentId);
  sendResponse(res, {
    statusCode:httpStatus.OK,
    success:true,
    message:"single student get successfully",
    data:result
  })
  }
  catch(err){
    next(err)
  }
};

const deleteStudent:RequestHandler = async (req, res,next) => {
  try {
    const { studentId } = req.params;
    const result = await studentServices.deleteStudentDB(studentId);
    sendResponse(res, {
      statusCode:httpStatus.OK,
      success:true,
      message:"Delete student successfully",
      data:result
    })
  } catch (err) {
    next(err)
  }
};
export const studentController = {
  getStudent,
  getSingleStudent,
  deleteStudent,
};
