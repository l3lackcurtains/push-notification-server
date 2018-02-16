'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _theme = require('../models/theme');

var _theme2 = _interopRequireDefault(_theme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

/*
 ***************************************
 * Post device Theme
 * *************************************
*/
router.post('/theme', function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
        var _req$body, deviceToken, themeName, deviceTheme, theme, newTheme, updateTheme;

        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        console.log(req.body);
                        _context.prev = 1;
                        _req$body = req.body, deviceToken = _req$body.deviceToken, themeName = _req$body.themeName;
                        _context.next = 5;
                        return _theme2.default.findOne({ deviceToken: deviceToken });

                    case 5:
                        deviceTheme = _context.sent;

                        if (deviceTheme) {
                            _context.next = 16;
                            break;
                        }

                        theme = (0, _theme2.default)({ deviceToken: deviceToken, themeName: themeName });
                        _context.next = 10;
                        return theme.save();

                    case 10:
                        newTheme = _context.sent;

                        if (newTheme) {
                            _context.next = 13;
                            break;
                        }

                        return _context.abrupt('return', res.json({ success: false, message: 'Error posting theme.' }));

                    case 13:
                        return _context.abrupt('return', res.json({ success: true, message: 'Theme successfully Posted.', data: newTheme }));

                    case 16:
                        // Update theme to existing device
                        deviceTheme.set((0, _extends3.default)({}, req.body));
                        _context.next = 19;
                        return deviceTheme.save();

                    case 19:
                        updateTheme = _context.sent;

                        if (updateTheme) {
                            _context.next = 22;
                            break;
                        }

                        return _context.abrupt('return', res.json({ success: false, message: 'Error updating theme.' }));

                    case 22:
                        return _context.abrupt('return', res.json({ success: true, message: "Theme updated successfully", data: updateTheme }));

                    case 23:
                        _context.next = 28;
                        break;

                    case 25:
                        _context.prev = 25;
                        _context.t0 = _context['catch'](1);
                        return _context.abrupt('return', res.json({ success: false, message: 'Something went wrong, Try again.', error: _context.t0 }));

                    case 28:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined, [[1, 25]]);
    }));

    return function (_x, _x2) {
        return _ref.apply(this, arguments);
    };
}());

router.get('/theme', function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res) {
        var getTheme;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.prev = 0;
                        _context2.next = 3;
                        return _theme2.default.find();

                    case 3:
                        getTheme = _context2.sent;

                        if (getTheme) {
                            _context2.next = 6;
                            break;
                        }

                        return _context2.abrupt('return', res.json({ success: false, message: 'Error fetching theme.' }));

                    case 6:
                        return _context2.abrupt('return', res.json({ success: true, message: "Theme fetched successfully", data: getTheme }));

                    case 9:
                        _context2.prev = 9;
                        _context2.t0 = _context2['catch'](0);
                        return _context2.abrupt('return', res.json({ success: false, message: 'Something went wrong, Try again.', error: _context2.t0 }));

                    case 12:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined, [[0, 9]]);
    }));

    return function (_x3, _x4) {
        return _ref2.apply(this, arguments);
    };
}());

router.get('/theme/:deviceid', function () {
    var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(req, res) {
        var getTheme;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        _context3.prev = 0;
                        _context3.next = 3;
                        return _theme2.default.findOne({ deviceToken: req.params.deviceid });

                    case 3:
                        getTheme = _context3.sent;

                        if (getTheme) {
                            _context3.next = 6;
                            break;
                        }

                        return _context3.abrupt('return', res.json({ success: false, message: 'Error fetching theme.' }));

                    case 6:
                        return _context3.abrupt('return', res.json({ success: true, message: "Theme fetched successfully", data: getTheme }));

                    case 9:
                        _context3.prev = 9;
                        _context3.t0 = _context3['catch'](0);
                        return _context3.abrupt('return', res.json({ success: false, message: 'Something went wrong, Try again.', error: _context3.t0 }));

                    case 12:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, undefined, [[0, 9]]);
    }));

    return function (_x5, _x6) {
        return _ref3.apply(this, arguments);
    };
}());

exports.default = router;