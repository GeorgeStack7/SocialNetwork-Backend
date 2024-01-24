// import { KafkaConfig, Kafka} from "kafkajs";

// const kafkaHost = 'kafka-broker-1:9092'

// const kafkaConfig: KafkaConfig = { brokers: [kafkaHost] }

// const kafka = new Kafka(kafkaConfig)

// export {
//     kafka
// }

// Consumer Kafka TypeScript

import { Consumer, ConsumerSubscribeTopics, EachBatchPayload, Kafka, EachMessagePayload } from 'kafkajs'

export class ExampleConsumer {
  private kafkaConsumer: Consumer
  private messageProcessor: any

  public constructor(messageProcessor: any) {
    this.messageProcessor = messageProcessor
    this.kafkaConsumer = this.createKafkaConsumer()
  }

  public async startConsumer(): Promise<void> {
    const topic: ConsumerSubscribeTopics = {
      topics: ['test'],
      fromBeginning: true
    }

    try {
      await this.kafkaConsumer.connect()
      await this.kafkaConsumer.subscribe({
        topics: ['test'],
        fromBeginning: true
    })

      await this.kafkaConsumer.run({
        eachMessage: async (messagePayload: EachMessagePayload) => {
          const { topic, partition, message } = messagePayload
          const prefix = `${topic}[${partition} | ${message.offset}] / ${message.timestamp}`
          console.log(`- ${prefix} ${message.key}#${message.value}`)
        }
      })
    } catch (error) {
      console.log('Error: ', error)
    }
  }

  public async startBatchConsumer(): Promise<void> {
    const topic: ConsumerSubscribeTopics = {
      topics: ['test'],
      fromBeginning: false
    }

    try {
      await this.kafkaConsumer.connect()
      await this.kafkaConsumer.subscribe({
        topics: ['test'],
        fromBeginning: true
    })
      await this.kafkaConsumer.run({
        eachBatch: async (eachBatchPayload: EachBatchPayload) => {
          const { batch } = eachBatchPayload
          for (const message of batch.messages) {
            const prefix = `${batch.topic}[${batch.partition} | ${message.offset}] / ${message.timestamp}`
            console.log(`- ${prefix} ${message.key}#${message.value}`) 
          }
        }
      })
    } catch (error) {
      console.log('Error: ', error)
    }
  }

  public async shutdown(): Promise<void> {
    await this.kafkaConsumer.disconnect()
  }

  private createKafkaConsumer(): Consumer {
    const kafka = new Kafka({ 
      clientId: 'client1',
      // brokers: ['kafka-broker-1:9092']
      brokers : ['10.8.1.1:9092']
    })
    const consumer = kafka.consumer({ groupId: 'group-jaguar' })
    return consumer
  }
}

// Kafka Producer

// import { Kafka } from "kafkajs";

// const brokers = ['kafka-broker-1:9092']

// const kafka = new Kafka({
//   clientId: 'messages-app',
//   brokers
// });

// const producer = kafka.producer();

// export async function connectProducer() {
//   await producer.connect()    
//   console.log('Producer Connected');
// }

// export async function disconnectFromKafka() {
//   return producer.disconnect();
// }

// const topics = ['message-created'] as const 

// export async function sendMessage(topic: typeof topics[number], message: any) {
//   return producer.send({
//     topic,
//     messages: [
//       {value: message}
//     ]
//   });
// }
