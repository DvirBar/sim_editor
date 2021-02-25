import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import createSimulations from './pdf-builder/methods';

const app: Application = express()

app.use(express.json());
app.use(cors())

const port = parseInt(<string>process.env.PORT) || 5000
app.listen(port, () => console.log(`Server started on port ${port}`))

async function check() {

    const simulations = [
        {
            year: '2014',
            date: 'dec',
            chapters: ['essay','v1', 'v2', 'e2']
        },
        {
            year: '2020',
            date: 'fall',
            chapters: ['q1', 'q2']  
        },
        {
            year: '2020',
            date: 'summer',
            chapters: ['e1']  
        }
    ]

    const file = {
        name: 'דצמבר 2014',
        simulations
    }

    try {
        await createSimulations([file], {shuffleData: true})

        console.log("Success!");
    
    }
    catch(err) {
        console.error(err);
    }
}

check()