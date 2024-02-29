import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
const socket = io('http://localhost:6005');

const UserProfile = () => {
  const { userId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    // Listen for incoming messages
    socket.on('chat message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      // Disconnect the socket when the component unmounts
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    const trimmedMessage = newMessage.trim(); // Trim whitespace from the message

    if (trimmedMessage !== '') {
      socket.emit('chat message', trimmedMessage);
      setMessages((prevMessages) => [...prevMessages, trimmedMessage]); // Add the new message to the state
      setNewMessage('');
    }
  };

  return (
    <>
      <div>
        <h2>User Profile</h2>
        <p>User ID: {userId}</p>
      </div>

      <div style={{ background: 'white', height: 'calc(73vh - 2rem)', width: '97%', color: 'white', padding: '1rem', display: 'flex', flexDirection: 'column' }}>
        {/* Display the chat messages */}
        <ul style={{ overflowY: 'auto', maxHeight: 'calc(100% - 2rem)', listStyle: 'none', padding: '0', margin: '0' }}>
          {messages.map((message, index) => (
            <li key={index} style={{ marginBottom: '0.5rem' }}>{message}</li>
          ))}
        </ul>

        {/* Input field for new messages */}
        <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center' }}>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            style={{ flex: '1', padding: '1.5rem', border: '1px solid #4a5568', borderRadius: '0.25rem' }}
          />
          <button
            onClick={sendMessage}
            style={{ background: '#4299e1', color: 'white', padding: '1.5rem', marginLeft: '0.5rem', borderRadius: '0.25rem', cursor: 'pointer' }}
          >
            Send
          </button>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
