import path from "path";
import fs from "fs";
import handlebars from "handlebars";
import dayjs from "dayjs";
import { S3 } from "aws-sdk";

import { document } from "../utils/dynamodbClient";

interface ICreateCertificate {
  id: string;
  name: string;
  grade: string;
}

interface ITemplate {
  id: string;
  name: string;
  grade: string;
  date: string;
}

const compile = async (data: ITemplate) => {
  const templatePath = path.join(
    process.cwd(),
    "src",
    "templates",
    "certificate.hbs"
  );

  const medalPath = path.join(
    process.cwd(),
    "src",
    "templates",
    "selo.png"
  );

  const html = fs.readFileSync(templatePath, "utf-8");
  const medal = fs.readFileSync(medalPath, "base64");

  return handlebars.compile(html)({ ...data, medal });
}

export const handle = async (event, context, callback) => {
  const { id, name, grade } = JSON.parse(event.body) as ICreateCertificate;

  const TableName = "users_certificates";

  const responseQuery = await document.query({
    TableName,
    KeyConditionExpression: "id = :id",
    ExpressionAttributeValues: {
      ":id": id
    }
  }).promise();

  const userAlreadyExists = responseQuery.Items[0];

  if(!userAlreadyExists){
    const Item = { id, name, grade };
    await document.put({ TableName, Item }).promise();
  }

  const today = dayjs().format("DD/MM/YYYY");

  const data: ITemplate = {
    id,
    name,
    grade,
    date: today,
  }

  const content = await compile(data);

  const s3 = new S3({
    credentials: {
      accessKeyId: process.env.ACCESS_KEY_ID,
      secretAccessKey: process.env.SECRET_ACCESS_KEY
    }
  });

  await s3.putObject({
    Bucket: "serverlesscertification",
    Key: `${id}.html`,
    ACL: "public-read",
    Body: content,
    ContentType: "text/html; charset=utf-8"
  }).promise();

  return {
    statusCode: 201,
    body: JSON.stringify({
      message: "Certificate created!",
    }),
    headers: {
      "Content-Type": "application/json"
    }
  }
}
