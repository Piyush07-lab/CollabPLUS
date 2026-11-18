/*
 * Copyright (C) 2026 Collab+ Contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useState } from 'react';
import { X, Volume2, Code2, Gamepad2, Radio } from 'lucide-react';

export default function CreateRoomModal({ isOpen, onClose, onCreate }) {
  const [name, setName] = useState('');
  const [topic, setTopic] = useState('');
  const [category, setCategory] = useState('voice');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    onCreate({
      name: name.trim().toLowerCase().replace(/\s+/g, '-'),
      topic: topic.trim() || 'General discussion and collab',
      category
    });
    setName('');
    setTopic('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-10000 bg-[#132C33]/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="w-full max-w-sm bg-[#FAF3E3] rounded-2xl shadow-2xl border-2 border-[#E5CB90] overflow-hidden ring-1 ring-black/10 animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-4 py-3 bg-gradient-to-r from-[#1B3E48] via-[#245360] to-[#2B5D6B] border-b border-[#2B5D6B] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Radio size={16} className="text-[#34A99D]" />
            <span className="font-bold text-[#FFF3C8] text-sm">Create New Space</span>
          </div>
          <button onClick={onClose} className="p-1 rounded text-[#FFF3C8]/70 hover:text-[#FFFDF7] hover:bg-white/10 cursor-pointer">
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-3.5 text-xs bg-[#FAF3E3]">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-[#458393] mb-1">
              Space Name
            </label>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E5CB90] bg-[#FFFDF7] has-[:focus]:border-[#34A99D] has-[:focus]:ring-2 has-[:focus]:ring-[#34A99D]/20">
              <span className="text-[#34A99D] font-bold">#</span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. rust-study, game-night"
                required
                className="w-full bg-transparent focus:outline-hidden text-xs text-[#142B31]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-[#458393] mb-1">
              Topic / Purpose
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="What are we vibing or coding here?"
              className="w-full px-3 py-1.5 rounded-lg border border-[#E5CB90] bg-[#FFFDF7] focus:border-[#34A99D] focus:ring-2 focus:ring-[#34A99D]/20 focus:outline-hidden text-xs text-[#142B31]"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-[#458393] mb-1.5">
              Space Category
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setCategory('voice')}
                className={`p-2 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1 ${
                  category === 'voice' 
                    ? 'border-[#34A99D] bg-[#34A99D] text-white font-bold shadow-2xs' 
                    : 'border-[#E5CB90] bg-[#FFFDF7] hover:bg-[#FFFBF0] text-[#142B31]'
                }`}
              >
                <Volume2 size={16} />
                <span className="text-[11px]">Voice Lounge</span>
              </button>

              <button
                type="button"
                onClick={() => setCategory('code')}
                className={`p-2 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1 ${
                  category === 'code' 
                    ? 'border-[#34A99D] bg-[#34A99D] text-white font-bold shadow-2xs' 
                    : 'border-[#E5CB90] bg-[#FFFDF7] hover:bg-[#FFFBF0] text-[#142B31]'
                }`}
              >
                <Code2 size={16} />
                <span className="text-[11px]">Code Sprint</span>
              </button>

              <button
                type="button"
                onClick={() => setCategory('games')}
                className={`p-2 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1 ${
                  category === 'games' 
                    ? 'border-[#34A99D] bg-[#34A99D] text-white font-bold shadow-2xs' 
                    : 'border-[#E5CB90] bg-[#FFFDF7] hover:bg-[#FFFBF0] text-[#142B31]'
                }`}
              >
                <Gamepad2 size={16} />
                <span className="text-[11px]">Social/Games</span>
              </button>
            </div>
          </div>

          <div className="pt-2 flex justify-end gap-2 border-t border-[#E5CB90]">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 rounded-lg text-[#458393] hover:text-[#142B31] hover:bg-[#F5ECCF] cursor-pointer font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-[#34A99D] to-[#458393] hover:brightness-105 text-white font-bold shadow-xs cursor-pointer transition-colors"
            >
              Create Space
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
