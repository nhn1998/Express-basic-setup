import config from "../../config";
import { Tstudent } from "../Student/student.interface";
import { Student } from "../Student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";

const createStudentDB = async (password:string, studentData: Tstudent) => {
    const userData:Partial<TUser> = {}
    // if password is not given;

    userData.password = password || (config.default_password as string)
    // if(!password){
    //     user.password = config.default_password as string;
    // }
    
    userData.role = 'student'
// create a id 

userData.id = '2030100001'

    const newUser = await User.create(userData);
    if(Object.keys(newUser).length){
        studentData.id = newUser.id     // embedded id
        studentData.user= newUser._id   //reffercence id

        const newStudent = await Student.create(studentData)
        return newStudent;
    }
  };

  export const userServices = {
    createStudentDB
  }