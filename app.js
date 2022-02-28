
const projectId = 'your projectId ';

// Imports the Dialogflow library
const dialogflow = require('@google-cloud/dialogflow');

const CONFIGURATION = {
    credentials: {
        //Your credentials
    }
}

// Instantiates clients
const intentsClient = new dialogflow.IntentsClient(CONFIGURATION);
async function listIntents() {
    // Construct request
    // The path to identify the agent that owns the intents.
    console.log("yeaaa")
    const projectAgentPath = intentsClient.projectAgentPath(projectId);

    console.log(projectAgentPath);

    const request = {
        parent: projectAgentPath,
    };

    // Send the request for listing intents.
    const [response] = await intentsClient.listIntents(request);
    response.forEach(intent => {
        console.log('====================');
        console.log(`Intent name: ${intent.name}`);
        console.log(`Intent display name: ${intent.displayName}`);

        console.log('Input contexts:');
        intent.inputContextNames.forEach(inputContextName => {
            console.log(`\tName: ${inputContextName}`);
        });

        console.log('Output contexts:');
        intent.outputContexts.forEach(outputContext => {
            console.log(`\tName: ${outputContext.name}`);
        });
    });
}



const displayName = 'MAKE_RESERVATION';
const trainingPhrasesParts = ['How many people are staying?', "hola"];
const messageTexts = ['Your reservation has been confirmed', 'chale'];


async function createIntent() {
    // Construct request
    // The path to identify the agent that owns the created intent.
    const agentPath = intentsClient.projectAgentPath(projectId);

    const trainingPhrases = [];

    trainingPhrasesParts.forEach(trainingPhrasesPart => {
        const part = {
            text: trainingPhrasesPart,
        };

        // Here we create a new training phrase for each provided part.
        const trainingPhrase = {
            type: 'EXAMPLE',
            parts: [part],
        };

        trainingPhrases.push(trainingPhrase);
    });

    const messageText = {
        text: messageTexts,
    };

    const message = {
        text: messageText,
    };

    const intent = {
        displayName: displayName,
        trainingPhrases: trainingPhrases,
        messages: [message],
    };

    const createIntentRequest = {
        parent: agentPath,
        intent: intent,
    };

    // Create the intent
    const [response] = await intentsClient.createIntent(createIntentRequest);
    console.log(`Intent ${response.name} created`);
}




listIntents();