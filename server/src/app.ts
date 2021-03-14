import express, { Application } from 'express';
import morgan from 'morgan'
import enforce from 'express-sslify'

const app: Application = express()

app.use(express.json());
app.use(morgan('tiny'));


// App routes
import routes from './routes'

app.use('/api', routes)

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))
    app.use(enforce.HTTPS({ trustProtoHeader: true }))
}

// Start server
const port = parseInt(<string>process.env.PORT) || 5000
app.listen(port, () => console.log(`Server started on port ${port}`))

export default app