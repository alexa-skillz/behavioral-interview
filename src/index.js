'use strict';

// App ID for the skill.
var APP_ID = undefined;

// Array containing behavioral questions.
var BEHAVIORS = [
  'Tell me about a time when your project failed.',
  'Tell me about a time when you were struggling to meet a deadline.',
  'What is your favorite programming language?',
  'What can you tell me about your experience?',
  'What are your career goals?',
  'Why should we hire you?',
  'Why do you want to work for this company?',
  'Do you have any questions for me?',
  'If you could do anything, what would be your idea job?',
  'Describe a recent project and the hurdles you faced there.',
  'Describe a time you encountered an issue and how you fixed it.',
  'Describe a time when you made a suggestion to improve something on the project that you were working on.',
  'Has there been a time on a project when you disagreed with someone? What did you do about it?',
  'Give me a recent example of a stressful situation on the job. How did you handle it?',
  'Tell me about a time that you took a risk.',
  'Tell me about the first job you ever had. What did you do to learn the ropes?',
  'Tell me about a time that you failed. How did you deal with the situation?',
  'Tell me about a successful presentation that you gave and why you think it was a hit.',
  'Tell me about your proudest professional accomplishment.',
  'Describe a time when you saw a problem and took the initiative to correct it rather than waiting for someone else to do it.',
  'Tell me about a time you were dissatisfied in your work. What could have been done to make it better?',
  'Tell me a bit about yourself.'
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
  var speechOutput = 'To practice answering your question stand in front of a mirror with your hands at your sides and take note of your body language. Here is your question: ' + randomBehavior;
  var cardTitle = 'Your Behavioral Interview Question';
  response.tellWithCard(speechOutput, cardTitle, speechOutput);
}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
  // Create an instance of the interviewBehaviors skill.
  var behavior = new Behavior();
  behavior.execute(event, context);
};
