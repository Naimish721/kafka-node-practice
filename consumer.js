// Import the Kafka client from the client module
const { kafka } = require("./client");
// Get the group ID from the command line arguments (e.g., 'node consumer.js group-id')
const group = process.argv[2];

/**
 * Initialize the Kafka consumer and start consuming messages from the 'rider-updates' topic.
 * @returns {Promise<void>}
 * @description This function connects to the Kafka cluster, subscribes to the 'rider-updates' topic,
 * and logs the consumed messages to the console, along with the topic and partition information.
 * @param {String} group The group ID to identify the consumer group.
 */
async function init() {
  /**
   * Create a new consumer instance with the provided group ID.
   * @type {Consumer}
   * @description The consumer is part of the specified consumer group (groupId).
   */
  const consumer = kafka.consumer({ groupId: group });

  // Connect the consumer to the Kafka cluster
  await consumer.connect();

  // Subscribe the consumer to the 'rider-updates' topic, starting from the earliest messages
  await consumer.subscribe({
    topics: ["rider-updates"], // Topic to consume messages from
    fromBeginning: true, // Start reading from the beginning of the topic
  });

  /**
   * Start consuming messages from the topic.
   * For each message received, log the group ID, topic, partition, and message value to the console.
   */
  await consumer.run({
    eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {
      console.log(
        `${group}: [${topic}]: PART:${partition}:`,
        message.value.toString() // Convert the message value (Buffer) to a string
      );
    },
  });
}

// Start the consumer
init();
