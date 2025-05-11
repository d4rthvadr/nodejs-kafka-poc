import kafkaConfig from "../kafka.config.js";

/**
 * Validates the provided groupId to ensure it is a non-empty string.
 *
 * @param {string} groupId - The group ID to validate.
 * @throws {Error} Throws an error if groupId is not provided, is an empty string, or is not of type string.
 */
const validateGroupId = (groupId) => {
  if (!groupId || groupId === "" || typeof groupId !== "string") {
    throw new Error("groupId is not provided, it should be a non-empty string");
  }
};

/**
 * Creates a Kafka consumer and returns a function to subscribe to topics and process messages.
 *
 * @param {Object} options - Configuration options for the consumer.
 * @param {string} options.groupId - The consumer group ID to use for the Kafka consumer.
 * @returns {Function} A function to subscribe to topics and process messages.
 *
 * The returned function has the following signature:
 *
 * @param {string|string[]} topic - The topic or topics to subscribe to.
 * @param {boolean} [fromBeginning=true] - Whether to read messages from the beginning of the topic(s).
 * @param {Function} callback - A callback function to process each message.
 * @param {Object} callback.message - The Kafka message object.
 * @param {string} callback.message.topic - The topic the message was received from.
 * @param {number} callback.message.partition - The partition the message was received from.
 * @param {Object} callback.message.message - The message object containing the value and metadata.
 *
 * @throws {Error} If there is an issue connecting, subscribing, or processing messages.
 */
const getConsumer = ({ groupId }) => {
  validateGroupId(groupId);

  const kafka = kafkaConfig();
  const consumer = kafka.consumer({ groupId });

  return async (topic, callback, fromBeginning = false) => {
    if (callback == null) {
      throw new Error("Consumer is not defined");
    }
    const topics = Array.isArray(topic) ? topic : [topic];
    try {
      await consumer.connect();

      console.log("consumer connected");

      await consumer.subscribe({ topics, fromBeginning });

      await consumer.run({
        eachMessage: callback,
      });
    } catch (error) {
      console.error("error-> ", error);
      await consumer.disconnect();
    }
  };
};

export { getConsumer };
