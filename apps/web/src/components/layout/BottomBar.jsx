import React from 'react';
import {
  Mic,
  MicOff,
  Headphones,
  PhoneOff,
  PhoneCall,
  Terminal
} from 'lucide-react';
import BottomNavDock from './BottomNavDock';

export default function BottomBar({
  leftVisible,
  setLeftVisible,
  rightVisible,
  setRightVisible,
  activeCommandTab,
  setActiveCommandTab,
  centerViewMode = 'chat',
  setCenterViewMode,
  currentLanguage = 'python',
  onOpenAiPrompt,
  onOpenSettings,
  onResetLayout,
  isInVoice,
  onToggleVoiceConnect,
  isMuted,
  onToggleMute,
  isDeafened,
  onToggleDeafen,
  activeRoom
}) {
  return (
    <footer
      aria-label="Unified Global Horizon Status Bar"
      className="h-12 bg-gradient-to-r from-[#FAF3E3] via-[#F5ECCF] to-[#FAF3E3] border-t-2 border-[#E5CB90] px-4 flex items-center justify-between z-30 select-none shadow-sm relative shrink-0"
    >
      {/* 1. LEFT WING: User Audio Controls & Voice Status */}
      <div className="flex items-center gap-2.5 shrink-0 z-10">
        {/* User Identity */}
        <div className="flex items-center gap-2">
          <div className="relative shrink-0">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces"
              alt="Alex"
              className="w-7 h-7 rounded-full object-cover ring-2 ring-[#34A99D]"
            />
            <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-[#34A99D] ring-2 ring-[#F5ECCF]"></span>
          </div>
          <div className="hidden sm:block">
            <div className="text-xs font-bold text-[#14252D] leading-none flex items-center gap-1.5">
              <span>Alex Rivers</span>
              {isInVoice && (
                <span className="text-[10px] font-bold text-[#34A99D] bg-[#E6F6F4] px-1.5 py-0.2 rounded-full border border-[#34A99D]/40">
                  Voice
                </span>
              )}
            </div>
            <div className="text-[10px] text-[#458393] font-semibold leading-tight mt-0.5 truncate max-w-[120px]">
              {isInVoice ? `#${activeRoom?.name || 'chill-lounge'}` : 'Online • Chill-z'}
            </div>
          </div>
        </div>

        {/* Audio Toggles (Mic & Deafen) */}
        <div className="flex items-center gap-1 ml-1">
          <button
            onClick={onToggleMute}
            title={isMuted ? "Unmute Microphone" : "Mute Microphone"}
            className={`p-1.5 rounded-lg transition-all cursor-pointer border ${isMuted
                ? 'bg-rose-100 text-rose-600 border-rose-300 shadow-2xs'
                : 'bg-[#FFF3C8] text-[#14252D] border-[#E5CB90] hover:bg-white shadow-2xs'
              }`}
          >
            {isMuted ? <MicOff size={14} /> : <Mic size={14} />}
          </button>

          <button
            onClick={onToggleDeafen}
            title={isDeafened ? "Undeafen Audio" : "Deafen Audio"}
            className={`p-1.5 rounded-lg transition-all cursor-pointer border ${isDeafened
                ? 'bg-rose-100 text-rose-600 border-rose-300 shadow-2xs'
                : 'bg-[#FFF3C8] text-[#14252D] border-[#E5CB90] hover:bg-white shadow-2xs'
              }`}
          >
            <Headphones size={14} className={isDeafened ? "text-rose-600" : "text-[#14252D]"} />
          </button>

          {/* Voice Disconnect / Connect quick action */}
          <button
            onClick={onToggleVoiceConnect}
            title={isInVoice ? "Disconnect from Voice Lounge" : "Join Voice Lounge"}
            className={`hidden md:flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer border shadow-2xs ml-0.5 ${isInVoice
                ? 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100'
                : 'bg-[#E6F6F4] text-[#34A99D] border-[#34A99D]/40 hover:bg-[#34A99D] hover:text-white'
              }`}
          >
            {isInVoice ? <PhoneOff size={11} /> : <PhoneCall size={11} />}
            <span>{isInVoice ? 'Leave' : 'Join Voice'}</span>
          </button>
        </div>
      </div>

      {/* 2. CENTER SECTION: Symmetrical 3 - 1 - 3 Navigation Dock (Uncluttered) */}
      <div className="absolute left-1/2 -translate-x-1/2 z-40 flex items-center justify-center">
        <BottomNavDock
          leftVisible={leftVisible}
          setLeftVisible={setLeftVisible}
          rightVisible={rightVisible}
          setRightVisible={setRightVisible}
          activeCommandTab={activeCommandTab}
          setActiveCommandTab={setActiveCommandTab}
          centerViewMode={centerViewMode}
          setCenterViewMode={setCenterViewMode}
          onOpenAiPrompt={onOpenAiPrompt}
          onOpenSettings={onOpenSettings}
          onResetLayout={onResetLayout}
        />
      </div>

      {/* 3. RIGHT WING: Clickable Compiler Workspace Button & Network Ping */}
      <div className="flex items-center gap-2 shrink-0 z-10 text-xs">
        {/* Clickable Compiler Workspace Toggle Button */}
        <button
          type="button"
          onClick={() => {
            if (setCenterViewMode) {
              setCenterViewMode(prev => prev === 'compiler' ? 'chat' : 'compiler');
            }
          }}
          title={centerViewMode === 'compiler' ? "Switch to Chat View" : "Open Compiler Workspace (Ctrl+J)"}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border shadow-2xs text-[11px] font-bold cursor-pointer transition-all active:scale-95 ${
            centerViewMode === 'compiler'
              ? 'bg-[#34A99D] hover:bg-[#2B8B81] text-white border-[#34A99D] shadow-xs ring-1 ring-[#FFF3C8]'
              : 'bg-[#FFFDF7] hover:bg-white text-[#14252D] hover:text-[#34A99D] border-[#E5CB90]'
          }`}
        >
          <Terminal size={12} className={centerViewMode === 'compiler' ? 'text-white' : 'text-[#34A99D]'} />
          <span>{currentLanguage === 'python' ? 'Python 3.12' : currentLanguage === 'javascript' ? 'Node.js 20' : `${currentLanguage?.toUpperCase()} 3.12`}</span>
          <span className={`text-[9px] px-1 py-0.2 rounded font-mono font-bold ${
            centerViewMode === 'compiler'
              ? 'bg-white/20 text-[#FFF3C8]'
              : 'bg-[#E6F6F4] text-[#34A99D]'
          }`}>
            {centerViewMode === 'compiler' ? 'ACTIVE' : 'RUN'}
          </span>
        </button>

        {/* Connection Ping & Latency Beacon */}
        <div 
          title="Network Latency: 14ms (Optimal)"
          className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-[#FFFDF7] border border-[#E5CB90] shadow-2xs text-[11px] font-mono text-[#458393] font-bold cursor-default"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#34A99D] animate-pulse"></span>
          <span>14ms</span>
        </div>
      </div>
    </footer>
  );
}
