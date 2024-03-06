#!/bin/bash
echo "$(aws --version)"
CNAME=$1
FNAME=$2
PROFILE=$3
REGION=$4
OUTDIR=dist
DIST=./$OUTDIR
SRC=./
# ROLE=$1-lambda-ex
# POLICY_ARN=arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole
echo "Start deploying $CNAME to $FNAME"
rm -rf $DIST
mkdir $DIST
tsc -p $SRC --outDir $DIST
cp $SRC/package*.json $DIST
cd $DIST
npm install --os=linux --cpu=x64 sharp
npm install
echo "Zipping code folder"
zip -rqX function.zip .
echo "Zipping done"
echo $ROLE
if aws lambda get-function \
    --function-name $FNAME 2>&1 \
    --region=$REGION \
    --profile $PROFILE \
    | grep -q 'ResourceNotFoundException'
then
  echo "Could not find function $FNAME"
else
  aws lambda update-function-code \
  --region=$REGION \
  --function-name $FNAME \
  --zip-file fileb://function.zip \
  --profile $PROFILE
fi
