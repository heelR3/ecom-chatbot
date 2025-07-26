import { createContext, useState } from 'react';
import axios from 'axios';

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([
    { id: 1 }, { id: 2 }, { id: 3 }
  ]);

  const selectedSession = (id) => {
    // Just mock previous messages
    setMessages([
      { role: 'user', content: 'What’s the order status of 123?' },
      { role: 'ai', content: 'It is delivered.' }
    ]);
  };

  const sendMessage = async (msg) => {
    setLoading(true);
    setMessages((prev) => [...prev, { role: 'user', content: msg }]);

    try {
      const res = await axios.post('http://localhost:5000/api/chat', { message: msg });
      setMessages((prev) => [...prev, { role: 'ai', content: res.data.reply }]);
    } catch (err) {
      setMessages((prev) => [...prev, { role: 'ai', content: 'Server error' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ChatContext.Provider value={{ messages, sendMessage, loading, conversations, selectedSession }}>
      {children}
    </ChatContext.Provider>
  );
};
