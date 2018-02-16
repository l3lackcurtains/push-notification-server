
import mongoose from 'mongoose'

const Schema = mongoose.Schema

const themeSchema = Schema({
	deviceToken: {
        type: String,
        required: true,
        unique: true
    },
    themeName: {
        type: String,
        required: true
    },
}, { collection: 'theme', timestamps: true })

const Theme = mongoose.model('Theme', themeSchema)

export default Theme