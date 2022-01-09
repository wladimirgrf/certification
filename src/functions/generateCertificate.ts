import "dotenv/config";

import dayjs from "dayjs";
import { S3 } from "aws-sdk";
import { APIGatewayProxyHandler } from "aws-lambda";

import { client } from "../utils/dynamodb";
import { compile } from "../utils/handlebars";

interface IRequest {
  id: string;
  name: string;
  grade: string;
}

export const handle: APIGatewayProxyHandler = async (event, context, callback) => {
  const { id, name, grade } = JSON.parse(event.body) as IRequest;

  const response = await client.query({
    TableName: process.env.AWS_DYNAMODB_TABLE_NAME,
    KeyConditionExpression: "id = :id",
    ExpressionAttributeValues: { ":id": id }
  }).promise();

  const userFound = response.Items[0];

  if (!userFound) {
    await client.put({
      TableName: process.env.AWS_DYNAMODB_TABLE_NAME,
      Item: { id, name, grade }
    }).promise();
  }

  const content = await compile({
    id,
    name,
    grade,
    date: dayjs().format("DD/MM/YYYY"),
  });

  const s3 = new S3();

  await s3.putObject({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `${id}.html`,
    ACL: "public-read",
    Body: content,
    ContentType: "text/html; charset=utf-8"
  }).promise();

  return {
    statusCode: 201,
    body: JSON.stringify({
      message: "Certificate was created",
      link: `${process.env.AWS_S3_BASE_URL}/${id}.html`
    }),
    headers: {
      "Content-Type": "application/json"
    }
  }
}
