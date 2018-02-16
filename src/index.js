import express from 'express'
import bodyParser from 'body-parser'
import helmet from 'helmet'
import path from 'path'
import mongoose from 'mongoose'

import config from './utils/config'
import deviceTheme from './routers/deviceTheme'
import push from './routers/push'

const app = express()
const port = process.env.PORT || 3000

// Server Setup
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false, parameterLimit: 50000 }))
app.use(helmet())
app.use('/', express.static(path.join(__dirname, 'public')))

// Database Setup
mongoose.Promise = global.Promise
mongoose.connect(config.mdbl)
const db = mongoose.connection
db.on('error', () => console.log('[-] Failed to connect to database.'))
    .once('open', () => console.log('[+] Connected to database. '))



app.use('/', deviceTheme)
app.use('/', push)

app.listen(port, () => {
console.log(`
==============================================
[+] Server running on port: ${port}
==============================================
`)
})