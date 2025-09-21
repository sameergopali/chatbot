import ChatHeader from "./components/ChatHeader";
import ChatInput from "./components/ChatInput";
import MessageList from "./components/MessageList";
import { useStateMachine } from "./hooks/useStateMachine";

function App() {


  const { messages, sendMessage, reset } = useStateMachine();

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden flex flex-col mt-8" style={{ minHeight: "80vh" }}>
      <ChatHeader />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex justify-end p-2 bg-gray-50 border-b">
          <button
            onClick={reset}
            className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            Reset
          </button>
        </div>
        <MessageList messages={messages} />
      </div>
      <ChatInput onSendMessage={sendMessage} />
    </div>
  );
}

export default App
