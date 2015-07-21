Template.postItem.helpers({
  upvotedClass: function() {
    var userId = Meteor.userId();
    if (!_.include(this.upvoters, userId)) {
      return 'btn-primary upvotable';
    } else {
      return 'disabled';
    }
  },
});

  Template.posts.helpers({
    posts: function () {
      return Posts.find();
    }
  });

  /*
  Template.postSubmit.events({
    'submit form': function(e) {
      e.preventDefault();

      var post = {
        url: $(e.target).find('[name=url]').val(),
        title: $(e.target).find('[name=title]').val(),
      }

      Meteor.call('post', post.url, post.title);
    }
  });
  */
  
Template.postItem.events({
  'click .upvotable': function(e) {
    e.preventDefault();
    Meteor.call('upvote', this._id);
  }
});
