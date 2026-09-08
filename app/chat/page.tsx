'use client';

import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { useState, useEffect, useRef } from 'react';
import ReactMarkdown from "react-markdown";
import { AIyushi } from '../ai_box';



export default function Page() {

  // Chat state and helpers from the AI SDK.
  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({
      api: '/api/chat',
    }),
  });



  // Local input value for the message composer.
  const [input, setInput] = useState('');

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth',
    });
  }, [messages, status]);

  return (
    <div className="flex flex-col flex-1 w-full max-w-[1200px] mx-auto">

      <div className="sticky top-0 z-20 justify-between items-center p-4 border-b backdrop-blur-md bg-background/60">
      <h1 className="text-2xl font-bold tracking-tight">Chat with <AIyushi /></h1>
        


      </div>
      {/* Main chat area with welcome message and conversation history */}
      <div className="flex-1 overflow-y-auto p-4">

        {/* Show a starter welcome bubble when no messages exist yet. */}
        <div className="flex mb-4 justify-start">
          <div className="max-w-[70%] rounded-2xl px-4 py-3 assistant-bubble">
            <strong><AIyushi />:</strong> Hi, I'm AIyushi 👋 Aayushi's AI CV. Ask me anything about her experiences and interests.
          </div>
        </div>


        {/* Render all chat messages in the conversation. */}
        {messages.map(message => (
          <div
            key={message.id}
            className={`flex mb-4 ${message.role === 'user'
              ? 'justify-end'
              : 'justify-start'
              }`}>

            <div
              className={`max-w-[70%] rounded-2xl px-4 py-3 ${message.role === 'user'
                ? 'user-bubble'
                : 'assistant-bubble'
                }`}
            >


              <div className="whitespace-pre-wrap">
                <strong>
                  {message.role === "user" ? "User " : <AIyushi />}:
                </strong>

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


        {status === 'submitted' && (
          <div className="flex mb-4 justify-start">
            <div className="assistant-bubble rounded-2xl px-4 py-3 max-w-[70%]">
              <span className="inline-block animate-bounce">•</span>

              <span
                className="inline-block animate-bounce"
                style={{ animationDelay: '0.1s' }}
              >
                •
              </span>

              <span
                className="inline-block animate-bounce"
                style={{ animationDelay: '0.2s' }}
              >
                •
              </span>
            </div>
          </div>
        )}


        {error && (
          <div className="flex mb-4 justify-start">
            <div className="max-w-[70%] rounded-2xl px-4 py-3 bg-red-100 text-red-700 border border-red-300">
              ⚠️ Sorry, AIyushi is having trouble responding right now. Aayushi has recieved an alert. She will be fixing this soon.
              <br />
              Please type another message in to retry.
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message input form for sending new prompts. */}
      <form
        className="sticky bottom-0 border-t backdrop-blur-md bg-background/80 p-4 flex gap-2"
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
          placeholder="What would you like to know about Aayushi?"
        />
        <button type="submit"
          disabled={status === 'submitted' || status === 'streaming'}
          className="px-6 py-2 bg-foreground text-white rounded-xl buttons">
          Submit
        </button>
      </form>
    </div>
  );
}
