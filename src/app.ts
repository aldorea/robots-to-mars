import bodyParser from 'body-parser';
import express from 'express';
import mongoose from 'mongoose';

// mongoose.Promise = global.Promise;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose
  .connect(`mongodb://localhost:27017/robots`, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Database connected'))
  .catch((err) => console.log(err));

export default app;
