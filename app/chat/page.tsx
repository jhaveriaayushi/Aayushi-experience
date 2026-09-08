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
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth',
    });
  }, [messages, status]);

  console.log("messages", messages);
  console.log("status", status);
  console.log("error", error);

  return (
    <div className="h-screen flex flex-col flex-1 w-full max-w-4xl mx-auto"
    >

      <div
        className="fixed inset-0 pointer-events-none -z-10"
        style={{
          background: `
      radial-gradient(
        circle at top,
        color-mix(in srgb, var(--accent-light) 20%, transparent),
        transparent 40%
      )
    `,
        }}
      />
      <div className="sticky top-0 z-20">
        <div
          className="
      pointer-events-none
      absolute inset-x-0 top-0 h-24
      bg-gradient-to-b
      from-background/90
      via-background/50
      to-transparent
      backdrop-blur-md
      [mask-image:linear-gradient(to_bottom,black_0%,black_35%,transparent_100%)]
      [-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_35%,transparent_100%)]
    "
        />

        <div className="relative p-4">
          <h1 className="text-2xl font-bold tracking-tight">
            Chat with <AIyushi />
          </h1>
        </div>
      </div>

      {/* Main chat area with welcome message and conversation history */}
      <div className="flex-1 overflow-y-auto p-4">

        {/* Show a starter welcome bubble when no messages exist yet. */}
        {messages.length === 0 && (
          <div className="flex min-h-[calc(100vh-13rem)] flex-col items-center justify-center px-4 py-10 text-center">
            <div className="relative mb-8 flex h-20 w-20 items-center justify-center rounded-[2rem] border border-[var(--accent-light)]/40 bg-[var(--accent-dark)]/20 shadow-[0_0_60px_color-mix(in_srgb,var(--accent-light)_20%,transparent)] before:absolute before:inset-2 before:rounded-[1.5rem] before:border before:border-[var(--accent-light)]/20">
              <span className="relative text-xl font-bold tracking-tight"><AIyushi /></span>
            </div>

            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-[var(--accent-light)]/70">Aayushi&apos;s AI CV</p>
            <h2 className="max-w-xl text-4xl font-bold leading-tight tracking-tight text-[var(--foreground)] sm:text-5xl">
              A CV you can <span className="text-[var(--accent-light)]">talk to.</span>
            </h2>
            <p className="mt-5 max-w-md text-sm leading-6 text-[var(--foreground)]/65 sm:text-base">
              Explore Aayushi&apos;s experience, interests, and the ideas behind her work through a curious conversation.
            </p>

            <div className="mt-8 flex max-w-2xl flex-wrap justify-center gap-2">
              {[
                'Tell me about Aayushi',
                'What are her strongest skills?',
                'Show me her experience',
              ].map(prompt => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => {
                    setInput(prompt);
                    inputRef.current?.focus();
                  }}
                  className="rounded-full border border-[var(--accent-light)]/25 bg-[var(--foreground)]/5 px-4 py-2 text-xs text-[var(--foreground)]/75 transition hover:-translate-y-0.5 hover:border-[var(--accent-light)] hover:bg-[var(--accent-light)]/10 hover:text-[var(--accent-light)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-light)]/60"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}


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
                  {message.role !== "user" ? <AIyushi /> : null}
                  {message.role !== "user" ? ':' : null}
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
        className="relative sticky bottom-0 z-20 p-4 flex gap-2 before:pointer-events-none before:absolute before:inset-x-0 before:bottom-0 before:-z-10 before:h-32 before:content-[''] before:bg-gradient-to-t before:from-background/90 before:via-background/50 before:to-transparent before:backdrop-blur-md before:[mask-image:linear-gradient(to_top,black_0%,black_35%,transparent_100%)] before:[-webkit-mask-image:linear-gradient(to_top,black_0%,black_35%,transparent_100%)]"
        onSubmit={e => {
          e.preventDefault();
          if (input.trim()) {
            sendMessage({ text: input });
            setInput('');
          }
        }}
      >
        <input
          ref={inputRef}
          aria-label="Message Aayushi's AI CV"
          className="min-w-0 flex-1 rounded-xl border border-[var(--foreground)]/50 bg-[var(--foreground)]/5 px-4 py-3 text-sm text-[var(--foreground)] outline-none transition placeholder:text-[var(--foreground)]/45 focus:border-[var(--accent-light)]/70 focus:bg-[var(--foreground)]/10 focus:ring-2 focus:ring-[var(--accent-light)]/15"
          value={input}
          onChange={e => setInput(e.target.value)}
          disabled={status === 'submitted' || status === 'streaming'}
          placeholder="What would you like to know about Aayushi?"
        />
        <button type="submit"
          aria-label="Send message"
          disabled={status === 'submitted' || status === 'streaming'}
          className="buttons rounded-xl px-5 py-3 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-40">
          Send <span aria-hidden="true">↗</span>
        </button>
      </form>
    </div>
  );
}
