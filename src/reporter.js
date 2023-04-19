let s3Client
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

module.exports.reportToS3 = async function (
    profilingData,
    bucketName,
    pathPrefix,
    fileName,
    functionName,
    awsRequestId
) {
    if (!s3Client) {
        s3Client = new S3Client({ region: process.env.AWS_REGION });
    }
    const params = {
        Body: JSON.stringify(profilingData),
        Bucket: bucketName,
        Key: `${pathPrefix}${functionName}/${awsRequestId}/${fileName}.cpuprofile`,
    }
    const command = PutObjectCommand(params)
    await s3Client.send(command)
}
