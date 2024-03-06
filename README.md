# Papaya Backend Challenge 1

## Introduction
The service is simple API to get and resize images.

## Service Requirements
https://github.com/papaya-insurtech/pumpkin/blob/main/Software_Artisan_Challenges/Back_End_Challenge_1.md

## System Requirement
 - Node.js >= 20
 - AWS Lambda
 - AWS API Geteway
 - AWS S3
 - AWS CloudFront

## How to test
 - In this case we will deploy code to Lambda function and run test in Lambda function.

## How to deploy
 - Run script `deploy-lambda.sh` and upload source code to Lambda function with zip file in path `dist/function.zip`.
 - Setup ENV in Lambda function with `BUCKET_NAME`.
 - Setup API Gateway to trigger Lambda function.
 - Allow permission read/write to S3 bucket for Lambda function.
 - Setup CloudFront to cache image by request and query parameter.
