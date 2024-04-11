import MessageItem from "./MessageItem.jsx";

export default function MessageContainer({ chats }) {
  return (
    <div className="w-full flex flex-col gap-y-5">
      <h2 className="text-2xl font-medium">Messages</h2>
      <div className="w-full flex flex-col gap-y-5 h-[75vh] lg:overflow-y-scroll lg:scrollbar-thin scrollbar-thumb-gray-500 scrollbar-hide">
        {chats.map((message, i) => (
          <MessageItem key={i} message={message} />
        ))}
      </div>
    </div>
  );
}
