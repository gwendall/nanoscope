Meteor.methods({
  post: function(doc) {
    check(this.userId, String);
    var post = {
      userId: this.userId,
      title: doc.title,
      url: doc.url
    };
    Posts.insert(post);
  },
  upvote: function(postId) {
    if (!this.userId) throw new Meteor.Error(500, 'missingUser');
    // check(this.userId, String);
    console.log('hello');
    Posts.update({
      _id: postId,
      upvoters: {$ne: this.userId}
    }, {
      $addToSet: {upvoters: this.userId},
      $inc: {votes: 1}
    });
  }
});
