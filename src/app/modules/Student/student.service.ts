import { Student as StudentModel } from './student.model';



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
  getStudentsDB,
  getSingleStudentDB,
  deleteStudentDB,
};
