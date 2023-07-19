const ChatOption = ({ option, handleClick, chat }) => {
  const selected = option?._id === chat?._id ? "selected" : "";
  return (
    <div
      className={`chat-option ${selected}`}
      onClick={() => handleClick(option)}
    >
      <img
        className="messageImg"
        src={option.coverURL}
        alt={`${option.title} chat`}
      />
      <div className="flex-col">
        <p className="chat-title">{option.title}</p>
        <p className="message-time">{option.date}</p>
        <p className="last-message">{option.lastMessage || "No Messages"}</p>
      </div>
    </div>
  );
};

export default ChatOption;
