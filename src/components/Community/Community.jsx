import React, { useState } from "react";
import { Send, User, Bell, MessageCircle, Heart } from "lucide-react";
import { motion } from "framer-motion";

export const Community = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      user: "Sarah Johnson",
      text: "Does anyone know about the upcoming volunteer training?",
      timestamp: "2 hours ago",
      likes: 3,
    },
    {
      id: 2,
      user: "Mike Rodriguez",
      text: "The disaster preparedness workshop is next Saturday at the community center.",
      timestamp: "1 hour ago",
      likes: 5,
    }
  ]);

  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: messages.length + 1,
        user: "You",
        text: newMessage,
        timestamp: "Just now",
        likes: 0,
      };
      setMessages([...messages, message]);
      setNewMessage("");
    }
  };

  const handleLike = (messageId) => {
    setMessages(messages.map(msg => 
      msg.id === messageId 
        ? { ...msg, likes: msg.likes + 1 } 
        : msg
    ));
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 min-h-screen flex flex-col">
      {/* Soft Header */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white/70 backdrop-blur-md shadow-lg p-4 flex justify-between items-center border-b border-gray-200"
      >
        <div className="flex items-center space-x-3">
          <MessageCircle className="text-indigo-600" size={28} />
          <h2 className="text-2xl font-bold text-indigo-700 tracking-wide">
            Community Chat
          </h2>
        </div>
      </motion.div>

      {/* Message List */}
      <div className="flex-grow overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-blue-100">
        {messages.map((message, index) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
            className={`flex flex-col ${
              message.user === "You" ? "items-end" : "items-start"
            }`}
          >
            <div
              className={`
                max-w-[70%] p-4 rounded-3xl shadow-lg transition-all duration-300
                ${
                  message.user === "You"
                    ? "bg-gradient-to-br from-blue-500 to-indigo-600 text-white"
                    : "bg-white border border-gray-200 text-gray-800"
                }
              `}
            >
              <div className="flex justify-between items-center mb-2">
                <div className="font-semibold text-sm">
                  {message.user}
                </div>
                {message.user !== "You" && (
                  <motion.div 
                    className="flex items-center space-x-1 text-xs"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleLike(message.id)}
                  >
                    <Heart 
                      size={14} 
                      className={`
                        cursor-pointer 
                        ${message.likes > 0 
                          ? 'text-red-500 fill-current' 
                          : 'text-gray-400'}
                      `} 
                    />
                    <span>{message.likes}</span>
                  </motion.div>
                )}
              </div>
              <div className="text-sm">{message.text}</div>
              <div
                className={`text-xs mt-1 ${
                  message.user === "You" ? "text-blue-200" : "text-gray-500"
                }`}
              >
                {message.timestamp}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Message Input */}
      <div className="bg-white/70 backdrop-blur-md p-4 flex items-center space-x-2 border-t border-gray-200 shadow-inner">
        <motion.input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="
            flex-grow p-3 rounded-full 
            bg-blue-50 border border-blue-200 
            focus:bg-white focus:border-blue-400
            shadow-sm transition-all duration-300
          "
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          whileFocus={{ scale: 1.02 }}
        />
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleSendMessage}
          className="
            bg-gradient-to-br from-blue-500 to-indigo-600 
            text-white p-3 rounded-full 
            shadow-lg hover:shadow-xl 
            transition-all duration-300
          "
        >
          <Send size={20} />
        </motion.button>
      </div>
    </div>
  );
};

export default Community;