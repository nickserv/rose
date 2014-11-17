// Testing libraries
var chai = require('chai');
chai.use(require('chai-as-promised'));
global.expect = chai.expect;
global.request = require('supertest');

// Rose modules
global.app = require('../app');
global.Feature = require('../lib/feature');
global.seeds = require('../lib/seeds');
