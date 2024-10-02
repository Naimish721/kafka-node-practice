const { kafka } = require("./client");

/**
 * Function to initialize the Kafka Admin client, create the topics and disconnect
 * @returns {Promise<void>}
 * @description This function is used to create the topics and disconnect the Kafka Admin client
 * The function connects to the Kafka cluster, creates the topics and disconnects the client
 */
/**
 * @description Connects to the Kafka cluster, creates the topics and disconnects the client
 * @returns {Promise<void>}
 */
async function init() {
  const admin = kafka.admin();
  console.log("Admin Connecting...");
  /**
   * Connect to the Kafka cluster
   * @description Connect to the Kafka cluster using the provided configuration
   */
  await admin.connect();
  console.log("Admin Connection Success...");

  console.log("Creating Topics [rider-updates]");
  /**
   * Create the topics
   * @description Create the topics with the provided configuration
   * @param {Object} topics An array of objects containing the topic name and number of partitions
   * @returns {Promise<void>}
   */
  await admin.createTopics({
    /**
     * Topics to be created
     * @type {Object[]}
     * @description An array of objects containing the topic name and number of partitions
     */
    topics: [
      {
        /**
         * Name of the topic to be created
         * @type {String}
         * @description The name of the topic to be created
         */
        topic: "rider-updates",
        /**
         * Number of partitions for the topic
         * @type {Number}
         * @description The number of partitions for the topic
         */
        numPartitions: 2,
      },
    ],
  });
  console.log("Created....");

  console.log("Disconnecting....");
  /**
   * Disconnect the admin client
   * @description Disconnect the admin client from the Kafka cluster
   * @returns {Promise<void>}
   */
  await admin.disconnect();
}

init();
