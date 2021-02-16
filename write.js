const AWS = require("aws-sdk");
require('dotenv').config();

// ----------------- Writing data to AWS DynamoDB Table ---------------
let awsConfig = {
    "region": "ap-south-1",
    "endpoint": "http://dynamodb.ap-south-1.amazonaws.com",
    "accessKeyId": process.env.AWSAccessKeyId, "secretAccessKey": process.env.AWSSecretKey
};
AWS.config.update(awsConfig);

let docClient = new AWS.DynamoDB.DocumentClient();

module.exports.save = (inp)=> {

    // var input = {
    //     "email_id": "example-1@gmail.com", "created_by": "clientUser", "created_on": new Date().toString(),
    //     "updated_by": "clientUser", "updated_on": new Date().toString(), "is_deleted": false
    // };
    let params = {
        TableName: "CovidNews",
        Item:  inp
    };
    docClient.put(params, function (err, data) {

        if (err) {
            console.log("table::save::error - " + JSON.stringify(err, null, 2));                      
        } else {
            console.log("table::save::success" );                      
        }
    });
}


