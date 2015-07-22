Template.postItem.helpers({
  upvotedClass: function() {
    var userId = Meteor.userId();
    if (!_.include(this.upvoters, userId)) {
      return 'btn-primary';
    } else {
      return 'disabled';
    }
  },
});

Template.postItem.events({
  'click .upvote': function(e) {
    e.preventDefault();
    Meteor.call('upvote', this._id, function(err, res) {
      if (!err) return;
      if (err.reason === 'missingUser') {
        console.log('Please log in to upvote.');
        sAlert.warning('Please log in to upvote.', {timeout: 3000 });
      }
    });
  }
});

Template.posts.helpers({
  posts: function () {
    var order = FlowRouter.getQueryParam('order');
    var selector = {};
    var options = {};
    if (order === 'votes') {
      options = { sort: { votes: -1 }};
    }
    return Posts.find(selector, options);
  }
});

Meteor.startup(function () {

  sAlert.config({
    effect: 'jelly',
    position: 'top-right',
    timeout: 5000,
    html: false,
    onRouteClose: true,
    stack: true,
    offset: 0
  });

});
