const dayjs = require("dayjs");

function formatMessage(name, text) {
  return {
    name,
    text,
    time: dayjs(
      new Date(),
      ["YYYY", "YYYY-MM-DD", "YYYY-MM-DD HH:mm:ss"],
      true
    ),
  };
}

module.exports = formatMessage