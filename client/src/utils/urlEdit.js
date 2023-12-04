const url = require('url');

const s3Url = 'https://caption-this-url.s3.us-west-1.amazonaws.com/anime-girl-for-poster.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIASRKHE6ZDZTXQCYS5%2F20231202%2Fus-west-1%2Fs3%2Faws4_request&X-Amz-Date=20231202T034606Z&X-Amz-Expires=900&X-Amz-Signature=55a3bbdb842c93d60a39d7665595ecbb9d5511caeafc4cffd3cd352606ccff32&X-Amz-SignedHeaders=host';

// Parse the S3 URL
const parsedUrl = new URL(s3Url);

// Remove the region part from the host
parsedUrl.host = parsedUrl.host.replace('.us-west-1', '');

// Reconstruct the modified URL
const modifiedUrl = parsedUrl.href;

console.log(modifiedUrl); 