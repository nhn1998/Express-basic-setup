import { userServices } from "./user.service";
import catchAsync from "../../utils/catchAsync";

const createStudent = catchAsync(async (req, res) => {

  const {password,Student} = req.body;

//   const zodParseData = studentValidationSchema.parse(student);

  const result = await userServices.createStudentDB(password,Student);
  res.status(200).json({
    success: true,
    message: 'student is created successfully',
    data: result,
  });

})

  export const userControllers = {
    createStudent
  }