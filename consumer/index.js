
import kafkaConfig,{config}  from '../kafka.config.js';

const { topic  } = config;

const  eachMessageFn = async({ topic, partition, message }) => {
    console.log(`value: ${message.value.toString()}, partitionNumber: ${partition}, topicFrom: ${topic}  `);
};

async function consume(){

    const kafka = kafkaConfig();

    const consumer = kafka.consumer({ groupId: 'test-group' });
    
    await consumer.connect()

    console.log("consumer connected");

    await consumer.subscribe({ topic, fromBeginning: true })
    
    await consumer.run({
      eachMessage: eachMessageFn
      
    })


}

consume();