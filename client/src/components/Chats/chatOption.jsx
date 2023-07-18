const ChatOption = ({ option, setChat }) => {
  return (
    <div className="chat-option">
      <img
        className="messageImg"
        src={option.coverURL}
        alt={`${option.title} chat`}
      />
      <div className="flex-col">
        <p className="chat-title">{option.title}</p>
        <p className="message-time">{option.time}</p>
        <p className="last-message">{option.lastMessage}</p>
      </div>
    </div>
  );
};

export default ChatOption;
