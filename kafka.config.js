
import { Kafka } from 'kafkajs';

export default function kafkaConfig(){
    const kafka = new Kafka({
        clientId: 'my-app',
        brokers: ['localhost:9092'],
    });

    return kafka;
}

export const config =  {
    topic: "jersey",
    partitionNumber: 2
}