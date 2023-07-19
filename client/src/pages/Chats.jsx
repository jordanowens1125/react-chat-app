import { useEffect, useState } from "react";
import ChatOption from "../components/Chats/ChatOption";
import Message from "../components/Chats/message";
import { io } from "socket.io-client";
import useAuthContext from "../hooks/useAuthContext";
import NewChat from "../components/Chats/NewChat";
import api from "../api";

const socket = io("http://localhost:8000", {
  reconnectionDelayMax: 10000,
  auth: {
    token: "123",
  },
  query: {
    "my-key": "my-value",
  },
});

const Chat = () => {
  const [chat, setChat] = useState("");
  const { user } = useAuthContext();
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);

  const [chatOptions, setChatOptions] = useState([]);

  const goToBottom = () => {
    focusOnInput();
    const messages = document.getElementsByClassName("message");
    const length = messages.length;
    const el = length < 1 ? "" : messages[length - 1];
    if (el !== "") {
      el.scrollIntoView({
        behavior: "smooth",
      });
    }
  };
  useEffect(() => {
    socket.on("message", (newMessage) => {
      setMessages(messages.concat(newMessage));
    });

    socket.on("chatUsers", ({ users }) => {
      setUsers(users);
    });
    goToBottom();
  }, [messages, chat, user]);

  useEffect(() => {
    console.log(123);
    if (user && chat) {
      socket.emit("joinChat", { user, chat: chat?._id });
    }
  }, [chat, user]);

  useEffect(() => {
    const fetchChats = async () => {
      const result = await api.chats.getChats(user);
      const chatResults = [...result.chats, ...result.createdChats];
      if (chatResults.length > 0) {
        setChat(chatResults[0]);
        setMessages(chatResults[0].messages);
      }
      setChatOptions(chatResults);
    };
    fetchChats();
  }, [user]);

  const creatMessage = (e) => {
    e.preventDefault();
    console.log(chat);
    const msgEl = document.getElementById("chat-input");
    const msg = msgEl.value;
    socket.emit("newMessage", msg);
    msgEl.value = "";
    goToBottom();
  };

  let lastSender = {};

  const focusOnInput = () => {
    const msgEl = document.getElementById("chat-input");
    msgEl.focus();
  };

  const switchChats = (chat) => {
    console.log(chat);
    setChat(chat);
    if (chat.messages.length > 0) {
      setMessages(chat.messages);
    } else {
      setMessages([]);
    }
  };

  return (
    <main>
      <section className="chat-page">
        <div className="chat-selection-sidebar">
          <div className="chat-selection-heading theme-text">
            <p>Chats</p>
            <NewChat />
          </div>

          <div className="chat-selection-options">
            {chatOptions.map((option, index) => {
              return (
                <ChatOption
                  option={option}
                  key={index}
                  handleClick={switchChats}
                  chat={chat}
                />
              );
            })}
          </div>
        </div>
        <div className="chat-section border">
          <div className="chat-heading">
            <p>Chat Title</p>
            <button onClick={goToBottom}>Scroll To Bottom</button>
            {users.length}
          </div>

          <div className="chat">
            {messages.map((message, index) => {
              return (
                <div key={index}>
                  <Message message={message} user={user} />
                </div>
              );
            })}
          </div>
          <form className="new-message border" onSubmit={creatMessage}>
            <input type="text" className="chat-input" id="chat-input" />
            <button type="submit">Submit</button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default Chat;
