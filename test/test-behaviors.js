var expect = require('chai').expect;
var index = require('../src/index');

const context = require('aws-lambda-mock-context');
const ctx = context();

describe('Testing a session with the AboutIntent', function() {
  var speechResponse = null;
  var speechError = null;

  before(function(done){
    index.handler({
      'session': {
        'sessionId': 'SessionId.ffc80ac9-4185-4331-848a-6468113ca7b2',
        'application': {
          'applicationId': 'amzn1.ask.skill.9815ca21-6f0c-4430-917e-ef20c90b65c5'
        },
        'attributes': {},
        'user': {
          'userId': 'amzn1.ask.account.AF3JQBZVI3BYD6OCAW6QJGJ2NKJ2VYEKR3YY3YDNQCJ7Z2K3DLWZOSJ3OHYRGTTYZDO6A4WX3747EEA45FXOXYLSUNCWFGZJTYQCZ2HTYEK255HB4AR5QDPWBHN6KGLSQPFU3JG7AUPSLP2K35G6LY7QFECD3STHQ7NIUL7NFD232IR2M3FQEWFEOLQJZFBCGWWRJ5A2E62GNPA'
        },
        'new': true
      },
      'request': {
        'type': 'IntentRequest',
        'requestId': 'EdwRequestId.3990735d-78f7-4fae-b3b4-59a6f5211338',
        'locale': 'en-US',
        'timestamp': '2017-01-12T05:52:47Z',
        'intent': {
          'name': 'GetNewBehaviorIntent',
          'slots': {}
        }
      },
      'version': '1.0'
    }, ctx);

    ctx.Promise
        .then(resp => { speechResponse = resp; done(); })
        .catch(err => { speechError = err; done(); });
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

    it('should have a spoken response', () => {
      expect(speechResponse.response.outputSpeech).not.to.be.null;
    });

    it('should end the alexa session', function() {
      expect(speechResponse.response.shouldEndSession).not.to.be.null;
      expect(speechResponse.response.shouldEndSession).to.be.true;
    });
  });
});
