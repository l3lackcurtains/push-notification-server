'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var themeSchema = Schema({
    deviceToken: {
        type: String,
        required: true,
        unique: true
    },
    themeName: {
        type: String,
        required: true
    }
}, { collection: 'theme', timestamps: true });

var Theme = _mongoose2.default.model('Theme', themeSchema);

exports.default = Theme;