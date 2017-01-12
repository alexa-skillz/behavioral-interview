var expect = require('chai').expect;
var lambdaToTest = require('../src/index.js');

const context = require('aws-lambda-mock-context');
const ctx = context();

describe('When Starting a Session', function() {
  var speechResponse = null;
  var speechError = null;

    // Fires once for the group of tests, done is mocha's callback to
    // let it know that an   async operation has completed before running the rest
    // of the tests, 2000ms is the default timeout though
  before(function(done){
    //This fires the event as if a Lambda call was being sent in
    lambdaToTest.handler({
      'session': {
        'new': true,
        'sessionId': 'session1234',
        'attributes': {},
        'user': {
          'userId': null
        },
        'application': {
          'applicationId': 'amzn1.echo-sdk-ams.app.1234567'
        }
      },
      'version': '1.0',
      'request': {
        'type': 'LaunchRequest',
        'requestId': 'request5678'
      }
    },ctx);

    //Captures the response and/or errors
    ctx.Promise
        .then(resp => { speechResponse = resp; done(); })
        .catch(err => { speechError = err; done();});
  });


  describe('The response is structurally correct for Alexa Speech Services', function() {
    it('should not have errored',function() {
      expect(speechError).to.be.null;
    });

    it('should have a version', function() {
      expect(speechResponse.version).not.to.be.null;
    });

    it('should have a speechlet response', function() {
      expect(speechResponse.response).not.to.be.null;
    });

    it('should have session attributes', function() {
      expect(speechResponse.response.sessionAttributes).not.to.be.null;
    });

    it('should leave the Alexa session open', function() {
      expect(speechResponse.response.shouldEndSession).not.to.be.null;
      expect(speechResponse.response.shouldEndSession).to.be.false;
    });
  });
});

// this file is copied from Code dad
// https://codedad.net/2016/01/03/test-aws-lambda-function-without-aws/
