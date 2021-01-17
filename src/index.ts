import app from './app';
import { NODE_PORT } from './constants';

app.listen(NODE_PORT, () => console.log('Server working'));
