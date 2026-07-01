"use client";

import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport, type UIMessage } from 'ai';
import { useRef, useEffect, useState, useMemo } from 'react';
import { useGameStore } from '@/lib/store';
import { PixelCard } from '@/components/ui/PixelCard';

export function ChatBox() {
    const { stats, stage } = useGameStore();

    // Create transport with current stats
    const transport = useMemo(() => new DefaultChatTransport({
        api: '/api/chat',
        body: { stats, stage },
    }), [stats, stage]);

    const { messages, sendMessage, status } = useChat({
        transport,
    });

    const isLoading = status === 'submitted' || status === 'streaming';
    const [input, setInput] = useState('');

    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        // Construct message with parts as per Vercel AI SDK v5
        await sendMessage({
            role: 'user',
            parts: [{ type: 'text', text: input }]
        } as any); // Cast to any to avoid strict type issues for now
        setInput('');
    };

    return (
        <PixelCard className="flex flex-col h-64" variant="default">
            <div className="flex-1 overflow-y-auto mb-4 space-y-2 pr-2 scrollbar-thin scrollbar-thumb-retro-pink scrollbar-track-black/20">
                {messages.length === 0 && (
                    <div className="text-center text-white/50 text-xs mt-10">
                        Say hello to your Webagatchi!
                    </div>
                )}

                {messages.map((m: UIMessage) => (
                    <div
                        key={m.id}
                        className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div
                            className={`
                max-w-[80%] p-2 text-xs rounded-lg
                ${m.role === 'user'
                                    ? 'bg-retro-purple text-retro-bg rounded-br-none'
                                    : 'bg-retro-pink text-retro-bg rounded-bl-none'}
              `}
                        >
                            {/* Render parts */}
                            {(m as any).parts?.map((part: any, i: number) => (
                                part.type === 'text' ? <span key={i}>{part.text}</span> : null
                            ))}
                            {/* Fallback for content if it exists */}
                            {(m as any).content}
                        </div>
                    </div>
                ))}

                {isLoading && (
                    <div className="flex justify-start">
                        <div className="bg-retro-pink/50 text-retro-bg p-2 text-xs rounded-lg rounded-bl-none animate-pulse">
                            ...
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                    className="flex-1 bg-black/40 border-2 border-white/20 p-2 text-xs text-white focus:outline-none focus:border-retro-cyan placeholder:text-white/30"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message..."
                />
                <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-retro-cyan text-retro-bg px-4 py-2 text-xs font-bold border-2 border-retro-cyan hover:bg-retro-cyan/80 disabled:opacity-50"
                >
                    SEND
                </button>
            </form>
        </PixelCard>
    );
}
