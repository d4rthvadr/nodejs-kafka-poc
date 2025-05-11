import kafkaConfig from "../kafka.config.js";

const validateClientId = (clientId) => {
  if (!clientId || clientId === "" || typeof clientId !== "string") {
    throw new Error(
      "clientId is not provided, it should be a non-empty string"
    );
  }
};
export const getProducer = (clientId) => {
  validateClientId(clientId);
  const kafka = kafkaConfig(clientId);

  const producer = kafka.producer();

  return async (topic, message, key = null) => {
    let isSuccess = false;
    try {
      await producer.connect();

      console.log("producer connected");

      var produceOutput = await producer.send({
        topic,

        messages: [
          {
            ...(key && { key }),
            value: message,
          },
        ],
      });

      console.log(`Produce output ${JSON.stringify(produceOutput)}`);
      isSuccess = true;
    } catch (error) {
      console.error("error-> ", error);
    } finally {
      await producer.disconnect();
      return { success: isSuccess };
    }
  };
};
