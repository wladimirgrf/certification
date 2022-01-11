### certification

[![](https://img.shields.io/github/repo-size/wladimirgrf/certification?color=%23000)]()
[![](https://img.shields.io/github/last-commit/wladimirgrf/certification?color=%23000)](https://github.com/wladimirgrf/certification/commits/master)
[![](https://img.shields.io/github/issues/wladimirgrf/certification?color=%23000)](https://github.com/wladimirgrf/certification/issues)
[![](https://img.shields.io/github/license/wladimirgrf/certification?color=%23000)]()

Project developed for the Rocketseat Ignite (_Node.js Path_). This application is a simple serverless for certificate generation through AWS.

## 🌍 Ecosystem

Below the technologies, used to build this Serverless:

|                      Name                                   |                         Status                          |
|:-----------------------------------------------------------:|:-------------------------------------------------------:|
|<img height="58" src="https://cdn.worldvectorlogo.com/logos/nodejs-1.svg"> | <img alt="node version" src="https://img.shields.io/badge/nodejs-v14.17-blue?color=%23000"> |
|<img height="55" src="https://www.vectorlogo.zone/logos/serverless/serverless-icon.svg"> | <img alt="serverless version" src="https://img.shields.io/badge/serverless-v2.70-blue?color=%23000">|
|<img height="55" src="https://cdn.worldvectorlogo.com/logos/typescript.svg"> | <img alt="typescript version" src="https://img.shields.io/badge/typescript-v4.0-blue?color=%23000"> |
|<img height="60" src="https://cdn.worldvectorlogo.com/logos/aws-lambda.svg"> | <img alt="aws-lambda version" src="https://img.shields.io/badge/aws_lambda-v2.10-blue?color=%23000"> |
|<img height="60" src="https://cdn.worldvectorlogo.com/logos/aws-api-gateway.svg"> | <img alt="aws-api-gateway version" src="https://img.shields.io/badge/aws_api_gateway-v2.10-blue?color=%23000"> |
|<img height="60" src=".github/assets/aws-s3.svg"> | <img alt="aws-s3 version" src="https://img.shields.io/badge/aws_s3-v2.10-blue?color=%23000"> |
|<img height="60" src="https://cdn.worldvectorlogo.com/logos/aws-iam.svg"> | <img alt="aws-iam-roles version" src="https://img.shields.io/badge/aws_iam_roles-v3.2-blue?color=%23000"> |
|<img height="60" src="https://cdn.worldvectorlogo.com/logos/aws-cloudformation.svg"> | <img alt="aws-cloudformation version" src="https://img.shields.io/badge/aws_cloudformation-v2.10-blue?color=%23000"> |
|<img height="55" src="https://cdn.worldvectorlogo.com/logos/aws-dynamodb.svg"> | <img alt="aws-dynamodb version" src="https://img.shields.io/badge/aws_dynamodb-v0.2-blue?color=%23000"> |
|<img height="60" src="https://www.vectorlogo.zone/logos/handlebarsjs/handlebarsjs-ar21.svg"> | <img alt="handlebars version" src="https://img.shields.io/badge/handlebars-v4.7-blue?color=%23000"> |

## ▶️ Getting started

**Requirements**

- [AWS | Configuration and credential file settings.](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html)

**Clone the project and access the folder**

```bash
$ git clone https://github.com/wladimirgrf/certification.git && cd certification
```

**Follow the steps below**

```bash
# Project dependencies
$ npm i

# Make a copy of '.env.example' to '.env'
# and set with YOUR environment variables.
$ cp .env.example .env

# Dynamodb local install
$ npm run dynamo:install

# Start Dynamodb
$ npm run dynamo:start

# Start the serverless
$ npm run dev
```

## 🤝 Contributing

```bash
# Fork the repository
# Clone your fork
$ git clone fork-url && cd certification

# Create a branch for your edits
$ git checkout -b new-feature

# Make the commit with your changes
$ git commit -m 'feat: New feature'

# Send the code to your remote branch
$ git push origin new-feature
```

After your pull request is merged, you can delete your branch

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

