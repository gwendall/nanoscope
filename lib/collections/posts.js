Posts = new Mongo.Collection('posts');

Posts.attachSchema({
  'url': {
    type: String,
    regEx: SimpleSchema.RegEx.Url,
    optional: false
  },
  'title': {
    type: String,
    optional: false,
    defaultValue: ""
  },
  'userId': {
    type: String,
    // regEx: SimpleSchema.RegEx.Id,
    optional: false
  },
  'upvoters': {
    type: Array,
    optional: true,
    defaultValue: []
  },
  'upvoters.$': {
    type: String,
    optional: false
  },
  'votes': {
    type: Number,
    optional: true,
    defaultValue: 0
  }
});

Posts.helpers({
  'user': function(){
    return this.userId && Meteor.users.findOne(this.userId);
  },
  'email': function(){
    var user = this.user() || {};
    return Meteor._get(user, 'emails', 0, 'address');
    //return this.userId && Meteor.users.findOne(this.userId).emails[0].address;
  },
  'fixedTitle': function(){
    return this.title || this.url;
  }
});

SimpleSchema.debug = true;
