import React, { useContext } from 'react';
import MessageList from './MessageList';
import UserInput from './UserInput';
import { ChatContext } from '../context/ChatContext';

const ChatWindow = () => {
  const { conversations, selectedSession } = useContext(ChatContext);

  return (
    <div className="flex h-screen">
      {/* Conversation History Panel */}
      <aside className="w-1/4 bg-gray-100 p-4 overflow-y-auto border-r">
        <h2 className="font-bold mb-4">Conversations</h2>
        {conversations.map((conv) => (
          <div
            key={conv.id}
            onClick={() => selectedSession(conv.id)}
            className="cursor-pointer p-2 hover:bg-gray-200 rounded"
          >
            Session #{conv.id}
          </div>
        ))}
      </aside>

      {/* Chat Area */}
      <main className="flex flex-col flex-1">
        <MessageList />
        <UserInput />
      </main>
    </div>
  );
};

export default ChatWindow;
