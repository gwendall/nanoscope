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

SimpleSchema.debug = true;
