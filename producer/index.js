
import kafkaConfig,{config}  from '../kafka.config.js';

const { topic } = config;

var cmdArguments = process.argv;

const players = {
    7: "Stephen Appiah",
    10: "Jordan Ayew",
    1: "Samuel B. Inkom",
    45: "Junior Agogo",
    19: "Asamoah A. Gyan"
}

function validateInput(arg){

    if(!Object.keys(players).includes(arg)) {

        throw new Error(`argument is not valid`);
    }

}

//logic in this function can change
function getPartition(value){

    return (value <= 10 )? 0: 1
}

async function produce(){

    const jerseyNumber = cmdArguments[2];

    validateInput(jerseyNumber);

    console.log('jersey number: ', jerseyNumber);
    
    const kafka = kafkaConfig();

    const producer = kafka.producer();
    
    await producer.connect();

    console.log("producer connected");
    
    var produceOutput = await producer.send({
        topic,
        messages: [
            { 
                value: players[jerseyNumber],
                partition: getPartition(jerseyNumber)
            }
        ]
    });

    console.log(`Produce output ${JSON.stringify(produceOutput)}`)
    
    await producer.disconnect();
}

produce();