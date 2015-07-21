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
    if (Posts.find({ _id: postId, upvoters: this.userId }).count()) {
      Posts.update({
        _id: postId
      }, {
        $pull: {upvoters: this.userId},
        $inc: {votes: -1}
      });
    }
    else {
      Posts.update({
        _id: postId,
        upvoters: {$ne: this.userId}
      }, {
        $addToSet: {upvoters: this.userId},
        $inc: {votes: 1}
      });
    }
  }
});
