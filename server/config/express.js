"use strict";
import express from 'express';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import passport from 'passport';
import path from 'path';
const rootPath = path.normalize(__dirname + '/../../');

/*eslint no-console: 0*/

export default function (app, config) {

    app.set('views', rootPath);
    app.engine('html', require('ejs').renderFile);
    app.use(logger('dev'));
    app.use(cookieParser());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    app.use(require('express-session')({
        secret: 'p7r6uktdhmcgvho8o6e5ysrhxmcgjfkot7r6elu5dtjt7lirfyj',
        resave: false,
        saveUninitialized: true
    }));
    app.use(passport.initialize());
    app.use(passport.session());

    app.use(express.static(rootPath));

}
