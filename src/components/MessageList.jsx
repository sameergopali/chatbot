import Message from './Message';

const MessageList = ({ messages}) => (
  <div className="h-96 overflow-y-auto p-4 bg-gray-50">
    {messages.map((msg) => (
      <Message key={msg.id} message={msg} />
    ))}
  </div>
);

export default MessageList;