// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region 
//AWS.config file AccessKey
AWS.config.loadFromPath('../config.json'); //This config.json file is needed to provide acces key of user to make API calls

// Create EC2 service object
var ec2 = new AWS.EC2({apiVersion: '2016-11-15'});

var params = {
    InstanceCount: 1, 
      BlockDurationMinutes: 60, // Time should be multiple of 60mins
     LaunchSpecification: {
	     ImageId: "ami-a73c76c8", //Customized ubuntu 16.04 image with apache and node installed
	     InstanceType: "t2.micro",
	     Placement: {
		     AvailabilityZone: "ap-south-1b"
	     }, 
	     SecurityGroupIds: [
		     "sg-78d0df10"
	     ]
     }, 
	SpotPrice: "0.0095", // Maximum price willing to pay
	Type: "one-time"
};

   ec2.requestSpotInstances(params, function(err, data) {
	   if (err) console.log(err, err.stack); // an error occurred
	   else     console.log(data);           // successful response
	   
   });
