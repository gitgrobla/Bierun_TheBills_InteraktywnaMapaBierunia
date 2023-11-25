import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import location from "./routes/location";
import { errorHandler } from "./middleware/errorHandler";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

const whitelist = process.env.CORS_WHITELIST?.split(";");
// const corsOptions = {
//   origin: function (origin, callback) {
//     if (!origin || whitelist?.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   credentials: true,
// };
const corsOptions = {
  origin: function (origin, callback) {
    callback(null, true); //celowo na czas hackathonu ;)
  },
  credentials: true,
};
app.use(cors(corsOptions));

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.use(errorHandler);

app.use("/location", location);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
