import { runWorker } from "./services/worker.service";

console.log("\u2699\uFE0F Starting SwiftSend Worker...");

runWorker().catch((err) => {
    console.error("Fatal error in worker process:", err);
    process.exit(1);
});
