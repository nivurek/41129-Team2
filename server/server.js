import express from "express";
import cors from "cors";
import records from "./routes/record.js";
import connectDB from "./db/connection.js";
import AuthRoute from "./routes/auth.js"

const PORT = process.env.PORT || 5050;
const app = express();

connectDB();
app.use(cors());
app.use(express.json());
app.use("/record", records);
app.use("/auth", AuthRoute)

// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});