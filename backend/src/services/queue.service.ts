import { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs";
import { QUEUE_URL, REGION } from "../config/env";

const client = new SQSClient({
    region: REGION,
    useQueueUrlAsEndpoint: false,
});

export const sendMessageToQueue = async (payload: string) => {
    if (!QUEUE_URL) {
        throw new Error("QUEUE_URL is not defined");
    }

    const command = new SendMessageCommand({
        QueueUrl: QUEUE_URL,
        MessageBody: payload,
    });

    const response = await client.send(command);
    console.log("Message queued successfully:", response.MessageId);
    return response;
};
