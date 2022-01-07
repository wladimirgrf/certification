import { APIGatewayProxyHandler } from "aws-lambda";

import { document } from "../utils/dynamodbClient";

export const handle: APIGatewayProxyHandler = async (event, context, callback) => {
  const { id } = event.pathParameters;

  const response = await document.query({
    TableName: "users_certificates",
    KeyConditionExpression: "id = :id",
    ExpressionAttributeValues: {
      ":id": id
    }
  }).promise();

  console.log(response);

  const userCertificate = response.Items[0];

  

  if(!userCertificate){
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
      name: userCertificate.name
    })
  }
}