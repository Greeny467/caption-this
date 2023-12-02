const uploadFileToS3 = async (url, data) => {
    try {
      return new Promise((resolve, reject) => {
        const req = https.request(
          url,
          { method: "PUT", headers: { "Content-Length": new Blob([data]).size } },
          (res) => {
            let responseBody = "";
            res.on("data", (chunk) => {
              responseBody += chunk;
            });
            res.on("end", () => {
              resolve(responseBody);
            });
          },
        );
        req.on("error", (err) => {
          reject(err);
        });
        req.write(data);
        req.end();
      });
  }
  catch (error) {
    console.error(error);
  };
}
  
export default uploadFileToS3;