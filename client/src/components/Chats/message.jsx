const message = ({ message, user }) => {
  const text = message.text;
  return (
    <div className={user._id === message.creator?._id ? "message own" : "message"}>
      <div className="message-header">
        <img
          className="messageImg"
          src={message?.creator?.photoURL}
          alt=""
        />
        <div className="flex-col">
          <b className="message-sender">{message?.creator?.name}</b>
          <p className="message-time">{message.date}</p>
        </div>
      </div>

      <p className="messageText">{text}</p>
    </div>
  );
};

export default message;
