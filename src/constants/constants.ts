import dotenv from 'dotenv';

dotenv.config();

// Enviroment
export const NODE_PORT = process.env.PORT || '3000';
export const MONGODB_HOST = process.env.MONGODB_HOST || 'localhost';
export const MONGODB_PORT = process.env.MONGODB_PORT || 27017;
export const MONGODB_DB = process.env.MONGODB_DB || 'robots';

// Input constants
export const MAX_COORDINATE = process.env.MAX_COORDINATE || 50;
export const MAX_INSTRUCTIONS = process.env.MAX_INSTRUCTIONS || 100;

// Info Messages
export const SUCCESS = 'Success';

// Error Messages
export const MAX_INSTRUCTIONS_MESSAGE =
  'Instructions must not be grater than 100';
export const NO_DATA = 'Data requiered';
export const NOT_FOUND = 'Not Found';
export const MAX_COORDINATE_MESSAGE =
  'Coordinates values must not be greater than 50';
export const INTERNAL_SERVER_ERROR = 'Internal server error';
