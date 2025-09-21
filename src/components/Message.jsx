
const Message = ({ message }) => {
  const isUser = message.sender === 'user';


  // Default: text message
  return (
    <div className={`mb-4 ${isUser ? 'text-right' : 'text-left'}`}>
      <div className={`inline-block max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
        isUser ? 'bg-gray-600 text-white' : 'bg-white text-gray-800 shadow-sm border'
      }`}>
        <div className="text-sm" dangerouslySetInnerHTML={{ __html: message.text }}/>
        <p className="text-xs opacity-70 mt-1">
          {message.timestamp && message.timestamp.toLocaleTimeString
            ? message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            : ''}
        </p>
      </div>
    </div>
  );
};

export default Message;

