import { RequestHandler} from "express";
import { userServices } from "./user.service";

const createStudent : RequestHandler = async (req, res, next) => {
    try {
      const {password,Student} = req.body;
  
    //   const zodParseData = studentValidationSchema.parse(student);
  
      const result = await userServices.createStudentDB(password,Student);
      res.status(200).json({
        success: true,
        message: 'student is created successfully',
        data: result,
      });
    } catch (err) {
      next(err)
    }
  };

  export const userControllers = {
    createStudent
  }