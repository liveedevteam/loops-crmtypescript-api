import serverless from "aws-serverless-express";
import app from "./app";
import { type APIGatewayProxyEvent, type Context } from "aws-lambda";

const serverHandler = app;
const server = serverless.createServer(serverHandler);
const { PORT } = process.env;

if (process.env.NODE_ENV === "prd") {
  exports.handler = (event: APIGatewayProxyEvent, context: Context) => {
    // console.log(`EVENT: ${JSON.stringify(event)}`);
    return serverless.proxy(server, event, context);
  };
} else {
  app.listen(PORT, () => {
    console.log("App listening on PORT: " + PORT);
  });
}
