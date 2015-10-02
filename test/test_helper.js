// Testing libraries
var chai = require('chai');
chai.use(require('chai-as-promised'));
global.expect = chai.expect;
global.request = require('supertest');

// Rose modules
global.app = require('../app');
global.Feature = require('../lib/feature');
global.seedData = require('../lib/seedData');
global.seeds = require('../lib/seeds');

// Mocks
global.mockedSeeds = function () { seeds(seedData); };
