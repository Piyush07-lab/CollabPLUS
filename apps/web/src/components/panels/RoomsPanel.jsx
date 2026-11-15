import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronDown,
  Plus, 
  Volume2, 
  Mic, 
  MicOff, 
  Headphones, 
  PhoneOff,
  Radio, 
  Users 
} from 'lucide-react';

export default function RoomsPanel({
  rooms,
  activeRoomId,
  messagesByRoom = {},
  onSelectRoom,
  onCollapse,
  isInVoice,
  onToggleVoiceConnect,
  isMuted,
  onToggleMute,
  isDeafened,
  onToggleDeafen,
  onCreateRoom
}) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [expandedRoomId, setExpandedRoomId] = useState(activeRoomId);
  const [hoveredRoomId, setHoveredRoomId] = useState(null);

  // Synchronize expanded room with active room selection
  useEffect(() => {
    setExpandedRoomId(activeRoomId);
  }, [activeRoomId]);

  const categories = [
    { id: 'all', label: 'All Spaces' },
    { id: 'voice', label: 'Voice' },
    { id: 'code', label: 'Code' },
    { id: 'games', label: 'Social' }
  ];

  const filteredRooms = activeCategory === 'all' 
    ? rooms 
    : rooms.filter(r => r.category === activeCategory);

  return (
    <aside className="h-full flex flex-col bg-[#FAF3E3] border-r-2 border-[#E5CB90] select-none">
      {/* 1. Panel Header (Warm Sand Surface) */}
      <div className="h-12 px-3.5 border-b-2 border-[#E5CB90] flex items-center justify-between bg-[#F5ECCF]/90 backdrop-blur-xs">
        <div className="flex items-center gap-2">
          <div className="p-1 rounded-md bg-[#34A99D] text-white shadow-2xs">
            <Radio size={14} />
          </div>
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#14252D]">
            Spaces
          </span>
          <span className="text-[10px] font-bold text-[#14252D] bg-[#FFF3C8] border border-[#E5CB90] px-1.5 py-0.2 rounded-full shadow-2xs">
            {rooms.length}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={onCreateRoom}
            title="Create New Space"
            className="p-1 rounded text-[#14252D] hover:text-[#34A99D] hover:bg-[#FFF3C8] transition-colors cursor-pointer"
          >
            <Plus size={15} />
          </button>
          <button
            onClick={onCollapse}
            title="Collapse Rooms Panel (Ctrl+B)"
            className="p-1 rounded text-[#14252D] hover:text-[#34A99D] hover:bg-[#FFF3C8] transition-colors cursor-pointer"
          >
            <ChevronLeft size={15} />
          </button>
        </div>
      </div>

      {/* 2. Filter Category Pills (Cream & Teal Dominant) */}
      <div className="px-3 pt-2.5 pb-2 flex gap-1 overflow-x-auto text-xs no-scrollbar bg-[#FAF3E3]">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-2.5 py-1 rounded-md text-[11px] font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeCategory === cat.id 
                ? 'bg-gradient-to-r from-[#34A99D] to-[#2B8B81] text-white shadow-xs' 
                : 'bg-[#FFF3C8]/80 text-[#14252D] hover:bg-[#FFF3C8] border border-[#E5CB90]'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* 3. Minimized Rooms List (Rich Teal Active Card & Warm Cards) */}
      <div className="flex-1 overflow-y-auto px-2.5 py-1.5 space-y-1.5">
        {filteredRooms.map(room => {
          const isActive = room.id === activeRoomId;
          const isCurrentVoiceRoom = isInVoice && isActive;
          const isExpanded = (expandedRoomId === room.id) || (hoveredRoomId === room.id);

          const roomMessages = messagesByRoom[room.id] || [];
          const latestMessage = roomMessages.length > 0 
            ? roomMessages[roomMessages.length - 1] 
            : null;

          return (
            <div
              key={room.id}
              onMouseEnter={() => setHoveredRoomId(room.id)}
              onMouseLeave={() => setHoveredRoomId(null)}
              onClick={() => {
                onSelectRoom(room.id);
                setExpandedRoomId(prev => (prev === room.id ? null : room.id));
              }}
              className={`group relative rounded-xl transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-[#34A99D] via-[#2F9E92] to-[#458393] text-white shadow-md ring-2 ring-[#E5CB90]'
                  : 'bg-[#FFFDF7] border-2 border-[#E5CB90]/70 hover:border-[#34A99D] hover:bg-white hover:shadow-xs'
              } ${isExpanded ? 'p-2.5' : 'px-2.5 py-1.5'}`}
            >
              {/* Row 0: Minimized Space Name & Quick Status Indicator */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className={`font-mono text-xs font-extrabold transition-colors ${
                    isActive ? 'text-[#FFF3C8]' : 'text-[#34A99D]'
                  }`}>
                    #
                  </span>
                  <span className={`text-xs truncate transition-colors ${
                    isActive 
                      ? 'text-white font-bold' 
                      : 'text-[#14252D] font-bold group-hover:text-[#34A99D]'
                  }`}>
                    {room.name}
                  </span>
                </div>

                {/* Right Indicator (Unread badge, live voice dot, chevron) */}
                <div className="flex items-center gap-1.5 shrink-0">
                  {!isExpanded && room.unreadCount > 0 && (
                    <span className={`px-1.5 py-0.2 rounded-full text-[9px] font-extrabold shadow-2xs ${
                      isActive 
                        ? 'bg-[#FFF3C8] text-[#14252D]' 
                        : 'bg-[#FFF3C8] text-[#458393] border border-[#E5CB90]'
                    }`}>
                      {room.unreadCount}
                    </span>
                  )}

                  {room.isVoiceActive && !isExpanded && (
                    <span className={`w-2 h-2 rounded-full animate-pulse ${
                      isActive ? 'bg-[#FFF3C8]' : 'bg-[#34A99D]'
                    }`} title="Voice Active" />
                  )}

                  <span className={`transition-transform duration-200 ${
                    isActive ? 'text-[#FFF3C8]' : 'text-[#458393] opacity-60 group-hover:opacity-100'
                  } ${isExpanded ? 'rotate-180' : ''}`}>
                    <ChevronDown size={13} />
                  </span>
                </div>
              </div>

              {/* Expand Downwards 2 Rows (Reveals latest message + connect button icon) */}
              <div className={`transition-all duration-200 ease-out overflow-hidden ${
                isExpanded 
                  ? 'max-h-24 opacity-100 mt-2 pt-2 border-t' 
                  : 'max-h-0 opacity-0 mt-0 pt-0 border-t-0'
              } ${isActive ? 'border-white/20' : 'border-[#E5CB90]/60'}`}>
                {/* Row 1: Latest message or unread message */}
                <div className="flex items-center gap-1.5 text-[11px] min-h-[18px]">
                  {room.unreadCount > 0 ? (
                    <span className={`px-1.5 py-0.2 rounded text-[9px] font-extrabold uppercase tracking-wider shrink-0 ${
                      isActive 
                        ? 'bg-[#FFF3C8] text-[#14252D]' 
                        : 'bg-[#FFF3C8] text-[#458393] border border-[#E5CB90]'
                    }`}>
                      {room.unreadCount} New
                    </span>
                  ) : null}

                  {latestMessage ? (
                    <div className={`flex items-center gap-1.5 min-w-0 flex-1 truncate ${
                      isActive ? 'text-[#FFF3C8]' : 'text-[#56727D]'
                    }`}>
                      <span className={`font-bold shrink-0 truncate ${
                        isActive ? 'text-white' : 'text-[#14252D]'
                      }`}>
                        {latestMessage.sender.name}:
                      </span>
                      <span className={`truncate ${
                        isActive ? 'text-[#FFF3C8]/90' : 'text-slate-600'
                      }`}>
                        {latestMessage.text}
                      </span>
                      <span className={`text-[10px] shrink-0 ml-auto pl-1 font-mono ${
                        isActive ? 'text-white/80' : 'text-slate-400'
                      }`}>
                        {latestMessage.time}
                      </span>
                    </div>
                  ) : (
                    <span className={`text-[11px] italic ${
                      isActive ? 'text-[#FFF3C8]/80' : 'text-slate-400'
                    }`}>
                      No messages yet
                    </span>
                  )}
                </div>

                {/* Row 2: Connect button icon & Minimal status */}
                <div className="flex items-center justify-between mt-1.5 pt-0.5">
                  {/* Minimal Connect Button Icon */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleVoiceConnect();
                    }}
                    title={isCurrentVoiceRoom ? "Disconnect from Voice" : "Connect to Voice"}
                    className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[10px] font-bold transition-all cursor-pointer shadow-xs ${
                      isCurrentVoiceRoom
                        ? 'bg-rose-500 hover:bg-rose-600 text-white'
                        : isActive
                          ? 'bg-[#FFF3C8] hover:bg-white text-[#14252D]'
                          : 'bg-[#E6F6F4] text-[#34A99D] hover:bg-[#34A99D] hover:text-white border border-[#34A99D]/40'
                    }`}
                  >
                    {isCurrentVoiceRoom ? (
                      <>
                        <PhoneOff size={11} />
                        <span>Disconnect</span>
                      </>
                    ) : (
                      <>
                        <Headphones size={11} />
                        <span>Connect</span>
                      </>
                    )}
                  </button>

                  {/* Minimal Status Presence (voice wave & member count) */}
                  <div className={`flex items-center gap-2 text-[10px] font-bold ${
                    isActive ? 'text-[#FFF3C8]' : 'text-[#56727D]'
                  }`}>
                    {room.isVoiceActive && (
                      <div className={`flex items-end gap-0.5 h-2.5 px-1 py-0.5 rounded ${
                        isActive ? 'bg-white/20' : 'bg-[#E6F6F4] border border-[#34A99D]/30'
                      }`} title="Voice Streaming">
                        <span className={`w-0.5 rounded-full animate-wave-1 ${isActive ? 'bg-white' : 'bg-[#34A99D]'}`}></span>
                        <span className={`w-0.5 rounded-full animate-wave-2 ${isActive ? 'bg-white' : 'bg-[#34A99D]'}`}></span>
                        <span className={`w-0.5 rounded-full animate-wave-3 ${isActive ? 'bg-white' : 'bg-[#34A99D]'}`}></span>
                      </div>
                    )}
                    <span className="flex items-center gap-1 font-semibold" title={`${room.memberCount || 1} members in space`}>
                      <Users size={11} className={isActive ? 'text-[#FFF3C8]' : 'text-[#458393]'} />
                      <span>{room.memberCount || 1}</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 4. Minimal Panel Footer */}
      <div className="border-t-2 border-[#E5CB90] bg-[#FAF3E3] p-2 flex items-center justify-between text-xs text-[#56727D]">
        <button
          onClick={onCreateRoom}
          className="w-full flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg bg-[#FFF3C8] hover:bg-white text-[#14252D] font-bold border border-[#E5CB90] shadow-2xs transition-colors cursor-pointer"
        >
          <Plus size={13} className="text-[#34A99D]" />
          <span>New Space</span>
        </button>
      </div>
    </aside>
  );
}
