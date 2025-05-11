import crypto from "crypto";

export const generateUniqueId = () => {
  return crypto.randomUUID();
};

// console.log(generateUniqueId());
