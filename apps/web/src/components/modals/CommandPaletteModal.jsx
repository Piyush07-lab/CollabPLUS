/*
 * Copyright (C) 2026 Collab+ Contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Terminal, 
  Radio, 
  Users, 
  MessageSquare, 
  Flame, 
  X, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

export default function CommandPaletteModal({
  isOpen,
  onClose,
  rooms,
  onSelectRoom,
  onOpenCompiler,
  onOpenFeeds
}) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else setQuery('');
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const quickActions = [
    {
      id: 'compiler',
      title: 'Open Code Scratchpad Compiler',
      subtitle: 'Run Python, JS, TS, or C++ snippets',
      icon: Terminal,
      category: 'Tools',
      action: () => {
        onOpenCompiler();
        onClose();
      }
    },
    {
      id: 'feeds',
      title: 'View GitHub & LeetCode Feeds',
      subtitle: 'Check friend streaks and daily poll',
      icon: Flame,
      category: 'Community',
      action: () => {
        onOpenFeeds();
        onClose();
      }
    }
  ];

  const matchedRooms = rooms.filter(r => 
    r.name.toLowerCase().includes(query.toLowerCase()) || 
    r.topic.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-10000 bg-[#132C33]/60 backdrop-blur-xs flex items-start justify-center pt-20 px-4">
      <div 
        className="w-full max-w-lg bg-[#FAF3E3] rounded-2xl shadow-2xl border-2 border-[#E5CB90] overflow-hidden ring-1 ring-black/10 animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar with Deep Ocean styling */}
        <div className="px-4 py-3 bg-[#1B3E48] border-b border-[#2B5D6B] flex items-center gap-3">
          <Search size={18} className="text-[#34A99D] shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search spaces, friends, commands, or snippets..."
            autoFocus
            className="w-full text-sm text-[#FFFDF7] placeholder:text-[#FFF3C8]/60 focus:outline-hidden bg-transparent"
          />
          <kbd className="text-[10px] font-mono text-[#FFF3C8] bg-[#142B31] px-1.5 py-0.5 rounded border border-[#2B5D6B]">
            ESC
          </kbd>
          <button 
            onClick={onClose}
            className="text-[#FFF3C8]/70 hover:text-[#FFFDF7] cursor-pointer p-0.5"
          >
            <X size={16} />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-3 space-y-3 bg-[#FAF3E3]">
          {/* Quick Actions */}
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-[#458393] px-2 py-1">
              Quick Navigation
            </div>
            {quickActions.map(act => {
              const Icon = act.icon;
              return (
                <div
                  key={act.id}
                  onClick={act.action}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-[#FFFDF7] border border-[#E5CB90]/60 hover:border-[#34A99D] hover:bg-[#FFFBF0] cursor-pointer transition-all shadow-2xs group mb-1.5"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded-lg bg-[#34A99D]/15 text-[#34A99D] group-hover:bg-[#34A99D] group-hover:text-white transition-colors">
                      <Icon size={15} />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#142B31]">{act.title}</div>
                      <div className="text-[11px] text-[#458393]">{act.subtitle}</div>
                    </div>
                  </div>
                  <ArrowRight size={14} className="text-[#E5CB90] group-hover:text-[#34A99D] transition-colors" />
                </div>
              );
            })}
          </div>

          {/* Rooms */}
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-[#458393] px-2 py-1">
              Rooms & Spaces ({matchedRooms.length})
            </div>
            {matchedRooms.map(room => (
              <div
                key={room.id}
                onClick={() => {
                  onSelectRoom(room.id);
                  onClose();
                }}
                className="flex items-center justify-between p-2.5 rounded-xl bg-[#FFFDF7] border border-[#E5CB90]/60 hover:border-[#34A99D] hover:bg-[#FFFBF0] cursor-pointer transition-all shadow-2xs group mb-1.5"
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-[#FFF3C8] text-[#458393] group-hover:bg-[#34A99D] group-hover:text-white transition-colors">
                    <Radio size={15} />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#142B31]">#{room.name}</div>
                    <div className="text-[11px] text-[#458393] line-clamp-1">{room.topic}</div>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-[#1B3E48] bg-[#FFF3C8] border border-[#E5CB90] px-2 py-0.5 rounded-md">
                  Jump in ↵
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer tip */}
        <div className="px-4 py-2.5 bg-[#F5ECCF] border-t border-[#E5CB90] text-[11px] text-[#2C4F57] flex items-center justify-between">
          <span>Tip: Press <kbd className="font-mono bg-[#FFFDF7] px-1 py-0.5 rounded border border-[#E5CB90]">Ctrl+B</kbd> to toggle Rooms or <kbd className="font-mono bg-[#FFFDF7] px-1 py-0.5 rounded border border-[#E5CB90]">Ctrl+J</kbd> for Command Center</span>
          <span className="font-bold text-[#34A99D]">Collab+ v0.1</span>
        </div>
      </div>
    </div>
  );
}
