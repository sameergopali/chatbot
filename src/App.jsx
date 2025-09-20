import React, { useState } from "react";

import ChatHeader from "./components/ChatHeader";
import ChatInput from "./components/ChatInput";
import MessageList from "./components/MessageList";

function App() {
  const [messages, setMessages] = useState([]);

  const handleSendMessage = (text) => {
    const newMessage = {
      id: Date.now(),
      text,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden flex flex-col h-[700px]">
      <ChatHeader />
      <div className="flex-1 flex flex-col overflow-hidden">
        <MessageList messages={messages} />
        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
}

export default App
