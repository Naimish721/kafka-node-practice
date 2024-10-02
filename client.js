// Import the Kafka class from the kafkajs library
const { Kafka } = require("kafkajs");

/**
 * Create a new Kafka instance and export it.
 * @type {Kafka}
 * @description This Kafka instance connects to a Kafka cluster. It includes:
 * - clientId: A unique identifier for this Kafka client.
 * - brokers: An array of broker addresses that are part of the Kafka cluster.
 */
exports.kafka = new Kafka({
  // A unique ID for this Kafka client (useful for logging and tracking)
  clientId: "my-app",
  // List of Kafka brokers (Kafka servers) to connect to
  brokers: ["172.31.0.126:9092"], // Replace with your broker's IP and port if needed
});
