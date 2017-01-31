'use strict';

var APP_ID = undefined;
// var APP_ID = amzn1.ask.skill.9815ca21-6f0c-4430-917e-ef20c90b65c5;

var BEHAVIORS = [
  'Tell me about a time when your project failed.',
  'Tell me about a time when you were struggling to meet a deadline.',
  'What is your favorite programming language?',
  'What can you tell me about your experience?',
  'What are your career goals?',
  'Why should we hire you?',
  'Why do you want to work for this company?',
  'If you could do anything, what would be your ideal job?',
  'Describe a time you encountered an issue and how you fixed it.',
  'Has there been a time on a project when you disagreed with someone? What did you do about it?',
  'Tell me about a time that you took a risk.',
  'Tell me about a time that you failed. How did you deal with the situation?',
  'Tell me about a successful presentation that you gave.',
  'Tell me about your proudest professional accomplishment.',
  'Tell me a bit about yourself.'
];

var AlexaSkill = require('./AlexaSkill');

var Behavior = function () {
  AlexaSkill.call(this, APP_ID);
};

Behavior.prototype = Object.create(AlexaSkill.prototype);
Behavior.prototype.constructor = Behavior;

Behavior.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
  console.log('onSessionStarted requestId: ' + sessionStartedRequest.requestId + ', sessionId: ' + session.sessionId);
};

Behavior.prototype.eventHandlers.onLaunch = function(launchRequest, session, response) {
  console.log(`launchRequest ID: ${launchRequest.requestId} - session launch ID: ${session.sessionId}`);
  let speechOutput = 'Welcome to the Behavioral Interview question trainer. I\'m about to give you a question, as you answer stand in front of a mirror and take note of your posture and body language. Are you ready for a question?';
  let repromptText = 'Are you ready for a question?';
  response.ask(speechOutput, repromptText);
};

Behavior.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
  console.log('onSessionEnded requestId: ' + sessionEndedRequest.requestId + ', sessionId: ' + session.sessionId);
};

Behavior.prototype.intentHandlers = {
  'GetNewBehaviorIntent': function (intent, session, response) {
    handleNewBehaviorRequest(response);
  },

  'AMAZON.HelpIntent': function (intent, session, response) {
    response.ask('You can say give me a behavioral question, or, you can say exit... What can I help you with?", "What can I help you with?');
  },

  'AMAZON.StopIntent': function (intent, session, response) {
    var speechOutput = 'Goodbye';
    response.tell(speechOutput);
  },

  'AMAZON.CancelIntent': function (intent, session, response) {
    var speechOutput = 'Goodbye';
    response.tell(speechOutput);
  }
};

function handleNewBehaviorRequest(response) {

  var behaviorIndex = Math.floor(Math.random() * BEHAVIORS.length);
  var randomBehavior = BEHAVIORS[behaviorIndex];

  var speechOutput = 'Here is your question: ' + randomBehavior;
  var repromptSpeech = 'Here is your question: ' + randomBehavior;
  var cardTitle = 'Your Behavioral Interview Question';
  response.tellWithCard(speechOutput, repromptSpeech, cardTitle, speechOutput);
}

exports.handler = function (event, context) {
  var behavior = new Behavior();
  behavior.execute(event, context);
};
