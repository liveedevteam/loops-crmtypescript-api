import express, { type Express, type Request, type Response } from "express";
import dotenv from "dotenv";
import dayjs from "dayjs";
import cors from "cors";
import bodyParser from "body-parser";
import compression from "compression";
import helmet from "helmet";
import fileUpload from "express-fileupload";
import timeout from "connect-timeout";
import morgan from "morgan";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

import handleError from "./middlewares/handleError";
import assignId from "./utils/assignId";
import authsRoutes from "./routes/auths.routes";
import haltOnTimedout from "./middlewares/haltOnTimedout";
import { connectDB } from "./configs/database";
import { swaggerOptions } from "./configs/swagger";
import { swaggerBasicAuth } from "./middlewares/swaggerBasicAuth";

dotenv.config();
dayjs.extend(utc);
dayjs.extend(timezone);
morgan.token(
  "id",
  (req: Request<any, any, any, any, any> & { id?: string }) => req?.id,
);

const app: Express = express();
const { VERSION, NODE_ENV } = process.env;
let morganConfig = "dev";
if (NODE_ENV === "prod") {
  morganConfig = ":id :method :url :response-time --- :status";
}
const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use("/api-docs", swaggerBasicAuth, swaggerUi.serve, swaggerUi.setup(swaggerSpec));
void connectDB();

app.use(assignId);
app.use(morgan(morganConfig));
app.use(compression());
app.use(fileUpload());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());
app.disable("x-powered-by");
app.use(timeout("300s"));
app.use(haltOnTimedout);
app.use("/api/auths", authsRoutes);

app.get("/health", (req: Request, res: Response) => {
  res.sendStatus(200);
});

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Hello World!",
    version: VERSION,
    timestamp: dayjs().tz("Asia/Bangkok").format(),
  });
});

app.use(handleError);

export default app;
