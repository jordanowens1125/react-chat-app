const users = [];

function userJoin(id, name, chat) {
  const user = { id, name, chat };
  users.push(user);
  return user;
}

function getCurrentUser(id) {
  return users.find((user) => user.id === id);
}

function userLeave(id) {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
}

function getChatUsers(chat) {
  return users.filter((user) => user.chat === chat);
}

module.exports = {
  userJoin,
  getCurrentUser,
  userLeave,
  getChatUsers,
};
