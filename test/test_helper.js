// Testing libraries
var chai = require('chai');
chai.use(require('chai-as-promised'));
global.cheerio = require('cheerio');
global.expect = chai.expect;
global.fs = require('fs');
global.request = require('supertest');
global.url = require('url');

// Rose modules
global.app = require('../app');
global.Feature = require('../lib/feature');
global.scraper = require('../lib/scraper');
global.seeds = require('../lib/seeds');
