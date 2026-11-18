/*
 * Copyright (C) 2026 Collab+ Contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Code2, 
  Image, 
  Smile, 
  Sparkles, 
  Terminal, 
  Copy, 
  Check, 
  Share2, 
  PhoneCall, 
  Hash, 
  Users, 
  Bot,
  Zap
} from 'lucide-react';

export default function ChatPanel({
  activeRoom,
  messages,
  onSendMessage,
  onSendToCompiler,
  isInVoice,
  onToggleVoiceConnect
}) {
  const [inputText, setInputText] = useState('');
  const [copiedSnippetId, setCopiedSnippetId] = useState(null);
  const messagesEndRef = useRef(null);

  // Dynamic Breadcrumb pill state: onHover show && hide after timeout: 3000
  const [isBreadcrumbVisible, setIsBreadcrumbVisible] = useState(true);
  const breadcrumbTimerRef = useRef(null);

  const startHideTimer = () => {
    if (breadcrumbTimerRef.current) clearTimeout(breadcrumbTimerRef.current);
    breadcrumbTimerRef.current = setTimeout(() => {
      setIsBreadcrumbVisible(false);
    }, 3000);
  };

  const handleBreadcrumbMouseEnter = () => {
    if (breadcrumbTimerRef.current) {
      clearTimeout(breadcrumbTimerRef.current);
      breadcrumbTimerRef.current = null;
    }
    setIsBreadcrumbVisible(true);
  };

  const handleBreadcrumbMouseLeave = () => {
    startHideTimer();
  };

  // Show breadcrumb on initial load and whenever room changes, then hide after 3000ms
  useEffect(() => {
    setIsBreadcrumbVisible(true);
    startHideTimer();
    return () => {
      if (breadcrumbTimerRef.current) clearTimeout(breadcrumbTimerRef.current);
    };
  }, [activeRoom?.id]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    onSendMessage(inputText.trim());
    setInputText('');
  };

  const handleCopyCode = (id, code) => {
    navigator.clipboard.writeText(code);
    setCopiedSnippetId(id);
    setTimeout(() => setCopiedSnippetId(null), 2000);
  };

  return (
    <main className="h-full flex flex-col bg-[#FBF7EE] select-text relative">
      {/* Dynamic Breadcrumbs Rounded Rectangle Pill (Top-Left Anchor, z-[9999], Cream & Sand Dominant) */}
      <div 
        className="absolute top-2 left-3 z-[9999] select-none"
        onMouseEnter={handleBreadcrumbMouseEnter}
        onMouseLeave={handleBreadcrumbMouseLeave}
      >
        <div
          className={`h-10 flex items-center bg-[#FFF3C8]/95 backdrop-blur-xl border-2 border-[#E5CB90] shadow-md px-3 rounded-xl text-xs transition-all duration-300 ease-out cursor-pointer overflow-hidden whitespace-nowrap ${
            isBreadcrumbVisible 
              ? 'ring-2 ring-[#34A99D]/30 border-[#34A99D] shadow-lg' 
              : 'hover:border-[#34A99D] hover:bg-[#FFF3C8]'
          }`}
        >
          {/* Persistent Prefix Icon */}
          <span className="text-[#34A99D] font-extrabold text-sm mr-2 shrink-0">✦</span>

          {/* Collapsible Prefix Path (Extends horizontally to the right) */}
          <div
            className={`flex items-center gap-1.5 text-[#14252D] font-bold transition-all duration-300 ease-out overflow-hidden whitespace-nowrap ${
              isBreadcrumbVisible 
                ? 'max-w-[280px] opacity-100 mr-1.5' 
                : 'max-w-0 opacity-0 mr-0'
            }`}
          >
            <span className="font-extrabold text-[#14252D]">Collab+</span>
            <span className="text-[#E5CB90] font-normal">/</span>
            <span className="text-[#458393] font-bold capitalize">
              {activeRoom?.category === 'code' ? 'Code Sprint' : activeRoom?.category === 'games' ? 'Games & Quizzes' : 'Voice Lounge'}
            </span>
            <span className="text-[#E5CB90] font-normal">/</span>
          </div>

          {/* Active Room Badge */}
          <div className="flex items-center gap-1 font-extrabold text-[#14252D] bg-white border border-[#E5CB90] px-2 py-1 rounded-lg shrink-0 shadow-2xs">
            <span className="text-[#34A99D] font-extrabold text-sm leading-none">#</span>
            <span className="truncate max-w-[140px]">{activeRoom ? activeRoom.name : 'chill-lounge'}</span>
          </div>

          {/* Collapsible Suffix: Live Voice Badge */}
          <div
            className={`flex items-center transition-all duration-300 ease-out overflow-hidden whitespace-nowrap ${
              isBreadcrumbVisible && activeRoom?.isVoiceActive
                ? 'max-w-[90px] opacity-100 ml-1.5'
                : 'max-w-0 opacity-0 ml-0'
            }`}
          >
            <div className="flex items-center gap-1 text-[11px] font-bold text-[#34A99D] bg-[#E6F6F4] border border-[#34A99D]/40 px-1.5 py-0.5 rounded-md shrink-0 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#34A99D] animate-pulse"></span>
              <span>Voice</span>
            </div>
          </div>

          {/* Subtle Collapsed Hint Dots */}
          <div
            className={`flex items-center text-[#458393] text-xs font-mono transition-all duration-300 ease-out overflow-hidden ${
              !isBreadcrumbVisible 
                ? 'max-w-[24px] opacity-100 ml-1.5' 
                : 'max-w-0 opacity-0 ml-0'
            }`}
          >
            ⋯
          </div>
        </div>
      </div>

      {/* Floating Top-Right 2-Button Action Bar Pill (Cream & Sand Dominant, z-[9999]) */}
      <div className="absolute top-2 right-3 z-[9999] select-none flex items-center gap-1.5 bg-[#FFF3C8]/95 backdrop-blur-xl border-2 border-[#E5CB90] shadow-md p-1 rounded-full">
        {/* Round Call Button */}
        <button
          onClick={onToggleVoiceConnect}
          title={isInVoice ? "Disconnect Voice" : "Join Voice Call"}
          className={`w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-xs ${
            isInVoice 
              ? 'bg-rose-500 text-white hover:bg-rose-600 shadow-rose-500/30' 
              : 'bg-[#34A99D] text-white hover:bg-[#2B8B81] shadow-[#34A99D]/30'
          }`}
        >
          <PhoneCall size={14} className={isInVoice ? 'animate-pulse' : ''} />
        </button>

        {/* Round Member Badge */}
        <div 
          title={`${activeRoom?.memberCount || 4} Members in Space`}
          className="flex items-center gap-1.5 px-2.5 h-8 rounded-full bg-white text-[#14252D] text-xs font-extrabold border border-[#E5CB90] shadow-2xs cursor-default"
        >
          <Users size={13} className="text-[#34A99D]" />
          <span>{activeRoom?.memberCount || 4}</span>
        </div>
      </div>

      {/* Message Stream */}
      <div className="flex-1 overflow-y-auto px-4 pt-13 pb-4 space-y-4">
        {/* Welcome Banner (Dominant Cream & Sand Gradient) */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-[#FFF3C8] via-[#FAF3E3] to-[#E6F6F4] border-2 border-[#E5CB90] select-none shadow-sm">
          <div className="flex items-center gap-2 mb-1 text-[#14252D] font-extrabold text-sm">
            <Sparkles size={16} className="text-[#34A99D]" />
            <span>Welcome to #{activeRoom?.name || 'chill-lounge'}</span>
          </div>
          <p className="text-xs text-[#14252D]/80 font-medium">
            This is the start of the #{activeRoom?.name} stream. Share code snippets, invite friends to voice, or ask @CollabBot anything!
          </p>
        </div>

        {/* Messages */}
        {messages.map((msg) => {
          const isAi = msg.sender.isAi;
          const isSelf = msg.sender.badge === 'You';

          return (
            <div 
              key={msg.id} 
              className={`flex gap-3 group transition-all rounded-xl p-3 border-2 ${
                isAi 
                  ? 'bg-gradient-to-r from-[#E6F6F4] via-[#F3FAF9] to-[#FFF3C8]/40 border-[#34A99D] shadow-sm' 
                  : isSelf
                    ? 'bg-gradient-to-r from-[#34A99D]/10 via-[#FFFDF7] to-white border-[#34A99D]/40 shadow-xs'
                    : 'bg-[#FFFDF7] border-[#E5CB90]/80 hover:border-[#34A99D] shadow-2xs'
              }`}
            >
              {/* Avatar */}
              <div className="relative shrink-0">
                <img
                  src={msg.sender.avatar}
                  alt={msg.sender.name}
                  className={`w-9 h-9 rounded-xl object-cover ring-2 ${
                    isAi ? 'ring-[#34A99D]' : isSelf ? 'ring-[#34A99D]' : 'ring-[#E5CB90]'
                  }`}
                />
                {isAi && (
                  <span className="absolute -bottom-1 -right-1 p-0.5 rounded-full bg-[#458393] text-white shadow-2xs">
                    <Sparkles size={10} />
                  </span>
                )}
              </div>

              {/* Message Content */}
              <div className="flex-1 min-w-0">
                {/* Sender Title Row */}
                <div className="flex items-baseline gap-2 mb-1 select-none">
                  <span className="text-xs font-bold text-[#14252D]">
                    {msg.sender.name}
                  </span>

                  {msg.sender.badge && (
                    <span className={`text-[10px] font-extrabold px-1.5 py-0.2 rounded-full uppercase tracking-wider ${
                      isAi
                        ? 'bg-[#458393] text-white'
                        : isSelf
                          ? 'bg-[#34A99D] text-white'
                          : 'bg-[#FFF3C8] text-[#14252D] border border-[#E5CB90]'
                    }`}>
                      {msg.sender.badge}
                    </span>
                  )}

                  <span className="text-[10px] text-[#56727D] font-mono">
                    {msg.time}
                  </span>
                </div>

                {/* Message Text */}
                <p className="text-xs leading-relaxed text-[#14252D] wrap-break-word mb-2 font-medium">
                  {msg.text}
                </p>

                {/* Optional Embedded Code Snippet (Deep Ocean Slate Box) */}
                {msg.codeSnippet && (
                  <div className="mt-2 rounded-xl border-2 border-[#34A99D]/60 bg-[#142B31] text-[#FFF3C8] overflow-hidden shadow-md">
                    {/* Snippet Header */}
                    <div className="flex items-center justify-between px-3 py-1.5 bg-[#0F2227] border-b border-[#34A99D]/30 text-[11px] font-mono select-none">
                      <div className="flex items-center gap-1.5">
                        <Code2 size={13} className="text-[#34A99D]" />
                        <span className="uppercase text-[10px] font-bold tracking-wider text-[#34A99D]">
                          {msg.codeSnippet.language}
                        </span>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleCopyCode(msg.id, msg.codeSnippet.code)}
                          className="flex items-center gap-1 px-2 py-0.5 rounded text-[#FFF3C8]/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                        >
                          {copiedSnippetId === msg.id ? (
                            <>
                              <Check size={12} className="text-[#34A99D]" />
                              <span className="text-[10px] text-[#34A99D] font-bold">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy size={12} />
                              <span className="text-[10px]">Copy</span>
                            </>
                          )}
                        </button>

                        <button
                          onClick={() => onSendToCompiler(msg.codeSnippet.code, msg.codeSnippet.language)}
                          className="flex items-center gap-1 px-2.5 py-0.5 rounded bg-[#34A99D] hover:bg-[#298E84] text-white font-bold transition-colors cursor-pointer shadow-xs ml-1"
                        >
                          <Terminal size={12} />
                          <span className="text-[10px]">Send to Compiler ⚡</span>
                        </button>
                      </div>
                    </div>

                    {/* Snippet Body */}
                    <pre className="p-3 text-xs font-mono overflow-x-auto leading-relaxed text-[#FFF3C8] selection:bg-[#34A99D]/40">
                      <code>{msg.codeSnippet.code}</code>
                    </pre>
                  </div>
                )}

                {/* Optional Media Attachment */}
                {msg.mediaUrl && (
                  <div className="mt-2 rounded-xl overflow-hidden border-2 border-[#E5CB90] max-w-md shadow-xs group/img relative">
                    <img
                      src={msg.mediaUrl}
                      alt="Attachment"
                      className="w-full h-48 object-cover hover:scale-[1.01] transition-transform duration-300 cursor-pointer"
                      onClick={() => window.open(msg.mediaUrl, '_blank')}
                    />
                    <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/70 backdrop-blur-xs text-[#FFF3C8] text-[10px] font-bold rounded-md select-none border border-[#E5CB90]/40">
                      Click to expand ↗
                    </div>
                  </div>
                )}

                {/* Optional AI Suggested Follow-up Chips */}
                {msg.suggestedActions && (
                  <div className="mt-2.5 flex flex-wrap gap-1.5 select-none">
                    {msg.suggestedActions.map((action, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          if (action === 'Run in Scratchpad') {
                            onSendToCompiler(
                              msg.codeSnippet ? msg.codeSnippet.code : `// Testing ${action}`, 
                              'python'
                            );
                          } else {
                            onSendMessage(`@CollabBot ${action}`);
                          }
                        }}
                        className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#FFF3C8] hover:bg-white text-[#14252D] border-2 border-[#E5CB90] transition-colors flex items-center gap-1 cursor-pointer shadow-xs"
                      >
                        <Zap size={11} className="text-[#34A99D]" />
                        {action}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input Box - Compact Streamlined Single-Row (Height reduced by half) */}
      <div className="px-3 py-1.5 border-t-2 border-[#E5CB90] bg-[#FAF3E3] select-none shadow-sm">
        <form 
          onSubmit={handleSend} 
          className="relative flex items-center gap-1.5 rounded-xl border-2 border-[#E5CB90] bg-white has-[:focus]:border-[#34A99D] has-[:focus]:ring-2 has-[:focus]:ring-[#34A99D]/20 transition-all px-2 py-1 shadow-xs"
        >
          {/* Quick Action Tools (Inline Left) */}
          <div className="flex items-center gap-0.5 text-[#458393] shrink-0">
            <button
              type="button"
              onClick={() => setInputText(prev => prev + ' ```python\n# code here\n```')}
              title="Attach Code Block"
              className="p-1 rounded-lg hover:text-[#34A99D] hover:bg-[#FFF3C8] transition-colors cursor-pointer"
            >
              <Code2 size={15} />
            </button>
            <button
              type="button"
              onClick={() => onSendMessage('@CollabBot quiz me on algorithms')}
              title="CollabBot Prompt Helper"
              className="p-1 rounded-lg hover:text-[#34A99D] hover:bg-[#FFF3C8] transition-colors cursor-pointer"
            >
              <Bot size={15} />
            </button>
            <button
              type="button"
              onClick={() => setInputText(prev => prev + ' 🚀 ')}
              title="Attach Media / Screen"
              className="p-1 rounded-lg hover:text-[#34A99D] hover:bg-[#FFF3C8] transition-colors cursor-pointer"
            >
              <Image size={15} />
            </button>
          </div>

          {/* Subtle Vertical Divider */}
          <div className="h-4 w-px bg-[#E5CB90]/70 shrink-0 mx-0.5"></div>

          {/* Text Input */}
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={`Message #${activeRoom ? activeRoom.name : 'chill-lounge'} (try: @CollabBot or /quiz)...`}
            className="flex-1 bg-transparent text-xs text-[#14252D] placeholder:text-[#56727D] focus:outline-hidden py-1 px-1 font-medium min-w-0"
          />

          {/* Inline Right: Reaction & Send Button */}
          <div className="flex items-center gap-1 shrink-0">
            <button
              type="button"
              onClick={() => setInputText(prev => prev + ' ✨ ')}
              title="Add Reaction"
              className="p-1 rounded-lg text-[#458393] hover:text-[#34A99D] hover:bg-[#FFF3C8] transition-colors cursor-pointer"
            >
              <Smile size={15} />
            </button>

            <button
              type="submit"
              disabled={!inputText.trim()}
              title="Send Message (Enter)"
              className="flex items-center justify-center w-7 h-7 rounded-lg bg-[#34A99D] hover:bg-[#298E84] disabled:opacity-30 disabled:hover:bg-[#34A99D] text-white shadow-xs transition-all cursor-pointer shrink-0"
            >
              <Send size={13} />
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
