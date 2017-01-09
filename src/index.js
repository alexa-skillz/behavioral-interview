'use strict';

// App ID for the skill.
var APP_ID = undefined;

// Array containing behavioral questions.
var BEHAVIORS = [
  'Tell me about a time when your project failed.',
  'Tell me about a time when you were struggling to meet a deadline.'
];

// Require the AlexaSkill prototype and helper functions.
var AlexaSkill = require('./AlexaSkill');

// interviewBehaviors is a child of AlexaSkill via inheritance.
var Behavior = function () {
  AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
Behavior.prototype = Object.create(AlexaSkill.prototype);
Behavior.prototype.constructor = Behavior;

Behavior.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
  console.log('onSessionStarted requestId: ' + sessionStartedRequest.requestId + ', sessionId: ' + session.sessionId);
  // any initialization logic goes here
};

Behavior.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
  //console.log("onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
  handleNewBehaviorRequest(response);
};

// Overridden to show that a subclass can override this function to teardown session state.
Behavior.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
  console.log('onSessionEnded requestId: ' + sessionEndedRequest.requestId + ', sessionId: ' + session.sessionId);
  // any cleanup logic goes here
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

// Gets a random new behavioral question from the list and returns to the user.
function handleNewBehaviorRequest(response) {

  // Get a random interview behavioral question from the interview behavioral question list
  var behaviorIndex = Math.floor(Math.random() * BEHAVIORS.length);
  var randomBehavior = BEHAVIORS[behaviorIndex];

  // Create speech output
  var speechOutput = 'Here is your question: ' + randomBehavior;
  var cardTitle = 'Your Behavioral Interview Question';
  response.tellWithCard(speechOutput, cardTitle, speechOutput);
}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
  // Create an instance of the interviewBehaviors skill.
  var behavior = new Behavior();
  behavior.execute(event, context);
};
