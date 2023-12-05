const AWS = require('aws-sdk');
require('dotenv').config();

var credentials = new AWS.SharedIniFileCredentials({profile: 'default', filename: './utils/aws-config.ini'});
AWS.config.credentials = credentials;

const uploadFileToS3 = async (fileBody, key) => {
  const s3 = new AWS.S3({
    apiVersion: '2006-03-01',
    region: process.env.AWS_REGION,
  });

  const params = {
    Bucket: AWS_BUCKET,
    Key: key,
    Body: fileBody // from <input>'s onchange handler, e.g. e.target.files[0]  
  };
  
  try {
    const data = await s3.upload(params).promise();
    console.log('File uploaded to S3: ', data.Key);
    return (key);
  } catch (err) {
    console.error('Error uploading file: ', err);
  }
};

module.exports = uploadFileToS3;