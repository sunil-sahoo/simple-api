// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region 
AWS.config.update({region: 'ap-south-1'});
AWS.config.loadFromPath('./config.json');

// Create EC2 service object
var ec2 = new AWS.EC2({apiVersion: '2016-11-15'});

var params = {
   ImageId: 'ami-f3e5aa9c', // Ubuntu Server 16.04 LTS
   InstanceType: 't2.micro',
   KeyName: 'test-ec2-key',
 SecurityGroupIds: ['sg-78d0df10' ],
  Placement: { AvailabilityZone: 'ap-south-1a'},

   SubnetId: 'subnet-f7b37a9f',
  UserData: 'c3VkbyBhcHQtZ2V0IHVwZGF0ZSAmJiBzdWRvIGFwdC1nZXQgaW5zdGFsbCAteSBhcGFjaGUyICYmIHN1ZG8gc2VydmljZSBhcGFjaGUyIHN0YXJ0',

   MinCount: 1,
   MaxCount: 1
  
};

// Create the instance
ec2.runInstances(params, function(err, data) {
   if (err) {
      console.log("Could not create instance", err);
      return;
   }
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
