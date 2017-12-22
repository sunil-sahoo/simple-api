// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region 
AWS.config.update({region: 'ap-south-1'});
AWS.config.loadFromPath('./config.json');

// Create EC2 service object
var ec2 = new AWS.EC2({apiVersion: '2016-11-15'});

var params = {
    InstanceCount: 1, 
    LaunchSpecification: {
     IamInstanceProfile: {
      Arn: "arn:aws:iam::061082720923:user/sunil"
     }, 
     ImageId: "ami-a73c76c8", 
     InstanceType: "t2.micro", 
     KeyName: "test-ec2-key", 
     Placement: {
      AvailabilityZone: "ap-south-1a"
     }, 
     SecurityGroupIds: [
        "sg-78d0df10"
     ]
    }, 
    SpotPrice: "0.03", 
    Type: "one-time"
   };
   ec2.requestSpotInstances(params, function(err, data) {
     if (err) console.log(err, err.stack); // an error occurred
     else     console.log(data);           // successful response
     /*
     data = {
     }
     */
    /////////////////////////////
    var instanceId = data.Instances[0].InstanceId;
    console.log("Created instance", instanceId);
    // Add tags to the instance
    params = {Resources: [instanceId], Tags: [
       {
          Key: 'Name',
          Value: 'SDK Sample'
       }
    ]};
    
    ec2.createTags(params, function(err) {
       console.log("Tagging instance", err ? "failure" : "success");
    });
 
    var param2 = {
         InstanceIds: [instanceId],
    };
 
 // Call EC2 to retrieve the policy for selected bucket
    
    ec2.describeInstances(param2, function(err, data) {
     if (err) {
       console.log("Error", err.stack);
     } else {
       console.log("Success", JSON.stringify(data));
     }
   });
 
});
