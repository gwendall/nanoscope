Meteor.methods({
  post: function(title, url) {
    check(this.userId, String);
    var post = {
      userId: this.userId,
      title: title,
      url: url
    };
    Posts.insert(post);
  },
  upvote: function(postId) {
    check(this.userId, String);
    Posts.update({
      _id: postId,
      upvoters: {$ne: this.userId}
    }, {
      $addToSet: {upvoters: this.userId},
      $inc: {votes: 1}
    });
  }
});
