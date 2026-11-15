import React, { useState } from 'react';
import { X, Moon, Sun, Volume2, Bell, Shield, Laptop, Check } from 'lucide-react';

export default function SettingsModal({ isOpen, onClose }) {
  const [soundEffects, setSoundEffects] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [autoRunCode, setAutoRunCode] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-10000 bg-[#132C33]/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="w-full max-w-md bg-[#FAF3E3] rounded-2xl shadow-2xl border-2 border-[#E5CB90] overflow-hidden ring-1 ring-black/10 animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-4 bg-gradient-to-r from-[#1B3E48] via-[#245360] to-[#2B5D6B] border-b border-[#2B5D6B] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#FFF3C8] text-sm">Collab+ Preferences</span>
            <span className="text-[10px] font-bold bg-[#FFF3C8] text-[#1B3E48] px-2 py-0.5 rounded-full border border-[#E5CB90]">
              Prototype v0.1
            </span>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-lg text-[#FFF3C8]/70 hover:text-[#FFFDF7] hover:bg-white/10 cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4 text-xs bg-[#FAF3E3]">
          {/* Appearance */}
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#458393] mb-2">
              Appearance & Theme
            </div>
            <div className="p-3 rounded-xl bg-[#FFFDF7] border border-[#E5CB90] flex items-center justify-between shadow-2xs">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-lg bg-[#FFF3C8] text-[#458393]">
                  <Sun size={16} />
                </div>
                <div>
                  <div className="font-bold text-[#142B31]">Dominant Palette Theme</div>
                  <div className="text-[#458393] text-[11px]">ColorHunt #e5cb90 #fff3c8 #34a99d #458393</div>
                </div>
              </div>
              <span className="flex items-center gap-1 font-bold text-white bg-[#34A99D] px-2.5 py-1 rounded-md shadow-2xs">
                <Check size={12} /> Active
              </span>
            </div>
          </div>

          {/* Sound & Audio */}
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#458393] mb-2">
              Audio & Haptics
            </div>
            <div className="space-y-2">
              <div className="p-3 rounded-xl bg-[#FFFDF7] border border-[#E5CB90] flex items-center justify-between shadow-2xs">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-[#34A99D]/15 text-[#34A99D]">
                    <Volume2 size={16} />
                  </div>
                  <div>
                    <div className="font-bold text-[#142B31]">Room Voice Chimes</div>
                    <div className="text-[#458393] text-[11px]">Play audio cues on join and message</div>
                  </div>
                </div>
                <input 
                  type="checkbox" 
                  checked={soundEffects} 
                  onChange={() => setSoundEffects(!soundEffects)}
                  className="w-4 h-4 rounded accent-[#34A99D] cursor-pointer"
                />
              </div>

              <div className="p-3 rounded-xl bg-[#FFFDF7] border border-[#E5CB90] flex items-center justify-between shadow-2xs">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-[#34A99D]/15 text-[#34A99D]">
                    <Bell size={16} />
                  </div>
                  <div>
                    <div className="font-bold text-[#142B31]">Friend Activity Notifications</div>
                    <div className="text-[#458393] text-[11px]">Popups for LeetCode milestones & PRs</div>
                  </div>
                </div>
                <input 
                  type="checkbox" 
                  checked={notifications} 
                  onChange={() => setNotifications(!notifications)}
                  className="w-4 h-4 rounded accent-[#34A99D] cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Code Execution */}
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#458393] mb-2">
              Compiler Sandbox
            </div>
            <div className="p-3 rounded-xl bg-[#FFFDF7] border border-[#E5CB90] flex items-center justify-between shadow-2xs">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-lg bg-[#34A99D]/15 text-[#34A99D]">
                  <Laptop size={16} />
                </div>
                <div>
                  <div className="font-bold text-[#142B31]">Instant Evaluation</div>
                  <div className="text-[#458393] text-[11px]">Auto-run snippets sent from chat</div>
                </div>
              </div>
              <input 
                type="checkbox" 
                checked={autoRunCode} 
                onChange={() => setAutoRunCode(!autoRunCode)}
                className="w-4 h-4 rounded accent-[#34A99D] cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 bg-[#F5ECCF] border-t border-[#E5CB90] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-[#34A99D] hover:bg-[#2A8F84] text-white font-bold text-xs shadow-xs cursor-pointer transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
