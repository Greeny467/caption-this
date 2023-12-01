
const uploadFile = async (file) => {
    const { createReadStream, filename } = await file;
  
    const upload = {
      Bucket: process.env.AWS_BUCKET,
      ACL: 'public-read',
      ContentDisposition: 'inline',
      Key: filename,
      Body: createReadStream()
    };
  
    return new Promise((resolve) => {
      s3.upload(upload, (err, data) => {
        if (err) {
          console.log('There was an error uploading your photo: ', err);
          throw new Error('There was an error uploading your photo: ', err);
        } else {
          console.log('Photo uploaded!.', data);
          resolve(data.key);
        }
      });
    });
}

export default uploadFile;