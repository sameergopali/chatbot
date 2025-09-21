import React from 'react';
import { Home } from 'lucide-react';

const ChatHeader = () => (
  <div className="bg-gray-600 text-white p-4">
    <div className="flex items-center space-x-3">
      <Home className="w-8 h-8" />
      <div>
        <h1 className="text-xl font-bold">Housing Assistant</h1>
        <p className="text-sm opacity-90">Find your perfect housing for you</p>
      </div>
    </div>
  </div>
);

export default ChatHeader;