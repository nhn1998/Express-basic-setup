import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import GlobalErrorHandler from './app/middleware/globalErrorHandler';
import NotFound from './app/middleware/notFound';
import router from './app/routes';
const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

app.use('/api/v1', router)
app.get('/', (req: Request, res: Response) => {

  res.send("Hello world");
});
app.use(GlobalErrorHandler)
app.use(NotFound)
export default app;
