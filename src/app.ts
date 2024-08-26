import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { studentRoutes } from './app/modules/Student/student.routes';
const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

app.use('/api/v1/students', studentRoutes)
app.get('/', (req: Request, res: Response) => {

  res.send("Hello world");
});

export default app;
