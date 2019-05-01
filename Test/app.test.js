'use strict';

const app = require('../app');
const expect = require('chai').expect;
const request = require('supertest');

describe('GET / responses', () => {
  it('value of something', () => {
    return request(app)
      .get('/apps')
      .expect(200);
  });
});