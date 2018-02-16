import express from 'express'
import Expo from 'exponent-server-sdk'

import Theme from '../models/theme'

const router = express.Router()
const expo = new Expo()

router.post('/notification/:themeName', async (req, res) => {
    const { theme, title, description, delay } = req.body
    const { themeName } = req.params
    const delayPushNotification = delay || 0
    let messages = []
    try {
        const devices = await Theme.find({ themeName }).exec()
        if(devices.length < 1) return res.json({ success: false, message: 'Error sending notifications.' })
        devices.map((de) => {
            messages.push({
                to: de.deviceToken,
                sound: 'default',
                title: title || 'Push notification title',
                body: description || 'Push notification description',
                data: {
                    title,
                    description
                },
              })
        })
        let chunks = expo.chunkPushNotifications(messages);
        setTimeout(async () => {
            for (let chunk of chunks) {
                try {
                  let receipts = await expo.sendPushNotificationsAsync(chunk);
                  return res.json({
                      success: true,
                      message: 'Theme successfully Posted.',
                      sentTo: `${devices.length} devices`,
                      data: {
                        title,
                        description
                      },
                      receipts,
                    })
                } catch (e) {
                    return res.json({ success: false, message: 'Something went wrong, Try again.', error: e })
                }
              }
        }, delayPushNotification)
    } catch(e) {
        return res.json({ success: false, message: 'Something went wrong, Try again.', error: e })
    }
    
    
  })

  export default router