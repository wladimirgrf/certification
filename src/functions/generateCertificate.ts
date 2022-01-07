import path from "path";
import fs from "fs";
import chromium from "chrome-aws-lambda";
import handlebars from "handlebars";
import dayjs from "dayjs";

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

  const Item = { id, name, grade };
  const TableName = "users_certificates";

  await document.put({ TableName, Item }).promise();

  const today = dayjs().format("DD/MM/YYYY");

  const data: ITemplate = {
    id,
    name,
    grade,
    date: today,
  }

  const content = await compile(data);

  const browser = await chromium.puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath
  });

  const page = await browser.newPage();
  await page.setContent(content);

  const path = process.env.IS_OFFLINE ? "certificate.pdf" : null;

  const pdf = await page.pdf({
    format: "a4",
    path,
    landscape: true,
    printBackground: true,
    preferCSSPageSize: true,
  });

  await browser.close();

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
