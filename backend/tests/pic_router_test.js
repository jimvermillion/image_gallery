'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const mongoose = require('mongoose');
const server = require(__dirname + '/../server'); //eslint-disable-line
const request = chai.request;

describe('the pic api', () => {
  after( done => {
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
  });

  it('should be able to retrieve all our pics', done => {
    request('localhost:3000')
      .get('/api/pic')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(Array.isArray(res.body)).to.eql(true);
        done();
      });
  });

  it('shoud be able to post a pics', done => {
    request('localhost:3000')
      .post('/api/pic')
      .send({ url: 'test url', desc: 'test desc' })
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body.url).to.eql('test url');
        expect(res.body).to.have.property('_id');
        done();
      });
  });
});
