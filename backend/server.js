import "dotenv/config";
import app from "./src/app.js";
import connectDb from "./src/db/db.js";

connectDb();

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`console is running on port: ${port}`);
});
