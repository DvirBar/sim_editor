import express, { Application } from 'express';
import morgan from 'morgan'
import http from 'http'
import enforce from 'express-sslify'

const app: Application = express()

app.use(express.json());
app.use(morgan('tiny'));


// App routes
import routes from './routes'

if(process.env.NODE_ENV === 'production') {
    app.use(enforce.HTTPS({ trustProtoHeader: true }))
    app.use(express.static('client/build'))
}

app.use('/api', routes)

// Start server
const port = parseInt(<string>process.env.PORT) || 8000

http.createServer(app).listen(port, () => 
    console.log(`Server started on port ${port}`))

export default app