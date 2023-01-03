import S3 from 'aws-sdk/clients/s3';
import AWS from 'aws-sdk/global'

let s3:S3;
const InitAWS = () => {
    const idPool =  "us-east-1:245e77c1-1cfe-4f91-925e-ad051cfdd663";
    AWS.config.update({
        region: 'us-east-1',
        credentials: new AWS.CognitoIdentityCredentials({
            IdentityPoolId: idPool,
        })
    })
    console.log("Init AWS")
    s3 = new S3({
        apiVersion: "2006-03-01"
    })
}

export {
    InitAWS,
    s3
}
