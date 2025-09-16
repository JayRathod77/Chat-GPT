import "dotenv/config";
import app from "./src/app.js";
import connectDb from "./src/db/db.js";
import { createServer } from "http";
import initSocketServer from "./src/socket/socket.server.js";

connectDb();

const port = process.env.PORT;

// Create HTTP server with Express app
const httpServer = createServer(app);

// Initialize socket.io on this server
initSocketServer(httpServer);

httpServer.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
