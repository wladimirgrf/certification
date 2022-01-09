import path from "path";
import fs from "fs";
import handlebars from "handlebars";

interface ITemplate {
  id: string;
  name: string;
  grade: string;
  date: string;
}

export const compile = async (data: ITemplate) => {
  const cmd = process.cwd();

  const html = fs.readFileSync(
    path.join(cmd, "src", "views", "certificate.hbs"),
    "utf-8"
  );

  const medal = fs.readFileSync(
    path.join(cmd, "src", "views", "images", "medal.png"),
    "base64"
  );

  return handlebars.compile(html)({ ...data, medal });
}