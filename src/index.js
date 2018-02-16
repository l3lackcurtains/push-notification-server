import express from 'express'
import bodyParser from 'body-parser'
import helmet from 'helmet'
import path from 'path'
import Expo from 'exponent-server-sdk'
import mongoose from 'mongoose'
const expo = new Expo()

import config from './utils/config'
import deviceTheme from './routers/deviceTheme'
import push from './routers/push'

const app = express()
const port = process.env.PORT || 8000

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


app.post('/notification', (request, response) => {
    const { token, title, description, delay } = request.body
  
    let isPushToken = Expo.isExponentPushToken(token)
  
    if (isPushToken) {
      sendPush(token, title, description, response, delay)
    } else {
      response.json({
          icon: 'X',
          message: 'Your token is invalid',
          token: token,
          status: 'error'
      })
    }
  })


  app.post('/welcome/:token', (request, response) => {
    const token = request.params.token
    const message = 'Welcome to Rmotrgram!'
    const description = 'Push notification with welcome message to ' + token + ' device sent'
  
    let isPushToken = Expo.isExponentPushToken(token)
  
    if (isPushToken) {
      sendPush(token, message, description, response)
    } else {
      response.json({
          icon: '❌',
          message: 'Your token is invalid',
          token: token,
          status: 'error'
      })
    }
  })
  
  app.post('/photo/:token', (request, response) => {
    const token = request.params.token
    const message = 'Your photo has been successfully uploaded!'
    const description = 'Push notification advising' + token + ' device photo is uploaded sent'
  
    if (isPushToken) {
      sendPush(token, message, description, response)
    } else {
      response.json({
          icon: '❌',
          message: 'Your token is invalid',
          token: token,
          status: 'error'
      })
    }
  })
  
  app.post('/sendto/:token/:from', (request, response) => {
    const token = request.params.token
    const from = request.params.from
    const message = 'YOmotr! from ' + from
    const description = from + ' send yo a YOmotr'
  
    if (isPushToken) {
      sendPush(token, message, description, response)
    } else {
      response.json({
          icon: '❌',
          message: 'Your token is invalid',
          token: token,
          status: 'error'
      })
    }
  })


  const sendPush = (token, title, description, response, delay) => {
    const delayPushNotification = delay || 0
  
    setTimeout(() => {
      expo.sendPushNotificationAsync({
        // The push token for the app user you want to send the notification to
        to: token,
        sound: 'default',
        title: title || 'Push notification title',
        body: description || 'Push notification description',
        data: {
          title,
          description
        },
      })
      .then((res) => {
        response.json({
              icon: '✅',
              message: title,
              description: description,
              token: token,
              status: 'sent',
              res: res
          })
      }, err => {
        response.json({
            icon: '❌',
            message: title,
            description: description,
            token: token,
            status: 'error'
        })
      })
    }, delayPushNotification)
  }


app.listen(port, () => {
console.log(`
==============================================
[+] Server running on port: ${port}
==============================================
`)
})