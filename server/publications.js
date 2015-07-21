Meteor.publish(null, function(limit) {
  return Posts.find();
});
