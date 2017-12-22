// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region 
//AWS.config.update({region: 'ap-south-1'});
AWS.config.loadFromPath('../config.json');

// Create EC2 service object
var ec2 = new AWS.EC2({apiVersion: '2016-11-15'});

var params = {
    InstanceCount: 1, 
      BlockDurationMinutes: 60,
     LaunchSpecification: {
 /*    IamInstanceProfile: {
      Arn: "arn:aws:iam::061082720923:policy/spotinstance-policy"
	},
 */  
	ImageId: "ami-a73c76c8", 
     InstanceType: "t2.micro", 
     KeyName: "test-ec2-key", 
     Placement: {
      AvailabilityZone: "ap-south-1b"
     }, 
     SecurityGroupIds: [
        "sg-78d0df10"
     ]
    }, 
      SpotPrice: "0.0088", 
    Type: "one-time"
   };

   ec2.requestSpotInstances(params, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
     else     console.log(data);           // successful response
     
   });
