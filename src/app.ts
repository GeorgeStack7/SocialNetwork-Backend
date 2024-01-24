import { Server } from "./models/server";
import { connectConsumer } from "./helpers/kafkaConsumer";
import {ExampleConsumer} from "./helpers/kafka";

// async function gracefulShutdown(server:Awaited<ReturnType<typeof Server>>) {
    
// }

// (async() => {await connectConsumer()})()

// prueba.startBatchConsumer();

// const prueba = new ExampleConsumer();
// prueba.startConsumer();


const server = new Server();
server.listen();




