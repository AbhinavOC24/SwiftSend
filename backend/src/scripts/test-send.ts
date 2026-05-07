import sendMessage from "../producer";

const testPayload = {
    sendTo: "22uec001@lnmiit.ac.in",
    subject: "Test Email from SQS Script",
    body: "This is a test message to verify the SQS producer and worker are working correctly."
};

console.log("Sending test message to SQS...");

sendMessage(JSON.stringify(testPayload))
    .then(() => {
        console.log("Test message sent successfully!");
        process.exit(0);
    })
    .catch((error) => {
        console.error("Failed to send test message:", error);
        process.exit(1);
    });
