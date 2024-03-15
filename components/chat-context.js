import React, { createContext, useContext, useState } from 'react';

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
    const [chatMessages, setChatMessages] = useState([
        { text: "How can I help you today?", sender: "bot" },
    ]);

    return (
        <ChatContext.Provider value={{ chatMessages, setChatMessages }}>
            {children}
        </ChatContext.Provider>
    );
};

export const useChat = () => {
    return useContext(ChatContext);
};
