import kafkaConfig,{ config } from './kafka.config.js';

const { partitionNumber, topic } = config;

async function createPartition(){

    try {
        
        const kafka = kafkaConfig();
    
        //to create partitions we need admin access
        const admin = kafka.admin();
        await admin.connect();
    
        // brokers --> topics --> partitions
        await admin.createTopics({
            topics: [
                {
                    "topic": topic,
                    "numPartitions": partitionNumber,
                    "replicationFactor": 1
                }
            ]
        });
    
        console.log(`${partitionNumber} partitions created of topic ${topic} `);
        await admin.connect();
        
    } catch (error) {
        console.error("error-> ",error);
    }
};

createPartition();