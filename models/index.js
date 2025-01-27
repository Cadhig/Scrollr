const Users = require('./users.js');
const Posts = require('./posts.js');
const Comments = require('./comments.js');
const Session = require('./sessions.js');

Users.hasMany(Posts);

Posts.belongsTo(Users);

Posts.hasMany(Comments);

Comments.belongsTo(Posts);

module.exports = { Users, Posts, Comments, Session };
