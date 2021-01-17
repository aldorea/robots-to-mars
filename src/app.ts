import bodyParser from 'body-parser';
import express from 'express';
import mongoose from 'mongoose';
import router from './routes';
import { handleError, handleNotFound } from './errors';
import { MONGODB_DB, MONGODB_HOST, MONGODB_PORT } from './constants';

// mongoose.Promise = global.Promise;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.text());

app.use('/', router);

handleNotFound(app);
handleError(app);

mongoose
  .connect(`mongodb://${MONGODB_HOST}:${MONGODB_PORT}/${MONGODB_DB}`, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Database connected'))
  .catch((err) => console.log(err));

export default app;
