import { getConsumer } from "../../consumer/consumer.js";
import { topicNames } from "../../kafka.config.js";

/**
 * Consumes messages from a Kafka topic and processes them.
 *
 * @param {Object} param0 - The message object containing topic, partition, and message details.
 * @param {string} param0.topic - The name of the Kafka topic the message was received from.
 * @param {number} param0.partition - The partition number the message was received from.
 * @param {Object} param0.message - The Kafka message object.
 * @param {Buffer} param0.message.value - The value of the Kafka message in Buffer format.
 *
 * @throws Will log an error if the message value cannot be parsed as JSON.
 */
function consumeMessages({ topic, partition, message }) {
  console.log(
    `Received value:  partitionNumber: ${partition}, topicFrom: ${topic}  `
  );
  const { value } = message;
  let parsedData;
  try {
    parsedData = JSON.parse(value.toString());
  } catch (error) {
    console.error("Error parsing message: ", error);
    return;
  }

  const { orderId, userId, status, items } = parsedData;
  console.log("Sending email with data: ", { orderId, userId, status, items });
}

/**
 * Main function to initialize and start consuming messages from a Kafka topic.
 *
 * @param {string} topic - The name of the Kafka topic to consume messages from.
 * @throws {Error} Throws an error if the consumer is not defined.
 * @returns {Promise<void>} A promise that resolves when the consumer is successfully initialized and starts consuming messages.
 */
async function main(topic) {
  const consumer = getConsumer({ groupId: "mail-service-group" });

  if (!consumer) {
    throw new Error("Consumer is not defined");
  }

  await consumer(topic, consumeMessages);
}

main(topicNames.orderCompleted)
  .then(() => {
    console.log("Mail service started");
  })
  .catch((error) => {
    console.error("Error starting mail service: ", error);
  });
