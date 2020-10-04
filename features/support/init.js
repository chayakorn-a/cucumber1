'use strict';

const apickli = require('apickli');
const {Before} = require('cucumber');

Before(function() {
    this.apickli = new apickli.Apickli('https', 'dev.openapi-nonprod.kasikornbank.com');
    this.apickli.addRequestHeader('Cache-Control', 'no-cache');

});