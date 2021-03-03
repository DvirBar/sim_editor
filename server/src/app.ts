import express, { Application } from 'express';
import cors from 'cors';
import morgan from 'morgan'

const app: Application = express()

app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));


// App routes
import routes from './routes'

app.use('/api', routes)

// Start server
const port = parseInt(<string>process.env.PORT) || 5000
app.listen(port, () => console.log(`Server started on port ${port}`))

export default app