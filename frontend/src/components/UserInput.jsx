import React, { useContext, useState } from 'react';
import { ChatContext } from '../context/ChatContext';

const UserInput = () => {
  const { sendMessage, loading } = useContext(ChatContext);
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      sendMessage(input);
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t flex">
      <input
        className="flex-1 border rounded p-2"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message..."
      />
      <button type="submit" className="ml-2 bg-blue-500 text-white px-4 py-2 rounded" disabled={loading}>
        {loading ? 'Sending...' : 'Send'}
      </button>
    </form>
  );
};

export default UserInput;
