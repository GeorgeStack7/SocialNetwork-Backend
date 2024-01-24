// import { Consumer, EachMessagePayload } from 'kafkajs';
// import { kafka } from './kafka';

// const consumer = kafka.consumer({ groupId: 'test-group' });

// (async () => {
//   await consumer.connect()
//   await consumer.subscribe({ topic: 'test-jaguar', fromBeginning: true })
//   await consumer.run({
//     eachMessage: async ({ topic, partition, message }: EachMessagePayload) => {
//       console.log({
//         value: message.value?.toString(),
//       })
//     },
//   })
// })();

import { Kafka } from "kafkajs";

const brokers = ['kafka-broker-1:9092']
// const brokers = ['10.8.1.1:9092']

// const topics = ["message-created"] as const; 
// const topics = ["message-created"]; 
const topics = ["test-jaguar"];

const kafka = new Kafka({
    clientId: 'user-service',
    brokers
});

const consumer = kafka.consumer({
    groupId: 'user-service'
})

function messageCreatedHandler(data: any){

    console.log('Got a new message', JSON.stringify(data, null, 2));
}

const topicToSubscribe: Record<typeof topics[number], Function> = {
    "test-jaguar": messageCreatedHandler,
}; 

export async function connectConsumer() {
    await consumer.connect();
    console.log('Connect to Consumer');

    // for (let i = 0; i < topics.length; i++) {
    //     await consumer.subscribe({
    //         topic: topics[i],
    //         fromBeginning: true
    //     });
    // }
    await consumer.subscribe({
        topics: ['test-jaguar'],
        fromBeginning: true
    });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            if (!message || !message.value) {
                return;
            }

            const data = JSON.parse(message.value.toString());

            const handler = topicToSubscribe[topic];

            if (handler) {
                handler(data)
            }
        }
    })
}

export async function disconnectConsumer() {
    await consumer.disconnect();
    console.log('Disconnected from Consumer');    
}
