'use client';

import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { useState } from 'react';
import ReactMarkdown from "react-markdown";





export default function Page() {

  // Track the current visual theme for the chat UI.
  const [theme, setTheme] = useState("boring");

  // Switch between a professional and fun theme and update the page attribute.
  const toggleTheme = () => {
  const newTheme =
    theme === "boring"
      ? "fun"
      : "boring";

  setTheme(newTheme);

  document.documentElement.setAttribute(
    "data-theme",
    newTheme
  );
};


  // Chat state and helpers from the AI SDK.
  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({
      api: '/api/chat',
    }),
  });



  // Local input value for the message composer.
  const [input, setInput] = useState('');

  return (
    
    <>
      <div className="flex flex-col h-screen">

        {/* Header with title and theme switcher */}
        <div className="flex justify-between items-center p-4 border-b">
          <h1 className="text-xl font-bold">
            Chat with AIyushi
          </h1>
          
          <label className="flex items-center gap-2">
              <span>Boring Mode</span>

              <div
                onClick={toggleTheme}
                className={`w-14 h-8 rounded-full cursor-pointer relative transition-colors ${
                  theme === 'fun'
                    ? 'bg-purple-500'
                    : 'bg-slate-500'
                }`}
              >
                <div
                  className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform ${
                    theme === 'fun'
                      ? 'translate-x-7'
                      : 'translate-x-1'
                  }`}
                />
              </div>

              <span>Fun Mode</span>
            </label>

        </div>
        {/* Main chat area with welcome message and conversation history */}
        <div className="flex-1 overflow-y-auto p-4">

          {/* Show a starter welcome bubble when no messages exist yet. */}
          {messages.length === 0 && (
            <div className="flex mb-4 justify-start">
              <div className="max-w-[70%] rounded-2xl px-4 py-3 bg-gray-200 text-black">
                AIyushi: Hi, I'm AIyushi 👋 Aayushi's AI CV. Ask me anything about her experiences and interests. 
              </div>
            </div>
          )}

          {/* Render all chat messages in the conversation. */}
          {messages.map(message => (
            <div
              key={message.id}
              className={`flex mb-4 ${
                message.role === 'user'
                  ? 'justify-end'
                  : 'justify-start'
              }`}>

              <div
                className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                  message.role === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-black'
                }`}
              >

              
            <div className="whitespace-pre-wrap">
              {message.role === 'user' ? 'User: ' : 'AIyushi: '}

              <ReactMarkdown>
                {message.parts
                  .filter((part) => part.type === 'text')
                  .map((part) => part.text)
                  .join('')}
              </ReactMarkdown>
            </div>

              </div>
            </div>
          ))}

          
        {status === 'submitted' || status === 'streaming' ? (
          <div className="flex mb-4 justify-start">
            <div className="bg-gray-200 text-black rounded-2xl px-4 py-3 flex gap-1">
              <span className="animate-bounce">•</span>
              <span
                className="animate-bounce"
                style={{ animationDelay: '0.1s' }}
              >
                •
              </span>
              <span
                className="animate-bounce"
                style={{ animationDelay: '0.2s' }}
              >
                •
              </span>
            </div>
          </div>
        ) : null}


      {error && (
        <div className="flex mb-4 justify-start">
          <div className="max-w-[70%] rounded-2xl px-4 py-3 bg-red-100 text-red-700 border border-red-300">
            ⚠️ Sorry, AIyushi is having trouble responding right now. Aayushi has recieved an alert. She will be fixing this soon.
            <br />
            Please type another message in to retry. 
          </div>
        </div>
      )}

        </div>

                  {/* Message input form for sending new prompts. */}
          <form
            className="border-t p-4 flex gap-2"
            onSubmit={e => {
              e.preventDefault();
              if (input.trim()) {
                sendMessage({ text: input });
                setInput('');
              }
            }}
          >
            <input
              className="flex-1 border rounded-lg px-4 py-2"
              value={input}
              onChange={e => setInput(e.target.value)}
              disabled={status === 'submitted' || status === 'streaming'}
              placeholder="Say something..."
            />
            <button type="submit"
              disabled={status === 'submitted' || status === 'streaming'}
              className="px-6 py-2 bg-blue-500 text-white rounded-xl">
              Submit
            </button>
          </form>
      </div>
    </>
  );
}