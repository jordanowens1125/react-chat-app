const users = [];

function userJoin(id, user, chat) {
  const member = { id, user, chat };
  const index = users.findIndex((user) => user.id === id);
  if (index === -1) {
    users.push(member);
  } else {
    users[index] = member;
  }
  // console.log(member);
  return member;
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
