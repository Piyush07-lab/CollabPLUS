import React, { useState, useEffect, useRef, useCallback } from 'react';
import TopBar from './components/TopBar';
import RoomsPanel from './components/RoomsPanel';
import ChatPanel from './components/ChatPanel';
import CommandCenterPanel from './components/CommandCenterPanel';
import CompilerWorkspacePanel from './components/CompilerWorkspacePanel';
import BottomBar from './components/BottomBar';
import CommandPaletteModal from './components/CommandPaletteModal';
import SettingsModal from './components/SettingsModal';
import CreateRoomModal from './components/CreateRoomModal';
import { 
  INITIAL_ROOMS, 
  INITIAL_MESSAGES, 
  INITIAL_FRIENDS, 
  INITIAL_DEV_FEEDS, 
  STARTER_CODE 
} from './data/mockData';

export default function App() {
  // ==================== PANEL LAYOUT STATE ====================
  const [leftWidth, setLeftWidth] = useState(() => {
    const saved = localStorage.getItem('collab_left_width');
    return saved ? parseInt(saved, 10) : 280;
  });
  const [rightWidth, setRightWidth] = useState(() => {
    const saved = localStorage.getItem('collab_right_width');
    return saved ? parseInt(saved, 10) : 390;
  });

  const [leftVisible, setLeftVisible] = useState(true);
  const [rightVisible, setRightVisible] = useState(true);

  // Active dragging states
  const [isDraggingLeft, setIsDraggingLeft] = useState(false);
  const [isDraggingRight, setIsDraggingRight] = useState(false);

  // ==================== APPLICATION DATA STATE ====================
  const [rooms, setRooms] = useState(INITIAL_ROOMS);
  const [activeRoomId, setActiveRoomId] = useState('room-1');
  const [messagesByRoom, setMessagesByRoom] = useState(INITIAL_MESSAGES);
  const [friends, setFriends] = useState(INITIAL_FRIENDS);
  const [devFeeds, setDevFeeds] = useState(INITIAL_DEV_FEEDS);

  // Voice & Audio state
  const [isInVoice, setIsInVoice] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isDeafened, setIsDeafened] = useState(false);

  // Center viewport mode: 'chat' | 'compiler'
  const [centerViewMode, setCenterViewMode] = useState('chat');

  // Command Center state (Right Panel: Friends & Dev Feeds)
  const [activeCommandTab, setActiveCommandTab] = useState('friends');
  const [currentLanguage, setCurrentLanguage] = useState('python');
  const [codeSnippet, setCodeSnippet] = useState(STARTER_CODE.python);

  // Modals state
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isCreateRoomOpen, setIsCreateRoomOpen] = useState(false);

  // Active room reference
  const activeRoom = rooms.find(r => r.id === activeRoomId) || rooms[0];
  const currentMessages = messagesByRoom[activeRoomId] || [];

  // ==================== RESIZE HANDLERS ====================
  const startDragLeft = useCallback((e) => {
    e.preventDefault();
    setIsDraggingLeft(true);
    const startX = e.clientX;
    const startW = leftWidth;

    const onPointerMove = (moveEvent) => {
      const delta = moveEvent.clientX - startX;
      const newWidth = Math.max(200, Math.min(460, startW + delta));
      setLeftWidth(newWidth);
      localStorage.setItem('collab_left_width', newWidth.toString());
    };

    const onPointerUp = () => {
      setIsDraggingLeft(false);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
  }, [leftWidth]);

  const startDragRight = useCallback((e) => {
    e.preventDefault();
    setIsDraggingRight(true);
    const startX = e.clientX;
    const startW = rightWidth;

    const onPointerMove = (moveEvent) => {
      const delta = startX - moveEvent.clientX;
      const newWidth = Math.max(300, Math.min(650, startW + delta));
      setRightWidth(newWidth);
      localStorage.setItem('collab_right_width', newWidth.toString());
    };

    const onPointerUp = () => {
      setIsDraggingRight(false);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
  }, [rightWidth]);

  // ==================== KEYBOARD SHORTCUTS ====================
  useEffect(() => {
    const handleGlobalKeys = (e) => {
      // Ctrl+B / Cmd+B -> Toggle Left Panel
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'b') {
        e.preventDefault();
        setLeftVisible(prev => !prev);
      }
      // Ctrl+J / Cmd+J -> Toggle Right Panel
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'j') {
        e.preventDefault();
        setRightVisible(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleGlobalKeys);
    return () => window.removeEventListener('keydown', handleGlobalKeys);
  }, []);

  // Language switch updates code editor
  const handleLanguageChange = (newLang) => {
    setCurrentLanguage(newLang);
    setCodeSnippet(STARTER_CODE[newLang] || '// Write code here');
  };

  // Cross-panel: Send code from Chat to Compiler (Switches center viewport to Compiler)
  const handleSendToCompiler = (snippet, lang = 'python') => {
    setCenterViewMode('compiler');
    if (lang && STARTER_CODE[lang]) {
      setCurrentLanguage(lang);
    }
    setCodeSnippet(snippet);
  };

  // Cross-panel: Share code from Compiler to Chat
  const handleShareCodeToChat = (code, lang) => {
    const newMsg = {
      id: `msg-${Date.now()}`,
      sender: {
        id: 'u1',
        name: 'Alex Rivers',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces',
        badge: 'You'
      },
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: 'Shared a code snippet from the Scratchpad compiler:',
      codeSnippet: {
        language: lang,
        code: code
      }
    };

    setMessagesByRoom(prev => ({
      ...prev,
      [activeRoomId]: [...(prev[activeRoomId] || []), newMsg]
    }));
  };

  // Send message in active room
  const handleSendMessage = (text) => {
    const newMsg = {
      id: `msg-${Date.now()}`,
      sender: {
        id: 'u1',
        name: 'Alex Rivers',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces',
        badge: 'You'
      },
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text
    };

    setMessagesByRoom(prev => ({
      ...prev,
      [activeRoomId]: [...(prev[activeRoomId] || []), newMsg]
    }));

    // Check if message is querying CollabBot or asking a quiz
    if (text.toLowerCase().includes('@collab') || text.toLowerCase().includes('/quiz') || text.toLowerCase().includes('explain')) {
      setTimeout(() => {
        let aiResponseText = `⚡ CollabBot here! I analyzed your note in #${activeRoom.name}. Keep crushing your coding goals!`;
        let code = null;

        if (text.toLowerCase().includes('quiz')) {
          aiResponseText = `🎯 Quick Quiz: In Python, what is the average time complexity of searching a key in a Dictionary?\nA) O(1)\nB) O(N)\nC) O(log N)`;
        } else if (text.toLowerCase().includes('recurs')) {
          aiResponseText = `Here is the recursive variation for reverse linked list:`;
          code = {
            language: 'python',
            code: `def reverse_list_recursive(head):\n    if not head or not head.next:\n        return head\n    new_head = reverse_list_recursive(head.next)\n    head.next.next = head\n    head.next = None\n    return new_head`
          };
        }

        const botMsg = {
          id: `bot-${Date.now()}`,
          sender: {
            id: 'bot',
            name: 'CollabBot AI',
            avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&h=100&fit=crop&crop=faces',
            badge: 'Room Bot',
            isAi: true
          },
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          text: aiResponseText,
          codeSnippet: code,
          suggestedActions: ['Run in Scratchpad', 'Give Me a Hint', 'Next Quiz Question']
        };

        setMessagesByRoom(prev => ({
          ...prev,
          [activeRoomId]: [...(prev[activeRoomId] || []), botMsg]
        }));
      }, 700);
    }
  };

  // Add new room
  const handleCreateRoom = (roomData) => {
    const newRoom = {
      id: `room-${Date.now()}`,
      name: roomData.name,
      topic: roomData.topic,
      category: roomData.category,
      isVoiceActive: roomData.category === 'voice',
      hasScreenShare: false,
      memberCount: 1,
      members: [
        {
          id: 'u1',
          name: 'Alex',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces',
          inVoice: roomData.category === 'voice',
          isMuted: false
        }
      ]
    };

    setRooms(prev => [...prev, newRoom]);
    setActiveRoomId(newRoom.id);
  };

  // Reset layout to defaults
  const handleResetLayout = () => {
    setLeftWidth(280);
    setRightWidth(390);
    setLeftVisible(true);
    setRightVisible(true);
    setCenterViewMode('chat');
    localStorage.removeItem('collab_left_width');
    localStorage.removeItem('collab_right_width');
  };

  return (
    <div className={`h-screen w-screen flex flex-col bg-[#F8F3E5] font-sans text-slate-900 select-none overflow-hidden ${
      isDraggingLeft || isDraggingRight ? 'cursor-col-resize select-none pointer-events-auto' : ''
    }`}>
      {/* 1. TOP NAVIGATION BAR */}
      <TopBar
        leftVisible={leftVisible}
        setLeftVisible={setLeftVisible}
        rightVisible={rightVisible}
        setRightVisible={setRightVisible}
        activeRoom={activeRoom}
        friends={friends}
        isInVoice={isInVoice}
        onToggleVoiceConnect={() => setIsInVoice(prev => !prev)}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      {/* 2. DYNAMIC RESIZABLE THREE-SPLIT WORKSPACE */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* ==================== LEFT PANEL: ROOMS ==================== */}
        {leftVisible && (
          <div 
            style={{ width: `${leftWidth}px` }} 
            className="h-full shrink-0 relative transition-none"
          >
            <RoomsPanel
              rooms={rooms}
              activeRoomId={activeRoomId}
              messagesByRoom={messagesByRoom}
              onSelectRoom={setActiveRoomId}
              onCollapse={() => setLeftVisible(false)}
              isInVoice={isInVoice}
              onToggleVoiceConnect={() => setIsInVoice(prev => !prev)}
              isMuted={isMuted}
              onToggleMute={() => setIsMuted(prev => !prev)}
              isDeafened={isDeafened}
              onToggleDeafen={() => setIsDeafened(prev => !prev)}
              onCreateRoom={() => setIsCreateRoomOpen(true)}
            />
          </div>
        )}

        {/* LEFT RESIZE DRAG HANDLE */}
        {leftVisible && (
          <div
            onPointerDown={startDragLeft}
            onDoubleClick={() => setLeftVisible(false)}
            title="Drag to resize rooms panel • Double-click to collapse"
            className={`w-1 hover:w-1.5 h-full cursor-col-resize z-20 transition-all select-none group flex items-center justify-center shrink-0 ${
              isDraggingLeft 
                ? 'bg-[#34A99D] w-1.5' 
                : 'bg-[#E5CB90] hover:bg-[#34A99D]'
            }`}
          >
            <div className="w-0.5 h-6 rounded-full bg-[#14252D]/20 group-hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>
        )}

        {/* ==================== CENTER PANEL: DYNAMIC VIEWPORT (CHAT ⇋ COMPILER) ==================== */}
        <div className="flex-1 h-full min-w-[320px] overflow-hidden">
          {centerViewMode === 'chat' ? (
            <ChatPanel
              activeRoom={activeRoom}
              messages={currentMessages}
              onSendMessage={handleSendMessage}
              onSendToCompiler={handleSendToCompiler}
              isInVoice={isInVoice}
              onToggleVoiceConnect={() => setIsInVoice(prev => !prev)}
            />
          ) : (
            <CompilerWorkspacePanel
              activeRoom={activeRoom}
              codeSnippet={codeSnippet}
              onCodeChange={setCodeSnippet}
              currentLanguage={currentLanguage}
              onChangeLanguage={handleLanguageChange}
              onShareCodeToChat={handleShareCodeToChat}
              onSwitchToChat={() => setCenterViewMode('chat')}
            />
          )}
        </div>

        {/* RIGHT RESIZE DRAG HANDLE */}
        {rightVisible && (
          <div
            onPointerDown={startDragRight}
            onDoubleClick={() => setRightVisible(false)}
            title="Drag to resize community panel • Double-click to collapse"
            className={`w-1 hover:w-1.5 h-full cursor-col-resize z-20 transition-all select-none group flex items-center justify-center shrink-0 ${
              isDraggingRight 
                ? 'bg-[#34A99D] w-1.5' 
                : 'bg-[#E5CB90] hover:bg-[#34A99D]'
            }`}
          >
            <div className="w-0.5 h-6 rounded-full bg-[#14252D]/20 group-hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>
        )}

        {/* ==================== RIGHT PANEL: COMMUNITY & DEV FEEDS ==================== */}
        {rightVisible && (
          <div 
            style={{ width: `${rightWidth}px` }} 
            className="h-full shrink-0 relative transition-none"
          >
            <CommandCenterPanel
              onCollapse={() => setRightVisible(false)}
              activeTab={activeCommandTab}
              setActiveTab={setActiveCommandTab}
              friends={friends}
              devFeeds={devFeeds}
            />
          </div>
        )}
      </div>

      {/* 3. UNIFIED GLOBAL BOTTOM HORIZON STATUS BAR (IDE / VS Code Architecture) */}
      <BottomBar
        leftVisible={leftVisible}
        setLeftVisible={setLeftVisible}
        rightVisible={rightVisible}
        setRightVisible={setRightVisible}
        activeCommandTab={activeCommandTab}
        setActiveCommandTab={setActiveCommandTab}
        centerViewMode={centerViewMode}
        setCenterViewMode={setCenterViewMode}
        currentLanguage={currentLanguage}
        onOpenAiPrompt={() => handleSendMessage('@CollabBot What should we code today?')}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onResetLayout={handleResetLayout}
        isInVoice={isInVoice}
        onToggleVoiceConnect={() => setIsInVoice(prev => !prev)}
        isMuted={isMuted}
        onToggleMute={() => setIsMuted(prev => !prev)}
        isDeafened={isDeafened}
        onToggleDeafen={() => setIsDeafened(prev => !prev)}
        activeRoom={activeRoom}
      />

      {/* 4. MODALS & OVERLAYS */}
      <CommandPaletteModal
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        rooms={rooms}
        onSelectRoom={setActiveRoomId}
        onOpenCompiler={() => {
          setCenterViewMode('compiler');
        }}
        onOpenFeeds={() => {
          setRightVisible(true);
          setActiveCommandTab('feeds');
        }}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />

      <CreateRoomModal
        isOpen={isCreateRoomOpen}
        onClose={() => setIsCreateRoomOpen(false)}
        onCreate={handleCreateRoom}
      />
    </div>
  );
}
