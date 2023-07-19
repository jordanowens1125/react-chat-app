const dayjs = require("dayjs");

function formatMessage(user, text) {
  return {
    creator: user,
    text,
    date: dayjs(
      new Date(),
      ["YYYY", "YYYY-MM-DD", "YYYY-MM-DD HH:mm:ss"],
      true
    ),
  };
}

module.exports = formatMessage;
