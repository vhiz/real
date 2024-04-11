import moment from "moment";
export default function Message({ own, message }) {
  return (
    <div
      className={`chat ${
        own
          ? `chat-end ${
              message.newMessage
                ? "animate-bounceInUp animate-duration-[1s]"
                : ""
            }`
          : `chat-start ${message.newMessage ? "animate-shakeX" : ""}`
      } mt-3`}
    >
      <div
        className={`chat-bubble text-white  ${
          own ? "bg-slate-800" : "bg-blue-400 "
        }`}
      >
        {message.text}
      </div>
      <div className="chat-footer opacity-50">
        {own
          ? `Seen ${moment(message.createdAt).fromNow()}`
          : `Delivered ${moment(message.createdAt).fromNow()}`}
      </div>
    </div>
  );
}
