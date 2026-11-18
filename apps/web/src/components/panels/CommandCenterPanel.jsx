/*
 * Copyright (C) 2026 Collab+ Contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useState } from 'react';
import { 
  ChevronRight, 
  Users, 
  Flame, 
  Clock, 
  BarChart3, 
  Radio
} from 'lucide-react';

export default function CommandCenterPanel({
  onCollapse,
  activeTab,
  setActiveTab,
  friends,
  devFeeds
}) {
  // Interactive poll state
  const [pollVoted, setPollVoted] = useState(null);
  const [pollStats, setPollStats] = useState({
    tabs: 68,
    spaces: 32,
    totalVotes: 47
  });

  const handleVotePoll = (option) => {
    if (pollVoted) return;
    setPollVoted(option);
    setPollStats(prev => ({
      ...prev,
      totalVotes: prev.totalVotes + 1,
      [option]: option === 'tabs' ? prev.tabs + 1 : prev.tabs
    }));
  };

  return (
    <aside className="h-full flex flex-col bg-[#FAF3E3] border-l-2 border-[#E5CB90] select-none">
      {/* Panel Header & Tab Switcher (Warm Sand & Teal Dominant) */}
      <div className="h-13 px-3 border-b-2 border-[#E5CB90] flex items-center justify-between bg-[#F5ECCF]/90 backdrop-blur-xs">
        {/* Tab Buttons (Friends & Dev Feeds Only) */}
        <div className="flex items-center gap-1.5 bg-[#FAF3E3] p-1 rounded-xl border-2 border-[#E5CB90]">
          <button
            onClick={() => setActiveTab('friends')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
              activeTab === 'friends'
                ? 'bg-gradient-to-r from-[#34A99D] to-[#2B8B81] text-white shadow-xs'
                : 'text-[#14252D] hover:bg-[#FFF3C8]'
            }`}
          >
            <Users size={14} />
            <span>Friends ({friends.filter(f => f.status !== 'offline').length})</span>
          </button>

          <button
            onClick={() => setActiveTab('feeds')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
              activeTab === 'feeds'
                ? 'bg-gradient-to-r from-[#34A99D] to-[#2B8B81] text-white shadow-xs'
                : 'text-[#14252D] hover:bg-[#FFF3C8]'
            }`}
          >
            <BarChart3 size={14} />
            <span>Dev Feeds</span>
          </button>
        </div>

        {/* Collapse Button */}
        <button
          onClick={onCollapse}
          title="Collapse Community Panel"
          className="p-1.5 rounded-lg text-[#14252D] hover:text-[#34A99D] hover:bg-[#FFF3C8] transition-colors cursor-pointer"
        >
          <ChevronRight size={17} />
        </button>
      </div>

      {/* Tab Content Container */}
      <div className="flex-1 overflow-y-auto">
        {/* ==================== TAB 1: FRIENDS & RICH PRESENCE ==================== */}
        {activeTab === 'friends' && (
          <div className="p-3 space-y-2.5">
            <div className="text-[11px] font-extrabold uppercase tracking-wider text-[#458393] px-1 mb-1">
              Online Friends ({friends.filter(f => f.status !== 'offline').length})
            </div>

            {friends.map(friend => (
              <div
                key={friend.id}
                className="p-2.5 rounded-xl bg-[#FFFDF7] border-2 border-[#E5CB90]/80 hover:border-[#34A99D] hover:shadow-xs transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="relative shrink-0">
                    <img
                      src={friend.avatar}
                      alt={friend.name}
                      className="w-9 h-9 rounded-full object-cover ring-2 ring-[#E5CB90]"
                    />
                    <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full ring-2 ring-white ${
                      friend.status === 'online' ? 'bg-[#34A99D]' :
                      friend.status === 'voice' ? 'bg-[#458393] animate-pulse' :
                      friend.status === 'idle' ? 'bg-[#E5CB90]' : 'bg-slate-300'
                    }`}></span>
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-[#14252D] truncate">{friend.name}</span>
                      <span className="text-[10px] text-[#56727D] font-mono">{friend.username}</span>
                    </div>
                    <p className="text-[11px] text-[#458393] truncate font-semibold">
                      {friend.activity}
                    </p>
                  </div>
                </div>

                {/* Streak Badge */}
                <div className="flex items-center gap-1 text-[11px] font-extrabold text-[#14252D] bg-[#FFF3C8] border border-[#E5CB90] px-1.5 py-0.5 rounded-md shrink-0 shadow-2xs">
                  <Flame size={12} className="text-[#E5CB90]" />
                  <span>{friend.streak}d</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ==================== TAB 2: DEV FEEDS & COMMUNITY ==================== */}
        {activeTab === 'feeds' && (
          <div className="p-3 space-y-3">
            {/* WakaTime Productivity Gauge */}
            <div className="p-3 rounded-xl bg-[#FFFDF7] border-2 border-[#E5CB90]/80 shadow-xs">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5 text-xs font-extrabold text-[#14252D]">
                  <Clock size={14} className="text-[#34A99D]" />
                  <span>WakaTime Productivity</span>
                </div>
                <span className="text-xs font-extrabold text-[#34A99D]">4.8h Today</span>
              </div>

              {/* Progress language bar with exact ColorHunt colors */}
              <div className="h-2.5 rounded-full bg-[#FAF3E3] border border-[#E5CB90] flex overflow-hidden mb-2">
                <span className="bg-[#34A99D] w-[55%]" title="TypeScript 55%"></span>
                <span className="bg-[#458393] w-[30%]" title="Python 30%"></span>
                <span className="bg-[#E5CB90] w-[15%]" title="Rust 15%"></span>
              </div>

              <div className="flex items-center justify-between text-[10px] text-[#14252D] font-bold">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#34A99D]"></span>TS (55%)</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#458393]"></span>Python (30%)</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#E5CB90]"></span>Rust (15%)</span>
              </div>
            </div>

            {/* Daily Community Poll */}
            <div className="p-3 rounded-xl bg-gradient-to-br from-[#FFF3C8] via-[#FAF3E3] to-[#E6F6F4] border-2 border-[#E5CB90] shadow-xs">
              <div className="flex items-center justify-between mb-1.5 text-xs font-extrabold text-[#14252D]">
                <span>Daily Developer Poll 🗳️</span>
                <span className="text-[10px] text-[#14252D] bg-[#FFF3C8] border border-[#E5CB90] px-1.5 py-0.2 rounded font-extrabold">{pollStats.totalVotes} votes</span>
              </div>
              <p className="text-xs text-[#14252D]/80 mb-2.5 font-bold">Tabs or Spaces for Python?</p>

              <div className="space-y-1.5 text-xs">
                <button
                  onClick={() => handleVotePoll('spaces')}
                  className={`w-full p-2 rounded-lg border text-left transition-all cursor-pointer flex items-center justify-between font-bold ${
                    pollVoted === 'spaces'
                      ? 'bg-[#34A99D] text-white border-[#34A99D] shadow-xs'
                      : 'bg-white border-[#E5CB90] hover:border-[#34A99D] text-[#14252D]'
                  }`}
                >
                  <span>4 Spaces (PEP 8)</span>
                  <span className="font-mono text-[11px]">{pollVoted ? '68%' : 'Vote'}</span>
                </button>

                <button
                  onClick={() => handleVotePoll('tabs')}
                  className={`w-full p-2 rounded-lg border text-left transition-all cursor-pointer flex items-center justify-between font-bold ${
                    pollVoted === 'tabs'
                      ? 'bg-[#34A99D] text-white border-[#34A99D] shadow-xs'
                      : 'bg-white border-[#E5CB90] hover:border-[#34A99D] text-[#14252D]'
                  }`}
                >
                  <span>Real Tabs (1 char)</span>
                  <span className="font-mono text-[11px]">{pollVoted ? '32%' : 'Vote'}</span>
                </button>
              </div>
            </div>

            {/* Live Feed Stream */}
            <div className="space-y-2">
              <div className="text-[11px] font-extrabold uppercase tracking-wider text-[#458393] px-1">
                Recent Activity
              </div>

              {devFeeds.map(feed => (
                <div
                  key={feed.id}
                  className="p-2.5 rounded-xl bg-[#FFFDF7] border-2 border-[#E5CB90]/80 shadow-2xs flex items-start gap-2.5"
                >
                  <img
                    src={feed.avatar}
                    alt={feed.user}
                    className="w-7 h-7 rounded-full object-cover shrink-0 mt-0.5 ring-1 ring-[#E5CB90]"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between text-[11px] mb-0.5">
                      <span className="font-bold text-[#14252D] truncate">{feed.user}</span>
                      <span className="text-[#56727D] text-[10px] font-mono">{feed.time}</span>
                    </div>
                    <p className="text-xs font-bold text-[#14252D] leading-tight mb-0.5">
                      {feed.title}
                    </p>
                    <p className="text-[11px] text-[#458393] font-medium">
                      {feed.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
