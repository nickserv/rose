// Testing libraries
const chai = require('chai');
chai.use(require('chai-as-promised'));
global.cheerio = require('cheerio');
global.expect = chai.expect;
global.fs = require('fs');
global.request = require('supertest');
global.url = require('url');

// Rose modules
global.app = require('../app');
global.engine = require('../lib/engine');
global.features = require('./features');
global.scraper = require('../lib/scraper');
