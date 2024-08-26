import { Student as StudentModel } from './student.model';
import { Tstudent } from './student.interface';

const createStudentDB = async (studentData: Tstudent) => {
  if (await StudentModel.isUserExist(studentData.id)) {
    throw new Error('user is already exist');
  }
  const result = await StudentModel.create(studentData);

  // const student = new StudentModel(studentData);
  // if(await student.isUserExist(studentData.id)){
  //   throw new Error('user is already exist')
  // }
  // const result = student.save();

  return result;
};

const getStudentsDB = async () => {
  const result = await StudentModel.find();
  return result;
};

const getSingleStudentDB = async (id: string) => {
  // const result = await StudentModel.findOne({ id });
  const result = await StudentModel.aggregate([{ $match: { id } }]);
  return result;
};

const deleteStudentDB = async (id: string) => {
  const result = await StudentModel.updateOne({ id }, { isDeleted: true });
  return result;
};

export const studentServices = {
  createStudentDB,
  getStudentsDB,
  getSingleStudentDB,
  deleteStudentDB,
};
