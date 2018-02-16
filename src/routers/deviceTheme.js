import express from 'express'

import Theme from '../models/theme'

const router = express.Router()

/*
 ***************************************
 * Post device Theme
 * *************************************
*/
router.post('/theme', async (req, res) => {
    console.log(req.body)
    try{
        const { deviceToken, themeName } = req.body
        const deviceTheme = await Theme.findOne({ deviceToken })

        // Post new device
        if(!deviceTheme) {
            const theme = Theme({ deviceToken, themeName })
            const newTheme = await theme.save()
            if(!newTheme) return res.json({ success: false, message: 'Error posting theme.' })
            return res.json({ success: true, message: 'Theme successfully Posted.', data: newTheme })
        } else {
            // Update theme to existing device
            deviceTheme.set({ ...req.body })
            const updateTheme = await deviceTheme.save()
            if (!updateTheme) return res.json({ success: false, message: 'Error updating theme.' })
            return res.json({ success: true, message: "Theme updated successfully", data: updateTheme })
        }
    } catch(e) {
        return res.json({ success: false, message: 'Something went wrong, Try again.', error: e })
    }

})

router.get('/theme', async (req, res) => {
    try{
        const getTheme = await Theme.find()
        if(!getTheme) return res.json({ success: false, message: 'Error fetching theme.' })
        return res.json({ success: true, message: "Theme fetched successfully", data: getTheme })
    } catch(e) {
        return res.json({ success: false, message: 'Something went wrong, Try again.', error: e })
    }

})

router.get('/theme/:deviceid', async (req, res) => {
    try{
        const getTheme = await Theme.findOne({ deviceToken: req.params.deviceid })
        if(!getTheme) return res.json({ success: false, message: 'Error fetching theme.' })
        return res.json({ success: true, message: "Theme fetched successfully", data: getTheme })
    } catch(e) {
        return res.json({ success: false, message: 'Something went wrong, Try again.', error: e })
    }

})

export default router