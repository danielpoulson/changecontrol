const express = require('express');
require('./server/config/auth');
const mongoose = require('./server/config/mongoose');
const expressfile = require('./server/config/express');
const path = require('path');
const rootPath = path.normalize(__dirname + '/client/build');

config = {
    rootPath: rootPath,
    db: 'mongodb://localhost/techservices',
    port: 7005
};

process.env.PORT = config.port;

var app = express()

expressfile(app, config);
mongoose(config);
require('./server/config/passport')();
require('./server/routes')(app);


app.get('*', function (req, res) {
    res.render('index.html');
});

/*eslint no-console: 0*/
app.listen(process.env.PORT, function() {
    console.log('Express server 🌎  listening on port : ' + process.env.PORT);
    console.log('env = ' + process.env.NODE_ENV +
                '\nprocess.cwd = ' + process.cwd());
});