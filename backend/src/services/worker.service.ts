import {
    ReceiveMessageCommand,
    DeleteMessageCommand,
    SQSClient,
    DeleteMessageBatchCommand,
} from "@aws-sdk/client-sqs";
import { QUEUE_URL, REGION } from "../config/env";
import { sendEmail } from "./email.service";

const client = new SQSClient({
    region: REGION,
    useQueueUrlAsEndpoint: false,
});

const receiveMessages = () =>
    client.send(
        new ReceiveMessageCommand({
            MessageSystemAttributeNames: ["All"],
            MaxNumberOfMessages: 10,
            MessageAttributeNames: ["All"],
            QueueUrl: QUEUE_URL,
            WaitTimeSeconds: 20,
            VisibilityTimeout: 20,
        }),
    );

export const runWorker = async () => {
    if (!QUEUE_URL) {
        console.error("QUEUE_URL is not defined");
        process.exit(1);
    }

    console.log("Worker service active, polling for messages...");

    while (true) {
        try {
            const { Messages } = await receiveMessages();

            if (!Messages || Messages.length === 0) continue;

            console.log(`Processing ${Messages.length} messages...`);

            for (const message of Messages) {
                try {

                    //Failure edgecase email sent queue stopped
                    const payload = JSON.parse(message.Body ?? "{}");
                    await sendEmail(payload);

                    await client.send(
                        new DeleteMessageCommand({
                            QueueUrl: QUEUE_URL,
                            ReceiptHandle: message.ReceiptHandle!,
                        }),
                    );
                } catch (err) {
                    console.error("Failed to process message:", err);
                }
            }


            console.log(`Successfully handled ${Messages.length} messages.`);
        } catch (error) {
            console.error("Worker encounterred an error:", error);
            await new Promise((r) => setTimeout(r, 5000));
        }
    }
};
