import { Kafka } from "kafkajs";
import { topics } from "../kafka.config.js";

const clientId = "init";
const brokers = ["localhost:9092"];

const kafka = new Kafka({
  clientId,
  brokers,
});

(async () => {
  const admin = kafka.admin();

  try {
    await admin.connect();

    console.log("Admin connected", { clientId, brokers, topics });

    const existingTopics = await admin.listTopics();

    console.log("existing topics", existingTopics);

    const topicsToCreate = topics.filter(
      (topic) => !existingTopics.includes(topic.name)
    );
    console.log("topics to create: ", topicsToCreate);
    if (topicsToCreate.length === 0) {
      console.log("No new topics to create");
      return;
    }

    const created = await admin.createTopics({
      topics: topicsToCreate.map((topic) => ({
        topic: topic.name,
        numPartitions: topic.partitions || 2,
        replicationFactor: topic.replicationFactor || 1,
      })),
    });

    console.log(`topics created`, { created });

    await admin.disconnect();
  } catch (error) {
    console.error("error-> ", error);
  } finally {
    await admin.disconnect();
  }
  console.log("Admin disconnected");
})();
