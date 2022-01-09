import { APIGatewayProxyHandler } from "aws-lambda";

import { client } from "../utils/dynamodb";

export const handle: APIGatewayProxyHandler = async (event, context, callback) => {
  const { id } = event.pathParameters;

  const response = await client.query({
    TableName: "users_certificates",
    KeyConditionExpression: "id = :id",
    ExpressionAttributeValues: { ":id": id }
  }).promise();

  const userCertificate = response.Items[0];

  if (!userCertificate) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "Certificate is not valid"
      })
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Certificate is valid",
      name: userCertificate.name,
      link: `${process.env.AWS_S3_BASE_URL}/${id}.html`
    })
  }
}