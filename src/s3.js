const imageUpload = async (base64, userId) => {
  const AWS = require('aws-sdk');

  const { AWS_ACCESS_KEY, AWS_SECRET_KEY, AWS_REGION, BUCKET } = process.env;

  AWS.config.setPromisesDependency(require('bluebird'));
  AWS.config.update({
    accessKeyId: AWS_ACCESS_KEY,
    secretAccessKey: AWS_SECRET_KEY,
    region: AWS_REGION,
  });

  const s3 = new AWS.S3();

  const base64Data = new Buffer.from(
    base64.replace(/^data:image\/\w+;base64,/, ''),
    'base64'
  );
  const type = base64.split(';')[0].split('/')[1];

  const params = {
    Bucket: BUCKET,
    Key: `${userId}.${type}`,
    Body: base64Data,
    ACL: 'public-read',
    ContentEncoding: 'base64',
    ContentType: `image/${type}`,
  };

  let location = '';
  let key = '';
  try {
    const { Location, Key } = await s3.upload(params).promise();
    console.log(location, key, 'location');
    location = Location;
    key = Key;
  } catch (error) {
    console.log(error);
  }

  return location;
};

module.exports = imageUpload;