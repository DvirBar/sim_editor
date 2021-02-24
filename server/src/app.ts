import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { checkLib } from './pdf-builder/utils';

const app: Application = express()

app.use(express.json());
app.use(cors())

const port = parseInt(<string>process.env.PORT) || 5000
app.listen(port, () => console.log(`Server started on port ${port}`))

checkLib()