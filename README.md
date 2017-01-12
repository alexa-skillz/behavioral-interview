# An AWS Lambda function for Alexa

This is an <a href="http://aws.amazon.com/lambda">AWS Lambda</a> function with an Alexa skill for the Amazon Echo using the Alexa SDK. This skill covers Behavioral Interview technical questions and is part of the <a href="https://github.com/alexa-skillz">Alexa Skillz</a> project which includes separate skills in other categories of interview questions.

### Concepts

This skill has no external dependencies or session management, and creates a Lambda function for handling Alexa Skill requests.

### Setup

To run this skill you need to do two things: The first is to deploy the example code in Lambda, and the second is to configure the Alexa skill to use this Lambda.

### AWS Lambda Setup
1. Go to the AWS Console and click on the Lambda link. Note: ensure you are in us-east or you won't be able to use Alexa with Lambda.
2. Click on the Create a Lambda Function or Get Started Now button.
3. Skip the blueprint.
4. Name the Lambda Function "interviewTips".
5. Select the runtime as Node.js.
6. Go to the the src directory, select all files and then create a zip file, make sure the zip file does not contain the src directory itself, otherwise Lambda function will not work.
7. Select Code entry type as "Upload a .ZIP file" and then upload the .zip file to the Lambda.
8. Keep the Handler as index.handler (this refers to the main js file in the zip).
9. Create a basic execution role and click create.
10. Leave the Advanced settings as the defaults.
11. Click "Next" and review the settings then click "Create Function"
12. Click the "Event Sources" tab and select "Add event source".
13. Set the Event Source type as Alexa Skills kit and Enable it now. Click Submit.
14. Copy the ARN from the top right to be used later in the Alexa Skill Setup.

### Alexa Skill Setup
1. Go to the [Alexa Console](https://developer.amazon.com/edw/home.html) and click Add a New Skill.
2. Set "InterviewTips" as the skill name and "interview tips" as the invocation name, this is what is used to activate your skill. For example you would say: "Alexa, Ask interview tips for a tip."
3. Select the Lambda ARN for the skill Endpoint and paste the ARN copied from above. Click Next.
4. Copy the Intent Schema from the included IntentSchema.json.
5. Copy the Sample Utterances from the included SampleUtterances.txt. Click Next.
6. [optional] go back to the skill Information tab and copy the appId. Paste the appId into the index.js file for the variable APP_ID,
   then update the Lambda source zip file with this change and upload to Lambda again, this step makes sure the Lambda function only serves request from authorized source.
7. You are now able to start testing your sample skill! You should be able to go to the [Echo webpage](http://echo.amazon.com/#skills) and see your skill enabled.
8. In order to test it, try to say some of the Sample Utterances from the Examples section below.
9. Your skill is now saved and once you are finished testing you can continue to publish your skill.

## Examples
    User: "Alexa, open Behaviors and ask me a question."
    Alexa: "Here's your question..."
