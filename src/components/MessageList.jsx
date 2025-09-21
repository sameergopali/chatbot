import React, { useEffect, useRef } from 'react';

import Message from './Message';

const MessageList = ({ messages }) => {
  const bottomRef = useRef(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className="h-120 overflow-y-auto p-4 bg-gray-50">
      {messages.map((msg) => (
        <Message key={msg.id} message={msg} />
      ))}
      <div ref={bottomRef} />
    </div>
  );
};

export default MessageList;