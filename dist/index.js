'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _helmet = require('helmet');

var _helmet2 = _interopRequireDefault(_helmet);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _exponentServerSdk = require('exponent-server-sdk');

var _exponentServerSdk2 = _interopRequireDefault(_exponentServerSdk);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _config = require('./utils/config');

var _config2 = _interopRequireDefault(_config);

var _deviceTheme = require('./routers/deviceTheme');

var _deviceTheme2 = _interopRequireDefault(_deviceTheme);

var _push = require('./routers/push');

var _push2 = _interopRequireDefault(_push);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var expo = new _exponentServerSdk2.default();

var app = (0, _express2.default)();
var port = process.env.PORT || 8000;

// Server Setup
app.use(_bodyParser2.default.json({ limit: '50mb' }));
app.use(_bodyParser2.default.urlencoded({ limit: '50mb', extended: false, parameterLimit: 50000 }));
app.use((0, _helmet2.default)());
app.use('/', _express2.default.static(_path2.default.join(__dirname, 'public')));

// Database Setup
_mongoose2.default.Promise = global.Promise;
_mongoose2.default.connect(_config2.default.mdbl);
var db = _mongoose2.default.connection;
db.on('error', function () {
  return console.log('[-] Failed to connect to database.');
}).once('open', function () {
  return console.log('[+] Connected to database. ');
});

app.use('/', _deviceTheme2.default);
app.use('/', _push2.default);

app.post('/notification', function (request, response) {
  var _request$body = request.body,
      token = _request$body.token,
      title = _request$body.title,
      description = _request$body.description,
      delay = _request$body.delay;


  var isPushToken = _exponentServerSdk2.default.isExponentPushToken(token);

  if (isPushToken) {
    sendPush(token, title, description, response, delay);
  } else {
    response.json({
      icon: 'X',
      message: 'Your token is invalid',
      token: token,
      status: 'error'
    });
  }
});

app.post('/welcome/:token', function (request, response) {
  var token = request.params.token;
  var message = 'Welcome to Rmotrgram!';
  var description = 'Push notification with welcome message to ' + token + ' device sent';

  var isPushToken = _exponentServerSdk2.default.isExponentPushToken(token);

  if (isPushToken) {
    sendPush(token, message, description, response);
  } else {
    response.json({
      icon: '❌',
      message: 'Your token is invalid',
      token: token,
      status: 'error'
    });
  }
});

app.post('/photo/:token', function (request, response) {
  var token = request.params.token;
  var message = 'Your photo has been successfully uploaded!';
  var description = 'Push notification advising' + token + ' device photo is uploaded sent';

  if (isPushToken) {
    sendPush(token, message, description, response);
  } else {
    response.json({
      icon: '❌',
      message: 'Your token is invalid',
      token: token,
      status: 'error'
    });
  }
});

app.post('/sendto/:token/:from', function (request, response) {
  var token = request.params.token;
  var from = request.params.from;
  var message = 'YOmotr! from ' + from;
  var description = from + ' send yo a YOmotr';

  if (isPushToken) {
    sendPush(token, message, description, response);
  } else {
    response.json({
      icon: '❌',
      message: 'Your token is invalid',
      token: token,
      status: 'error'
    });
  }
});

var sendPush = function sendPush(token, title, description, response, delay) {
  var delayPushNotification = delay || 0;

  setTimeout(function () {
    expo.sendPushNotificationAsync({
      // The push token for the app user you want to send the notification to
      to: token,
      sound: 'default',
      title: title || 'Push notification title',
      body: description || 'Push notification description',
      data: {
        title: title,
        description: description
      }
    }).then(function (res) {
      response.json({
        icon: '✅',
        message: title,
        description: description,
        token: token,
        status: 'sent',
        res: res
      });
    }, function (err) {
      response.json({
        icon: '❌',
        message: title,
        description: description,
        token: token,
        status: 'error'
      });
    });
  }, delayPushNotification);
};

app.listen(port, function () {
  console.log('\n==============================================\n[+] Server running on port: ' + port + '\n==============================================\n');
});