import { document } from '../utils/dynamodbClient';

interface ICreateCertificate {
  id: string;
  name: string;
  grade: string;
}

export const handle = async (event, context, callback) => {
  const { id, name, grade } = JSON.parse(event.body) as ICreateCertificate;

  const Item = { id, name, grade };
  const TableName = "users_certificates";

  const result = await document.put({ TableName, Item }).promise();

  console.log(result);

  return {
    statusCode: 201,
    body: JSON.stringify({
      message: "Certificate created!"
    }),
    headers: {
      "Content-Type": "application/json"
    }
  }
}
