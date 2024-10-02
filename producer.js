// Import the Kafka client from the client module and readline for command line input
const { kafka } = require("./client");
const readline = require("readline");

// Set up the readline interface for reading user input from the command line
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

/**
 * Initialize the Kafka producer and start reading input from the command line.
 * @return {Promise<void>}
 * @description This function connects to the Kafka cluster, reads rider name and location from the command line,
 * and sends the data to the Kafka topic 'rider-updates'. The partition is determined by the rider's location,
 * with "north" messages going to partition 0, and all other locations going to partition 1.
 */
async function init() {
  /**
   * Create a new producer instance.
   * @type {Producer}
   * @description The producer is responsible for sending messages to Kafka topics.
   */
  const producer = kafka.producer();

  // Connect the producer to the Kafka cluster
  console.log("Connecting Producer...");
  await producer.connect();
  console.log("Producer Connected Successfully");

  // Prompt the user for input in the command line
  rl.setPrompt("> ");
  rl.prompt();

  /**
   * Handle each line of input entered by the user.
   * The input should be in the format "riderName location", where riderName is the name of the rider and location is their location.
   * The message is sent to the 'rider-updates' topic, partitioned by location.
   */
  rl.on("line", async function (line) {
    const [riderName, location] = line.split(" "); // Split the input into rider name and location

    // Send a message to the 'rider-updates' topic with the rider's information
    await producer.send({
      topic: "rider-updates",
      messages: [
        {
          // Determine the partition based on the location (north -> partition 0, others -> partition 1)
          partition: location.toLowerCase() === "north" ? 0 : 1,
          key: "location-updates", // Message key
          value: JSON.stringify({
            // Convert rider name and location to a JSON string
            name: riderName,
            location: location,
          }),
        },
      ],
    });
  }).on("close", async () => {
    // When the command line input is closed, disconnect the producer
    await producer.disconnect();
    console.log("Producer Disconnected");
  });
}

// Initialize the producer and start reading input
init();
