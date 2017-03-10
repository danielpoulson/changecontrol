"use strict";
/*eslint no-console: 0*/
const nodemailer = require('nodemailer');
const xoauth2 = require('xoauth2');
const Users = require('../controllers/users');
const config = require('./config');
const path = require('path');
const fs = require('fs');
const rootPath = path.normalize(__dirname);


function sendMail(toEmail, emailType, emailActivity) {
  const emailSubject = "You have been assigned ownership of a " + emailType;

 let _auth = {
        xoauth2: xoauth2.createXOAuth2Generator({
            user: config.auth.user,
            clientId: config.auth.clientId,
            clientSecret: config.auth.clientSecret,
            refreshToken: config.auth.refreshToken,
            accessToken: config.auth.accessToken
        })
    };

  let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: _auth
  });

  fs.readFile(rootPath + '/mail.html', 'utf8', function(err, html){
      if (err) {
        console.log('Error Reading html file: ' + err);
      }
    
    const _html = '<html><body STYLE="font-size: 12pt/14pt; font-family:sans-serif"><h3>You have been assigned ownership of this '
    + emailType + '</h3></br>' + emailActivity + '</br>' + html + '</body></html>';

    transporter.sendMail({
        from: config.auth.user,
        to: toEmail, // An array if you have multiple recipients.
        subject: emailSubject,
        html: _html
      },
      function (err, info) {
      if (err) {
        console.log('Error sending mail: ' + err);
      }

      transporter.close();
    });
  });


};

function createEmail(body){
  const _targetDate = moment(body.TKTarg).format('DD/MM/YYYY');
  const emailType = "Change Control - Task";
  const emailActivity = '<b>Associated Change Control - </b><em>' + body.SourceId + '</em></br><b>Task to Complete: </b><i>'
   + body.TKName + '<b>  Date Due </b>' + _targetDate + '</i>';

  const p = Users.getUserEmail(body.TKChamp).exec();

  p.then(function(res){
    const _toEmail = res[0].email;
    sendMail(_toEmail, emailType, emailActivity);
  }).catch(function (err) {
    console.log(err);
  });

}

exports.createEmail = createEmail;
