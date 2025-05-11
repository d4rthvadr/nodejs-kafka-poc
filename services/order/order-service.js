import { generateUniqueId } from "../../id-gen.js";
import { topicNames } from "../../kafka.config.js";
import { getProducer } from "../../producer/producer.js";

const clientId = "order-svc-producer";

const producer = getProducer(clientId);

if (!producer) {
  throw new Error("Producer not initialized");
}

const orderId = generateUniqueId();
const userId = `user_${generateUniqueId()}`;

const orderStatus = {
  created: "created",
  pending: "pending",
  completed: "completed",
  cancelled: "cancelled",
};

/**
 * Creates a message object from the provided body.
 *
 * @param {Object} body - The input object containing order details.
 * @param {string} body.orderId - The unique identifier for the order.
 * @param {string} body.userId - The unique identifier for the user.
 * @param {string} body.status - The current status of the order.
 * @param {Array} body.items - The list of items in the order.
 * @returns {Object} The formatted message object containing order details.
 */
const createMessage = (body) => {
  const { orderId, userId, status, items } = body;
  return {
    orderId,
    userId,
    status,
    items,
    timestamp: new Date().toISOString(),
  };
};

export const createOrder = async () => {
  const items = [
    { productId: "p1", quantity: 2 },
    { productId: "p2", quantity: 1 },
  ];

  const message = createMessage({
    orderId,
    userId,
    status: orderStatus.created,
    items: items,
  });

  const payload = JSON.stringify(message);
  producer(topicNames.orderCreated, payload, userId);
};

export const updateOrder = async () => {
  const items = [
    { productId: "p1", quantity: 5 },
    { productId: "p2", quantity: 7 },
  ];

  const message = createMessage({
    orderId,
    userId,
    status: orderStatus.pending,
    items: items,
  });

  const payload = JSON.stringify(message);
  await producer(topicNames.orderUpdated, payload, userId);
};

export const completeOrder = async () => {
  const message = createMessage({
    orderId,
    userId,
    status: orderStatus.completed,
  });

  const payload = JSON.stringify(message);
  producer(topicNames.orderCompleted, payload, userId);
};
