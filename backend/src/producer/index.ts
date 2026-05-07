import { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs";
import { QUEUE_URL } from "../env";

const client = new SQSClient({
    region: "ap-south-1",
    useQueueUrlAsEndpoint: false,
});


async function sendMessage(payload: string) {
    const command = new SendMessageCommand({
        QueueUrl: QUEUE_URL,
        MessageBody: payload,
    });

    const response = await client.send(command);

    console.log("Message sent:", response);
}


export default sendMessage;