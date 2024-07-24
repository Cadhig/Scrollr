Users.hasMany(Posts);

Posts.belongsTo(Users);

Posts.hasMany(Comments);

Comments.belongsTo(Posts);

module.exports = { Users, Posts, Comments, Session };
