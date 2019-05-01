'use strict';

const app = require('../app');
const expect = require('chai').expect;
const request = require('supertest');

describe('GET / responses', () => {
  it('should let you see all of the data', () => {
    return request(app)
      .get('/apps')
      .expect(200);
  });
  it('should request diffent data from sort', () => {
    return request(app)
      .get('/apps')
      .query({sort:'nothing'})
      .expect(400,'Sort must be rateing or apps');
  });
  it('should request a diffenet Genre',()=>{
    return request(app)
      .get('/apps')
      .query({genres:'strat'})
      .expect(400, 'Genre must be one of Action, Puzzle, Strategy, Casual, Arcade or Card');
  });
  it('should be the value of search', () => {
    const expected = [
      {
        'App': 'ROBLOX',
        'Category': 'GAME',
        'Rating': 4.5,
        'Reviews': '4447388',
        'Size': '67M',
        'Installs': '100,000,000+',
        'Type': 'Free',
        'Price': '0',
        'Content Rating': 'Everyone 10+',
        'Genres': 'Adventure;Action & Adventure',
        'Last Updated': 'July 31, 2018',
        'Current Ver': '2.347.225742',
        'Android Ver': '4.1 and up'
      }
    ];
    return request(app)
      .get('/apps')
      .query({search:'ROBLOX'})
      .expect(200,expected);
  });
  it('should be the value of Genres', () => {
    const expected = [
      {
        'App': 'Solitaire',
        'Category': 'GAME',
        'Rating': 4.7,
        'Reviews': '254258',
        'Size': '23M',
        'Installs': '10,000,000+',
        'Type': 'Free',
        'Price': '0',
        'Content Rating': 'Everyone',
        'Genres': 'Card',
        'Last Updated': 'August 1, 2018',
        'Current Ver': '2.137.0',
        'Android Ver': '4.1 and up'
      }
    ];
    return request(app)
      .get('/apps')
      .query({ genres: 'Card' })
      .expect(200, expected);
  });
});