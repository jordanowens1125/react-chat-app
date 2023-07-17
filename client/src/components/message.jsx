const message = ({ message, userComment }) => {
  const text = message.text;
  return (
    <div className={userComment ? "message own" : "message"}>
      <div className="message-header">
        <img
          className="messageImg"
          src="https://images.unsplash.com/photo-1688902325229-f6f2ad06561d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=695&q=80"
          alt=""
        />
        <div className="flex-col">
          <b className="message-sender">{message.name}</b>
          <p className="message-time">{message.time}</p>
        </div>
      </div>

      <p className="messageText">{text}</p>
    </div>
  );
};

export default message;
