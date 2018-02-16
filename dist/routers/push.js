'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _exponentServerSdk = require('exponent-server-sdk');

var _exponentServerSdk2 = _interopRequireDefault(_exponentServerSdk);

var _theme = require('../models/theme');

var _theme2 = _interopRequireDefault(_theme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();
var expo = new _exponentServerSdk2.default();

router.post('/notification/:themeName', function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res) {
        var _req$body, theme, title, description, delay, themeName, delayPushNotification, messages, devices, chunks;

        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _req$body = req.body, theme = _req$body.theme, title = _req$body.title, description = _req$body.description, delay = _req$body.delay;
                        themeName = req.params.themeName;
                        delayPushNotification = delay || 0;
                        messages = [];
                        _context2.prev = 4;
                        _context2.next = 7;
                        return _theme2.default.find({ themeName: themeName }).exec();

                    case 7:
                        devices = _context2.sent;

                        if (!(devices.length < 1)) {
                            _context2.next = 10;
                            break;
                        }

                        return _context2.abrupt('return', res.json({ success: false, message: 'Error sending notifications.' }));

                    case 10:
                        devices.map(function (de) {
                            messages.push({
                                to: de.deviceToken,
                                sound: 'default',
                                title: title || 'Push notification title',
                                body: description || 'Push notification description',
                                data: {
                                    title: title,
                                    description: description
                                }
                            });
                        });
                        chunks = expo.chunkPushNotifications(messages);

                        setTimeout((0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
                            var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, chunk, receipts;

                            return _regenerator2.default.wrap(function _callee$(_context) {
                                while (1) {
                                    switch (_context.prev = _context.next) {
                                        case 0:
                                            _iteratorNormalCompletion = true;
                                            _didIteratorError = false;
                                            _iteratorError = undefined;
                                            _context.prev = 3;
                                            _iterator = chunks[Symbol.iterator]();

                                        case 5:
                                            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                                                _context.next = 20;
                                                break;
                                            }

                                            chunk = _step.value;
                                            _context.prev = 7;
                                            _context.next = 10;
                                            return expo.sendPushNotificationsAsync(chunk);

                                        case 10:
                                            receipts = _context.sent;
                                            return _context.abrupt('return', res.json({
                                                success: true,
                                                message: 'Theme successfully Posted.',
                                                sentTo: devices.length + ' devices',
                                                data: {
                                                    title: title,
                                                    description: description
                                                },
                                                receipts: receipts
                                            }));

                                        case 14:
                                            _context.prev = 14;
                                            _context.t0 = _context['catch'](7);
                                            return _context.abrupt('return', res.json({ success: false, message: 'Something went wrong, Try again.', error: _context.t0 }));

                                        case 17:
                                            _iteratorNormalCompletion = true;
                                            _context.next = 5;
                                            break;

                                        case 20:
                                            _context.next = 26;
                                            break;

                                        case 22:
                                            _context.prev = 22;
                                            _context.t1 = _context['catch'](3);
                                            _didIteratorError = true;
                                            _iteratorError = _context.t1;

                                        case 26:
                                            _context.prev = 26;
                                            _context.prev = 27;

                                            if (!_iteratorNormalCompletion && _iterator.return) {
                                                _iterator.return();
                                            }

                                        case 29:
                                            _context.prev = 29;

                                            if (!_didIteratorError) {
                                                _context.next = 32;
                                                break;
                                            }

                                            throw _iteratorError;

                                        case 32:
                                            return _context.finish(29);

                                        case 33:
                                            return _context.finish(26);

                                        case 34:
                                        case 'end':
                                            return _context.stop();
                                    }
                                }
                            }, _callee, undefined, [[3, 22, 26, 34], [7, 14], [27,, 29, 33]]);
                        })), delayPushNotification);
                        _context2.next = 18;
                        break;

                    case 15:
                        _context2.prev = 15;
                        _context2.t0 = _context2['catch'](4);
                        return _context2.abrupt('return', res.json({ success: false, message: 'Something went wrong, Try again.', error: _context2.t0 }));

                    case 18:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined, [[4, 15]]);
    }));

    return function (_x, _x2) {
        return _ref.apply(this, arguments);
    };
}());

exports.default = router;