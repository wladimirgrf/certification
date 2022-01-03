import "dotenv/config";
import { DynamoDB } from 'aws-sdk';

const options = {
  region: "localhost",
  endpoint: "http://localhost:8000",
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY
}

const isOffline = () => {
  return process.env.IS_OFFLINE;
}

export const document = isOffline() 
  ? new DynamoDB.DocumentClient(options)
  : new DynamoDB.DocumentClient();