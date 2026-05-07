import {
    ReceiveMessageCommand,
    DeleteMessageCommand,
    SQSClient,
    DeleteMessageBatchCommand,
} from "@aws-sdk/client-sqs";
import { QUEUE_URL } from "../env";
import { sendEmail } from "../utils/mailAgent";
const client = new SQSClient({ 
    region: "ap-south-1",
    useQueueUrlAsEndpoint: false,
});

const receiveMessage = (queueUrl: string) =>
    client.send(
        new ReceiveMessageCommand({
            MessageSystemAttributeNames: ["All"],
            MaxNumberOfMessages: 10,
            MessageAttributeNames: ["All"],
            QueueUrl: queueUrl,
            WaitTimeSeconds: 20,
            VisibilityTimeout: 20,
        }),
    );

export const main = async () => {
    if (!QUEUE_URL) {
        console.error("QUEUE_URL is not defined in environment variables");
        process.exit(1);
    }

    console.log("Worker started, polling for messages...");

    while (true) {
        try {
            const { Messages } = await receiveMessage(QUEUE_URL);

            if (!Messages || Messages.length === 0) {
                // No messages, loop continues (ReceiveMessageCommand waits up to 20s due to WaitTimeSeconds)   

                continue;
            }

            console.log(`Received ${Messages.length} messages`);

            // Process each message
            for (const message of Messages) {
                console.log("Processing message:", message.Body);
                const payload = JSON.parse(message.Body ?? "{}");
                await sendEmail(payload);
            }

            // Batch delete messages after processing
            if (Messages.length === 1) {
                await client.send(
                    new DeleteMessageCommand({
                        QueueUrl: QUEUE_URL,
                        ReceiptHandle: Messages[0]!.ReceiptHandle!,
                    }),
                );
            } else {
                await client.send(
                    new DeleteMessageBatchCommand({
                        QueueUrl: QUEUE_URL,
                        Entries: Messages.map((message) => ({
                            Id: message.MessageId!,
                            ReceiptHandle: message.ReceiptHandle!,
                        })),
                    }),
                );
            }
            console.log(`Successfully processed and deleted ${Messages.length} messages.`);

        } catch (error) {
            console.error("Error in worker loop:", error);
            // Wait 5 seconds before retrying to prevent rapid error looping
            await new Promise((resolve) => setTimeout(resolve, 5000));
        }
    }
};

// Start the worker
main().catch((err) => {
    console.error("Fatal error in worker:", err);
    process.exit(1);
});
