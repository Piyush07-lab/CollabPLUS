import React, { useState, useRef, useEffect } from 'react';
import { 
  PanelLeftClose, 
  PanelLeftOpen, 
  PanelRightClose, 
  PanelRightOpen, 
  Search, 
  Volume2, 
  VolumeX,
  Flame, 
  Settings,
  Users,
  X
} from 'lucide-react';

export default function TopBar({
  leftVisible,
  setLeftVisible,
  rightVisible,
  setRightVisible,
  activeRoom,
  friends = [],
  isInVoice = true,
  onToggleVoiceConnect,
  onOpenCommandPalette,
  onOpenSettings
}) {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef(null);
  const searchContainerRef = useRef(null);

  // Dynamic Vibe State (Allows interactive demo toggling from green to red)
  const [isFriendsDemoActive, setIsFriendsDemoActive] = useState(true);
  const [isStreakDemoActive, setIsStreakDemoActive] = useState(true);

  const realOnlineFriends = friends.filter(f => f.status === 'online' || f.status === 'voice' || f.status === 'idle').length || 4;
  const onlineCount = isFriendsDemoActive ? realOnlineFriends : 0;
  const isFriendsActive = onlineCount > 0;

  const voiceCount = isInVoice ? (activeRoom?.memberCount || 3) : 0;
  const isVoiceActive = isInVoice;

  const streakDays = isStreakDemoActive ? 7 : 0;
  const isStreakActive = isStreakDemoActive;

  // Close search when clicking outside if input is empty
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
        if (!searchQuery.trim()) {
          setIsSearchExpanded(false);
        }
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [searchQuery]);

  const handleSearchClick = () => {
    setIsSearchExpanded(true);
    setTimeout(() => {
      searchInputRef.current?.focus();
    }, 50);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setSearchQuery('');
      setIsSearchExpanded(false);
      searchInputRef.current?.blur();
    } else if (e.key === 'Enter') {
      onOpenCommandPalette();
    }
  };

  const handleClearSearch = (e) => {
    e.stopPropagation();
    setSearchQuery('');
    searchInputRef.current?.focus();
  };

  return (
    <header className="h-13 bg-gradient-to-r from-[#1B3E48] via-[#245360] to-[#2B5D6B] border-b border-[#142E35] px-4 flex items-center justify-between z-30 select-none shadow-md">
      {/* Left Section: Branding & Panel Toggle */}
      <div className="flex items-center gap-3 shrink-0">
        {/* Toggle Left Panel */}
        <button
          onClick={() => setLeftVisible(!leftVisible)}
          title={leftVisible ? "Hide (Ctrl+B)" : "Show (Ctrl+B)"}
          className="p-1.5 rounded-lg text-[#FFF3C8]/80 hover:text-white hover:bg-[#34A99D]/20 transition-colors cursor-pointer"
        >
          {leftVisible ? <PanelLeftClose size={18} /> : <PanelLeftOpen size={18} />}
        </button>

        {/* Brand Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#458393] to-[#34A99D] flex items-center justify-center text-white font-bold shadow-md shadow-[#142E35]/40 ring-1 ring-[#FFF3C8]/30">
            <span className="text-base tracking-tighter">C+</span>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="font-extrabold text-base tracking-tight text-[#FFF3C8]">
              Collab<span className="text-[#34A99D]">+</span>
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-[#E5CB90] text-[#14252D] border border-[#FFF3C8]/40 shadow-xs">
              v0.1
            </span>
          </div>
        </div>
      </div>

      {/* Middle Section: Search Bar (Dominant Ocean Slate input, expands on click) */}
      <div className="flex justify-center flex-1 px-4">
        <div 
          ref={searchContainerRef}
          onClick={handleSearchClick}
          className={`relative flex items-center transition-all duration-300 ease-out cursor-text rounded-lg border shadow-inner ${
            isSearchExpanded 
              ? 'w-64 sm:w-80 md:w-96 bg-[#132C33] border-[#34A99D] ring-2 ring-[#34A99D]/40 py-1.5 px-3' 
              : 'w-36 sm:w-44 bg-[#1A3D47]/90 hover:bg-[#15343D] border-[#34A99D]/30 hover:border-[#34A99D] py-1.5 px-2.5'
          }`}
        >
          <Search 
            size={14} 
            className="text-[#34A99D] shrink-0 transition-colors" 
          />

          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsSearchExpanded(true)}
            onKeyDown={handleKeyDown}
            placeholder={isSearchExpanded ? "Search rooms, friends, snippets..." : "Search..."}
            className="w-full bg-transparent border-none outline-hidden text-xs text-[#FFF3C8] placeholder:text-[#8EAEB5] ml-2 font-normal"
          />

          {/* Clear Button or Ctrl+K Badge */}
          {searchQuery ? (
            <button
              onClick={handleClearSearch}
              className="p-0.5 rounded text-[#FFF3C8]/80 hover:text-white hover:bg-[#34A99D]/30 cursor-pointer shrink-0 ml-1"
              title="Clear search"
            >
              <X size={13} />
            </button>
          ) : (
            <kbd 
              onClick={(e) => {
                e.stopPropagation();
                onOpenCommandPalette();
              }}
              title="Open Command Palette (Ctrl+K)"
              className="hidden sm:inline-flex items-center gap-0.5 text-[10px] font-mono font-bold text-[#14252D] bg-[#E5CB90] hover:bg-[#FFF3C8] border border-[#FFF3C8]/50 px-1 py-0.5 rounded shadow-2xs shrink-0 ml-1 cursor-pointer transition-colors"
            >
              Ctrl K
            </kbd>
          )}
        </div>
      </div>

      {/* Right Section: Vibe Stats & Right Panel Toggle */}
      <div className="flex items-center gap-3 shrink-0">
        {/* Dynamic Live Vibe Pill: Integrated Status Colors (Green ⇋ Red) & Numbers */}
        <div className="flex items-center gap-1.5 bg-[#143038] border border-[#2B5D6B] px-2 py-0.5 rounded-full text-[#FFF3C8] shadow-xs select-none">
          
          {/* 1. Friends Online Item (Dynamic Green ⇋ Red based on status) */}
          <button 
            type="button"
            onClick={() => setIsFriendsDemoActive(prev => !prev)}
            className={`relative group flex items-center gap-1 px-2 py-1 rounded-full transition-all cursor-pointer ${
              isFriendsActive 
                ? 'bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300' 
                : 'bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/30 text-rose-300'
            }`}
            title={isFriendsActive ? `${onlineCount} Friends Online (Active • Click to toggle status)` : `0 Friends Online (Offline • Click to toggle status)`}
          >
            <Users 
              size={13} 
              className={`transition-colors shrink-0 ${
                isFriendsActive 
                  ? 'text-emerald-400 fill-emerald-400/25 drop-shadow-[0_0_6px_rgba(52,211,153,0.5)]' 
                  : 'text-rose-400 fill-rose-400/25 drop-shadow-[0_0_6px_rgba(251,113,133,0.5)]'
              }`} 
            />
            <span className="text-[11px] font-extrabold font-mono tracking-tight leading-none">
              {onlineCount}
            </span>

            {/* Tooltip */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-md bg-slate-950 text-white text-[10px] font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 shadow-md">
              {isFriendsActive ? `${onlineCount} Online (Active)` : '0 Online (Offline)'}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 border-4 border-transparent border-b-slate-950"></div>
            </div>
          </button>

          <span className="text-[#34A99D]/40 text-[9px]">•</span>

          {/* 2. Voice Lounge Item (Dynamic Green ⇋ Red based on status) */}
          <button 
            type="button"
            onClick={onToggleVoiceConnect}
            className={`relative group flex items-center gap-1 px-2 py-1 rounded-full transition-all cursor-pointer ${
              isVoiceActive 
                ? 'bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300' 
                : 'bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/30 text-rose-300'
            }`}
            title={isVoiceActive ? `Voice Connected: ${voiceCount} in Room (Click to disconnect)` : `Voice Disconnected: 0 in Room (Click to connect)`}
          >
            {isVoiceActive ? (
              <Volume2 
                size={13} 
                className="text-emerald-400 fill-emerald-400/25 drop-shadow-[0_0_6px_rgba(52,211,153,0.5)] animate-pulse transition-colors shrink-0" 
              />
            ) : (
              <VolumeX 
                size={13} 
                className="text-rose-400 fill-rose-400/25 drop-shadow-[0_0_6px_rgba(251,113,133,0.5)] transition-colors shrink-0" 
              />
            )}
            <span className="text-[11px] font-extrabold font-mono tracking-tight leading-none">
              {voiceCount}
            </span>

            {/* Tooltip */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-md bg-slate-950 text-white text-[10px] font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 shadow-md">
              {isVoiceActive ? `Voice: ${voiceCount} Connected` : 'Voice Disconnected'}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 border-4 border-transparent border-b-slate-950"></div>
            </div>
          </button>

          <span className="text-[#34A99D]/40 text-[9px]">•</span>

          {/* 3. Streak / Activity Item (Dynamic Green ⇋ Red based on status) */}
          <button 
            type="button"
            onClick={() => setIsStreakDemoActive(prev => !prev)}
            className={`relative group flex items-center gap-1 px-2 py-1 rounded-full transition-all cursor-pointer ${
              isStreakActive 
                ? 'bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300' 
                : 'bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/30 text-rose-300'
            }`}
            title={isStreakActive ? `7-Day Activity Streak (Active • Click to toggle status)` : `0-Day Activity Streak (Broken • Click to toggle status)`}
          >
            <Flame 
              size={13} 
              className={`transition-colors shrink-0 ${
                isStreakActive 
                  ? 'text-emerald-400 fill-emerald-400/25 drop-shadow-[0_0_6px_rgba(52,211,153,0.5)]' 
                  : 'text-rose-400 fill-rose-400/25 drop-shadow-[0_0_6px_rgba(251,113,133,0.5)]'
              }`} 
            />
            <span className="text-[11px] font-extrabold font-mono tracking-tight leading-none">
              {streakDays}d
            </span>

            {/* Tooltip */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-md bg-slate-950 text-white text-[10px] font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 shadow-md">
              {isStreakActive ? '7d Active Streak' : 'Streak Broken (0d)'}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 border-4 border-transparent border-b-slate-950"></div>
            </div>
          </button>
        </div>

        {/* User Pill */}
        <div className="flex items-center gap-2 pl-1">
          <button 
            onClick={onOpenSettings}
            className="p-1.5 rounded-lg text-[#FFF3C8]/80 hover:text-white hover:bg-[#34A99D]/20 transition-colors cursor-pointer"
            title="Settings"
          >
            <Settings size={17} />
          </button>
          
          <div className="flex items-center gap-2 bg-[#173841]/90 hover:bg-[#143139] border border-[#34A99D]/35 hover:border-[#E5CB90] px-2 py-1 rounded-full cursor-pointer transition-colors shadow-xs">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces"
                alt="Alex"
                className="w-6 h-6 rounded-full object-cover ring-1 ring-[#34A99D]"
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#34A99D] ring-2 ring-[#1B3E48]"></span>
            </div>
            <span className="text-xs font-semibold text-[#FFF3C8] hidden sm:inline">Alex R.</span>
          </div>
        </div>

        {/* Toggle Right Panel */}
        <button
          onClick={() => setRightVisible(!rightVisible)}
          title={rightVisible ? "Hide Command Center (Ctrl+J)" : "Show Command Center (Ctrl+J)"}
          className="p-1.5 rounded-lg text-[#FFF3C8]/80 hover:text-white hover:bg-[#34A99D]/20 transition-colors cursor-pointer"
        >
          {rightVisible ? <PanelRightClose size={18} /> : <PanelRightOpen size={18} />}
        </button>
      </div>
    </header>
  );
}
