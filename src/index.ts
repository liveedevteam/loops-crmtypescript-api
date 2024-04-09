import serverless from 'aws-serverless-express';
import app from './app'

const serverHandler = app;
const server = serverless.createServer(serverHandler);
const {
    PORT
} = process.env

if (process.env.NODE_ENV === 'prd') {
    exports.handler = (event: any, context: any) => {
        // console.log(`EVENT: ${JSON.stringify(event)}`);
        return serverless.proxy(server, event, context);
    };
} else {
    app.listen(PORT, () => console.log("App listening on PORT: " + PORT))
}