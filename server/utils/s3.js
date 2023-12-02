
const { fromIni } = require("@aws-sdk/credential-providers");
const {HttpRequest} = require('@smithy/protocol-http');
const { S3RequestPresigner, getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const { parseUrl } = require('@smithy/url-parser');
const { formatUrl } = require('@aws-sdk/util-format-url');
const { Hash } = require('@smithy/hash-node');


 async function generatePresignedUrl (key) {
  const createPresignedUrlWithoutClient = async ({ region, bucket, key }) => {
    const url = parseUrl(`https://${bucket}.s3.${region}.amazonaws.com/${key}`);
    const presigner = new S3RequestPresigner({
      credentials: fromIni({
        filepath: "./utils/aws-config.ini",
      }),
      region,
      sha256: Hash.bind(null, "sha256"),
    });
  
    const signedUrlObject = await presigner.presign(
      new HttpRequest({ ...url, method: "PUT" }),
    );

    return formatUrl(signedUrlObject);
  };

  const clientURL = await createPresignedUrlWithoutClient({
    region: 'us-west-1',
    bucket: 'caption-this-url',
    key: key
  });

  return(clientURL);
};

module.exports = generatePresignedUrl;
