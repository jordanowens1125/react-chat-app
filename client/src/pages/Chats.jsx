import { useEffect, useState } from "react";
import ChatOption from "../components/chatOption";
import Message from "../components/message";
import { io } from "socket.io-client";

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
  const name = "Jordan";
  const [chat, setChat] = useState("idk");
  const [chats, setChats] = useState([]);
  const [user, setUser] = useState({ name });
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([
    {
      text: "First test",
      time: new Date().getTime(),
      name: "Me who else",
    },
  ]);

  const [chatOptions, setChatOptions] = useState([
    {
      title: "Title",
      time: new Date().getTime(),
      lastMessage: "Last Message",
      chatImage:
        "https://images.unsplash.com/photo-1688902325229-f6f2ad06561d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=695&q=80",
    },
    {
      title: "Title",
      time: new Date().getTime(),
      lastMessage: "Last Message",
      chatImage:
        "https://images.unsplash.com/photo-1688902325229-f6f2ad06561d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=695&q=80",
    },
  ]);

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
    socket.emit("joinChat", { name, chat });
  }, [chat]);

  const creatMessage = (e) => {
    e.preventDefault();
    const msgEl = document.getElementById("chat-input");
    const msg = msgEl.value;
    socket.emit("newMessage", msg);
    msgEl.value = "";
    goToBottom();
  };

  let lastSender = {};

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

  const focusOnInput = () => {
    const msgEl = document.getElementById("chat-input");
    msgEl.focus();
  };

  return (
    <main>
      <section className="chat-page">
        <div className="chat-selection-sidebar">
          <p className="chat-selection-heading theme-text">Chats</p>
          <div className="chat-selection-options">
            {chatOptions.map((option, index) => {
              return <ChatOption option={option} key={index} />;
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
                  <Message message={message} />
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
