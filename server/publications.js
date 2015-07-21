Meteor.publish(null, function(limit) {
  var posts = Posts.find();
  var userIds = posts.map(function(p){ return p.userId });
  var users = Meteor.users.find({_id: {$in: userIds}});
  return [posts, users];
});
