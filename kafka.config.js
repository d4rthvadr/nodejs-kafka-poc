import { Kafka } from "kafkajs";

export default function kafkaConfig(clientId) {
  const kafka = new Kafka({
    clientId,
    brokers: ["localhost:9092"],
  });

  return kafka;
}

const topicNames = {
  orderCreated: "order.created",
  orderUpdated: "order.updated",
  orderCompleted: "order.completed",
};

const topics = [
  {
    name: topicNames.orderCreated,
    partitions: 2,
    replicationFactor: 1,
  },
  {
    name: topicNames.orderUpdated,
    partitions: 2,
    replicationFactor: 1,
  },
  {
    name: topicNames.orderCompleted,
    partitions: 2,
    replicationFactor: 1,
  },
];

const config = {
  topic: "jersey",
  partitionNumber: 2,
};

export { topics, topicNames, config };
