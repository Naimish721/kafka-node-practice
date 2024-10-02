# Kafka with Node.js Practice Project

This project demonstrates how to set up and use Kafka with Node.js. It includes the configuration and usage of Kafka producers and consumers to simulate a rider's location update system.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Kafka Setup with Docker](#kafka-setup-with-docker)
- [Endpoints and Functionality](#endpoints-and-functionality)
- [License](#license)

## Installation

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/Naimish721/kafka-node-practice.git
   ```

2. Navigate to the project directory:

   ```bash
   cd kafka-node-practice
   ```

3. Install the required dependencies using npm:
   ```bash
   npm install
   ```

## Usage

# Kafka Setup with Docker

You need to have Docker installed on your machine. If you don't have it, follow the installation instructions on the Docker website.

# To set up Kafka and Zookeeper in Docker, use the following command:

    ```bash
    docker run -d --name zookeeper -p 2181:2181 zookeeper
    docker run -d --name kafka -p 9092:9092 --link zookeeper:woyuan/kafka
    ```

# Running the Application

1. Start Kafka Admin to create the topic:

   ```bash
   node admin.js
   ```

2. Start the Producer (which will allow you to input rider names and locations):

   ```bash
   node producer.js
   ```

3. Start a Consumer by specifying the group ID:

   ```bash
   node consumer.js groupId
   ```

4. Input a rider's name and location in the producer terminal, and the consumer will display the updates.

## Project Structure

```
kafka-node-practice/
├── admin.js # Kafka Admin for creating topics
├── client.js # Kafka client configuration
├── consumer.js # Kafka Consumer for receiving messages
├── producer.js # Kafka Producer for sending messages
├── package.json # Project metadata and dependencies
├── yarn.lock # Yarn lock file for dependency management
└── .gitignore # Files and directories to ignore in version control
```

## Endpoints and Functionality

1. admin.js: Initializes the Kafka Admin client, creates a topic (rider-updates), and disconnects from the Kafka cluster.
2. client.js: Contains the Kafka client configuration, connecting to the Kafka broker.
   consumer.js: The Kafka consumer subscribes to the topic rider-updates and processes messages (rider name and location) by partitioning based on location.
3. producer.js: The Kafka producer sends rider name and location updates to the topic rider-updates. Messages are partitioned based on the rider's location (north -> partition 0, others -> partition 1).
