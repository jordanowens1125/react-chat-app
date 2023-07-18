import * as chatApi from "./chats"
import * as usersApi from "./users";

const api = {
  users: usersApi,
  chats: chatApi
};

export default api;
