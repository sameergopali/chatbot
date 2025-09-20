import React from 'react';
import { Gamepad2 } from 'lucide-react';

const ChatHeader = () => (
  <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
    <div className="flex items-center space-x-3">
      <Gamepad2 className="w-8 h-8" />
      <div>
        <h1 className="text-xl font-bold">Gaming Console Assistant</h1>
        <p className="text-sm opacity-90">Find your perfect gaming setup</p>
      </div>
    </div>
  </div>
);

export default ChatHeader;