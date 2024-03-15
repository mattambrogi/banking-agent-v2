'use client'

import React, { useState, useEffect, useRef } from 'react';
import { useChat } from '@/components/chat-context'

function ChatComponent() {
    const { chatMessages, setChatMessages } = useChat();

    const [inputText, setInputText] = useState('');
    const [threadId, setThreadId] = useState('');
    const [responseLoading, setResponseLoading] = useState(false); // New state for response loading
    const chatMessagesRef = useRef(null);

    const scrollToBottom = () => {
        if (chatMessagesRef.current) {
            chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        // Scroll to the bottom when chatMessages change (new message arrives)
        scrollToBottom();
    }, [chatMessages]);

    useEffect(() => {
        // Function to fetch a new thread ID
        const fetchThreadId = async () => {
            try {
                const response = await fetch('/api/create-thread', {
                    method: 'POST', // Or 'GET', depending on how you've set up your endpoint
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setThreadId(data.threadId); // Assuming your endpoint returns { threadId: 'some-id' }
            } catch (error) {
                console.error('Error fetching thread ID:', error);
            }
        };

        // Only fetch a new thread ID if one isn't already set
        if (!threadId) {
            fetchThreadId();
        }
    }, []); // Empty dependency array means this effect runs once on mount

    const testAPI = async (inputText) => {
        setResponseLoading(true); // Set loading state when sending a message

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userInput: inputText, threadId: threadId }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            const newBotMessage = { text: data.message, sender: 'bot' };

            // Replace the loading bubble with the actual bot's response
            setChatMessages((prevMessages) => {
                const updatedMessages = [...prevMessages];
                const loadingIndex = updatedMessages.findIndex(
                    (message) => message.text === '...' && message.sender === 'bot'
                );

                if (loadingIndex !== -1) {
                    updatedMessages[loadingIndex] = newBotMessage;
                }

                return updatedMessages;
            });
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setResponseLoading(false); // Reset loading state when the response is received
        }
    };

    const handleSendMessage = () => {
        if (inputText.trim() === '') {
            return;
        }

        const newUserMessage = { text: inputText, sender: 'user' };
        setChatMessages((prevMessages) => [...prevMessages, newUserMessage]);
        setInputText('');

        // Add a loading bubble to indicate that the response is loading
        setChatMessages((prevMessages) => [
            ...prevMessages,
            { text: '...', sender: 'bot' },
        ]);

        // Call the testAPI function after adding the user's message
        testAPI(inputText);
    };

    const handleInputKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };


    // pseudo logic for assistant api call 

    // const handleAssistantMessage = async (inputText) => {
    //     if {!agent} {
    //         createAgent
    //     }

    //     handleAddMessage(inputText) // adds to thread and creates run

    //     const status = incomplete

    //     while status !== 'complete':
    //         checkMessageStatus
    //             if complete
    //                 get message
    //         wait 5 seconds

    //     return message

    // };

    return (
        <div className="relative flex-1 px-4 py-6 sm:px-6">
            {/* Chat messages section */}
            <div
                ref={chatMessagesRef}
                className="mb-4 h-96 overflow-y-auto border border-gray-300 p-4"
                style={{ maxHeight: '1000px' }}
            >
                {chatMessages.map((message, index) => (
                    <div
                        key={index}
                        className={`mb-2 ${message.sender === 'user' ? 'text-right' : 'text-left'
                            }`}
                    >
                        <div
                            className={`${message.sender === 'user'
                                ? 'bg-indigo-600 text-white self-end max-w-[75%] ml-auto'
                                : 'bg-gray-200 text-gray-800 self-start max-w-[75%]'
                                } p-2 rounded-lg`}
                        >
                            {message.text === '...' ? (
                                <svg aria-hidden="true" className="w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
                            ) : (
                                message.text
                            )}

                        </div>
                    </div>
                ))}
            </div>

            {/* Text input area */}
            <div className="flex items-center">
                <input
                    type="text"
                    className="flex-1 border border-gray-300 rounded-l-lg p-2 focus:outline-none"
                    placeholder="Type your message..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={handleInputKeyPress}
                />
                <button
                    className="bg-indigo-600 text-white px-4 py-2 rounded-r-lg hover:bg-indigo-500 focus:outline-none"
                    type="button"
                    onClick={handleSendMessage}
                >
                    Send
                </button>
            </div>
        </div>
    );
}

export default ChatComponent;