import axios from "axios";
const baseURL = process.env.REACT_APP_BASELINE_URL + "chats";

export const createChat = async (chat, loggedInUser) =>
  await axios
    .post(baseURL, chat, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${loggedInUser.token}`,
      },
    })
    .then((response) => {
      return response.data;
    });

export const getChats = async (loggedInUser) =>
  await axios
    .get(baseURL + `/${loggedInUser._id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${loggedInUser.token}`,
      },
    })
    .then((response) => {
      return response.data;
    });
