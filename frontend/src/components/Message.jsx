const Message = ({ content, role }) => {
  const isUser = role === 'user';

  return (
    <div className={`my-2 p-2 rounded max-w-md ${isUser ? 'bg-blue-200 self-end ml-auto' : 'bg-gray-200 self-start mr-auto'}`}>
      {content}
    </div>
  );
};

export default Message;
