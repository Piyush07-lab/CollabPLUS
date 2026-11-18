/*
 * Copyright (C) 2026 Collab+ Contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useState, useRef } from 'react';
import { 
  Home, 
  Radio, 
  MessageSquare, 
  Terminal, 
  Bot, 
  BarChart3, 
  Users, 
  Settings,
  Sparkles
} from 'lucide-react';

export default function BottomNavDock({
  leftVisible,
  setLeftVisible,
  rightVisible,
  setRightVisible,
  activeCommandTab,
  setActiveCommandTab,
  centerViewMode = 'chat',
  setCenterViewMode,
  onOpenAiPrompt,
  onOpenSettings,
  onResetLayout
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const collapseTimeoutRef = useRef(null);

  const handleMouseEnter = () => {
    if (collapseTimeoutRef.current) {
      clearTimeout(collapseTimeoutRef.current);
      collapseTimeoutRef.current = null;
    }
    setIsExpanded(true);
  };

  const handleMouseLeave = () => {
    collapseTimeoutRef.current = setTimeout(() => {
      setIsExpanded(false);
    }, 350);
  };

  const leftDockItems = [
    {
      id: 'home',
      label: 'Reset Workspace',
      icon: Home,
      action: onResetLayout,
      isActive: leftVisible && rightVisible
    },
    {
      id: 'rooms',
      label: leftVisible ? 'Hide Rooms (Ctrl+B)' : 'Show Rooms (Ctrl+B)',
      icon: Radio,
      action: () => setLeftVisible(!leftVisible),
      isActive: leftVisible
    },
    {
      id: 'compiler',
      label: centerViewMode === 'compiler' ? 'Switch to Chat View' : 'Open Compiler Workspace',
      icon: Terminal,
      action: () => {
        if (setCenterViewMode) {
          setCenterViewMode(prev => prev === 'compiler' ? 'chat' : 'compiler');
        }
      },
      isActive: centerViewMode === 'compiler'
    }
  ];

  const centerAiItem = {
    id: 'ai',
    label: isExpanded ? 'Ask CollabBot AI' : 'CollabBot AI (Hover to expand dock)',
    icon: Bot,
    action: onOpenAiPrompt
  };

  const rightDockItems = [
    {
      id: 'feeds',
      label: 'Dev Feeds & Streaks',
      icon: BarChart3,
      action: () => {
        setRightVisible(true);
        setActiveCommandTab('feeds');
      },
      isActive: rightVisible && activeCommandTab === 'feeds'
    },
    {
      id: 'friends',
      label: 'Friends & Vibe',
      icon: Users,
      action: () => {
        setRightVisible(true);
        setActiveCommandTab('friends');
      },
      isActive: rightVisible && activeCommandTab === 'friends'
    },
    {
      id: 'settings',
      label: 'Preferences',
      icon: Settings,
      action: onOpenSettings,
      isActive: false
    }
  ];

  const renderDockButton = (item) => {
    const Icon = item.icon;
    return (
      <div key={item.id} className="relative group shrink-0">
        {/* Floating Tooltip displaying Name and ID */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-lg bg-[#14252D] text-white text-[10px] font-semibold tracking-wide whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-150 pointer-events-none shadow-xl z-50 flex items-center gap-1.5 border border-[#E5CB90]/40">
          <span>{item.label}</span>
          <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-white/15 text-[#FFF3C8]">
            #{item.id}
          </span>
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#14252D]"></div>
        </div>

        {/* Dock Item Button */}
        <button
          onClick={item.action}
          title={`${item.label} (#${item.id})`}
          aria-label={`${item.label} (${item.id})`}
          className={`relative w-8.5 h-8.5 rounded-full flex items-center justify-center transition-all cursor-pointer group-hover:-translate-y-0.5 active:scale-95 ${
            item.isActive
              ? 'bg-[#34A99D] text-white shadow-xs font-bold ring-2 ring-[#E5CB90]'
              : 'text-[#458393] hover:text-[#14252D] hover:bg-[#FFF3C8]'
          }`}
        >
          <Icon size={15} />
          {item.isActive && (
            <span className="absolute bottom-1 w-1 h-1 rounded-full bg-[#FFF3C8]"></span>
          )}
        </button>
      </div>
    );
  };

  return (
    <nav 
      aria-label="Main Navigation Dock"
      className="relative z-40 select-none pointer-events-auto"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Glassmorphic Capsule with dominant Cream & Sand gradient */}
      <div className={`transition-all duration-300 ease-out flex items-center p-1 rounded-full backdrop-blur-md bg-gradient-to-r from-[#FFF3C8]/95 via-white/98 to-[#FFF3C8]/95 border-2 border-[#E5CB90] shadow-md shadow-[#1B3E48]/15 ring-1 ring-[#14252D]/10 ${
        isExpanded ? 'px-2 gap-1.5 shadow-[#34A99D]/20 overflow-visible' : 'px-1 gap-0 shadow-slate-900/15 overflow-hidden'
      }`}>
        
        {/* 1. Left Wing Icons (3 Symmetrical Icons: Home, Rooms, Compiler) */}
        <div
          className={`flex items-center gap-1.5 transition-all duration-300 ease-out whitespace-nowrap origin-right ${
            isExpanded
              ? 'max-w-[180px] opacity-100 scale-100 pr-1 overflow-visible'
              : 'max-w-0 opacity-0 scale-75 pointer-events-none pr-0 overflow-hidden'
          }`}
        >
          {leftDockItems.map(item => renderDockButton(item))}
        </div>

        {/* 2. Center AI CollabBot Button (Always visible at the bottom of the screen) */}
        <div className="relative group shrink-0">
          {/* Tooltip */}
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-lg bg-[#14252D] text-white text-[10px] font-bold tracking-wide whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-150 pointer-events-none shadow-xl z-50 flex items-center gap-1.5 border border-[#E5CB90]/40">
            <Sparkles size={11} className="text-[#E5CB90]" />
            <span>CollabBot AI</span>
            <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-white/15 text-[#FFF3C8]">
              #ai
            </span>
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#14252D]"></div>
          </div>

          <button
            onClick={centerAiItem.action}
            title="CollabBot AI (#ai) - Hover to expand dock"
            aria-label="CollabBot AI (ai)"
            className={`relative w-9.5 h-9.5 rounded-full flex items-center justify-center transition-all cursor-pointer bg-gradient-to-tr from-[#1B3E48] via-[#2D606E] to-[#34A99D] text-white shadow-md shadow-[#34A99D]/40 ring-2 ring-[#E5CB90] hover:scale-105 active:scale-95 ${
              !isExpanded ? 'animate-pulse hover:animate-none' : ''
            }`}
          >
            <Bot size={18} />
            
            {/* Minimized Pulse Aura Indicator */}
            {!isExpanded && (
              <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E5CB90] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#34A99D] ring-2 ring-[#FFF3C8]"></span>
              </span>
            )}
          </button>
        </div>

        {/* 3. Right Wing Icons (3 Symmetrical Icons: Feeds, Friends, Settings) */}
        <div
          className={`flex items-center gap-1.5 transition-all duration-300 ease-out whitespace-nowrap origin-left ${
            isExpanded
              ? 'max-w-[180px] opacity-100 scale-100 pl-1 overflow-visible'
              : 'max-w-0 opacity-0 scale-75 pointer-events-none pl-0 overflow-hidden'
          }`}
        >
          {rightDockItems.map(item => renderDockButton(item))}
        </div>

      </div>
    </nav>
  );
}
