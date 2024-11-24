const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const fs = require('fs');
const path = require('path');

// S3クライアントの設定
const s3Client = new S3Client({ 
  region: 'ap-northeast-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

async function uploadDirectory(directory) {
  const files = fs.readdirSync(directory, { recursive: true });
  
  for (const file of files) {
    const filePath = path.join(directory, file);
    if (fs.statSync(filePath).isFile()) {
      const fileContent = fs.readFileSync(filePath);
      
      const command = new PutObjectCommand({
        Bucket: process.env.S3_BUCKET || 'hello-api-frontend-dev',
        Key: file,
        Body: fileContent,
        ContentType: getContentType(file)
      });
      
      try {
        await s3Client.send(command);
        console.log(`Successfully uploaded: ${file}`);
      } catch (error) {
        console.error(`Error uploading ${file}:`, error);
      }
    }
  }
}

function getContentType(filename) {
  const ext = path.extname(filename).toLowerCase();
  const contentTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
  };
  return contentTypes[ext] || 'application/octet-stream';
}

uploadDirectory('./out');
