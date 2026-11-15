import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, 
  Play, 
  RotateCcw, 
  Copy, 
  Check, 
  Send, 
  Terminal, 
  Sparkles, 
  Trash2, 
  Code2, 
  MessageSquare,
  FileCode,
  Zap,
  CheckCircle2
} from 'lucide-react';
import { STARTER_CODE } from '@/data';

export default function CompilerWorkspacePanel({
  activeRoom,
  codeSnippet,
  onCodeChange,
  currentLanguage,
  onChangeLanguage,
  onShareCodeToChat,
  onSwitchToChat
}) {
  const [isRunning, setIsRunning] = useState(false);
  const [consoleOutput, setConsoleOutput] = useState(null);
  const [copied, setCopied] = useState(false);
  const [sharedToast, setSharedToast] = useState(false);
  const textareaRef = useRef(null);

  // File extension mapping
  const extensionMap = {
    python: 'py',
    javascript: 'js',
    typescript: 'ts',
    cpp: 'cpp',
    rust: 'rs'
  };
  const fileExtension = extensionMap[currentLanguage] || 'py';

  // Compute line numbers from codeSnippet
  const lineCount = Math.max(1, (codeSnippet || '').split('\n').length);
  const lineNumbers = Array.from({ length: lineCount }, (_, i) => i + 1);

  // Keyboard shortcut Ctrl+Enter to Run Code
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        handleRunCode();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [codeSnippet, currentLanguage]);

  const handleRunCode = () => {
    setIsRunning(true);
    setConsoleOutput(null);

    setTimeout(() => {
      setIsRunning(false);
      if (currentLanguage === 'python') {
        setConsoleOutput({
          status: 'success',
          executionTime: '12ms',
          exitCode: 0,
          stdout: `Target: 9\nIndices: [0, 1] -> Values: [2, 7]\n\n[Collab+ Runner] Tests passed: 3/3\nMemory: 14.2 MB (Top 8% efficiency)`,
          aiAnalysis: 'Time Complexity: O(N) | Space Complexity: O(N) via single-pass hash map'
        });
      } else if (currentLanguage === 'javascript') {
        setConsoleOutput({
          status: 'success',
          executionTime: '8ms',
          exitCode: 0,
          stdout: `Input: [[1,3],[2,6],[8,10],[15,18]]\nMerged Intervals: [[1,6],[8,10],[15,18]]\n\n[Collab+ Runner] All assertions validated.`,
          aiAnalysis: 'Time Complexity: O(N log N) | Space Complexity: O(N) sorting-based solution'
        });
      } else if (currentLanguage === 'typescript') {
        setConsoleOutput({
          status: 'success',
          executionTime: '15ms',
          exitCode: 0,
          stdout: `Active Mesh Peers: 3\nAverage Round-Trip Latency: 18.0ms\n[TypeScript v5.4] Type checking completed with 0 errors.`,
          aiAnalysis: 'Type safety verified. Zero implicit any detected.'
        });
      } else {
        setConsoleOutput({
          status: 'success',
          executionTime: '22ms',
          exitCode: 0,
          stdout: `[Collab+ Runner: C++ 20 Clang 17.0]\nExecuting binary...\nParticipants: 5\nMean Quiz Score: 94.6 pts\nProcess finished with exit code 0`,
          aiAnalysis: 'Compiled with -O3 optimizations. Fast memory allocation.'
        });
      }
    }, 550);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    onCodeChange(STARTER_CODE[currentLanguage] || '');
    setConsoleOutput(null);
  };

  const handleShare = () => {
    onShareCodeToChat(codeSnippet, currentLanguage);
    setSharedToast(true);
    setTimeout(() => setSharedToast(false), 2500);
  };

  // Handle Tab key inside textarea
  const handleKeyDownTextarea = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      const newValue = codeSnippet.substring(0, start) + '    ' + codeSnippet.substring(end);
      onCodeChange(newValue);
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + 4;
        }
      }, 0);
    }
  };

  return (
    <main className="h-full flex flex-col bg-[#FAF3E3] select-none relative overflow-hidden">
      {/* 1. COMPILER TOP TOOLBAR */}
      <div className="h-13 px-4 border-b-2 border-[#E5CB90] flex items-center justify-between bg-[#F5ECCF]/95 backdrop-blur-xs shrink-0 shadow-xs">
        {/* Left: Return to Chat & File Badge */}
        <div className="flex items-center gap-2.5">
          {/* Return to Chat Pill */}
          <button
            onClick={onSwitchToChat}
            title="Switch back to Chat Room"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FFF3C8] hover:bg-white text-[#14252D] font-extrabold border-2 border-[#E5CB90] shadow-2xs hover:border-[#34A99D] transition-all cursor-pointer text-xs"
          >
            <ArrowLeft size={14} className="text-[#34A99D]" />
            <span>Chat: #{activeRoom?.name || 'room'}</span>
          </button>

          {/* Active File Tab */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#142B31] text-[#FFF3C8] border border-[#34A99D]/40 font-mono text-xs font-bold shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#34A99D] animate-pulse"></span>
            <span>scratchpad.{fileExtension}</span>
          </div>
        </div>

        {/* Center: Language Dropdown Selector */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-[#FFFDF7] px-2.5 py-1 rounded-xl border-2 border-[#E5CB90] shadow-2xs">
            <span className="text-[11px] font-extrabold text-[#458393] uppercase tracking-wider">Language:</span>
            <select
              value={currentLanguage}
              onChange={(e) => onChangeLanguage(e.target.value)}
              className="text-xs font-extrabold text-[#14252D] bg-[#FAF3E3] border border-[#E5CB90] rounded-lg px-2 py-0.5 focus:outline-hidden cursor-pointer hover:border-[#34A99D]"
            >
              <option value="python">Python 3.12</option>
              <option value="javascript">JavaScript (ES6)</option>
              <option value="typescript">TypeScript 5.4</option>
              <option value="cpp">C++ 20</option>
            </select>
          </div>
        </div>

        {/* Right: Actions (Reset, Copy, Share, Run) */}
        <div className="flex items-center gap-2">
          {/* Reset Template */}
          <button
            onClick={handleReset}
            title="Reset code template"
            className="p-1.5 rounded-lg text-[#458393] hover:text-[#14252D] hover:bg-[#FFF3C8] border border-[#E5CB90]/80 transition-colors cursor-pointer"
          >
            <RotateCcw size={14} />
          </button>

          {/* Copy Code */}
          <button
            onClick={handleCopy}
            title="Copy code to clipboard"
            className="p-1.5 rounded-lg text-[#458393] hover:text-[#14252D] hover:bg-[#FFF3C8] border border-[#E5CB90]/80 transition-colors cursor-pointer"
          >
            {copied ? <Check size={14} className="text-[#34A99D]" /> : <Copy size={14} />}
          </button>

          {/* Share to Chat Room */}
          <button
            onClick={handleShare}
            title="Share this snippet into active room chat"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FFFDF7] hover:bg-white text-[#14252D] font-bold border-2 border-[#E5CB90] hover:border-[#34A99D] text-xs transition-all cursor-pointer shadow-2xs"
          >
            {sharedToast ? <CheckCircle2 size={13} className="text-emerald-500" /> : <Send size={13} className="text-[#34A99D]" />}
            <span>{sharedToast ? 'Shared!' : 'Share to Room'}</span>
          </button>

          {/* Run Code Button (Primary Action) */}
          <button
            onClick={handleRunCode}
            disabled={isRunning}
            title="Run snippet (Ctrl+Enter)"
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-gradient-to-r from-[#34A99D] via-[#2F9E92] to-[#458393] hover:brightness-110 disabled:opacity-50 text-white text-xs font-extrabold transition-all shadow-md shadow-[#34A99D]/30 cursor-pointer active:scale-95"
          >
            <Play size={13} className={isRunning ? 'animate-spin' : 'fill-white'} />
            <span>{isRunning ? 'Running...' : 'Run Code ▶'}</span>
          </button>
        </div>
      </div>

      {/* 2. SPACIOUS CODE EDITOR CANVAS */}
      <div className="flex-1 flex overflow-hidden bg-[#142B31] relative">
        {/* Line Numbers Gutter */}
        <div className="w-12 py-3 bg-[#0F2227] border-r border-[#2B5D6B]/50 select-none text-right pr-2.5 font-mono text-xs text-[#527F8B] font-medium leading-relaxed shrink-0">
          {lineNumbers.map((num) => (
            <div key={num}>{num}</div>
          ))}
        </div>

        {/* Code Textarea Area */}
        <div className="flex-1 relative h-full overflow-hidden">
          <textarea
            ref={textareaRef}
            value={codeSnippet}
            onChange={(e) => onCodeChange(e.target.value)}
            onKeyDown={handleKeyDownTextarea}
            spellCheck="false"
            placeholder="// Write code here..."
            className="w-full h-full p-3 font-mono text-xs text-[#FFF3C8] bg-transparent resize-none focus:outline-hidden leading-relaxed selection:bg-[#34A99D]/40 font-medium select-text overflow-y-auto"
          />
        </div>
      </div>

      {/* 3. DOCKED OUTPUT TERMINAL CONSOLE */}
      <div className="h-48 border-t-2 border-[#2B5D6B] bg-[#0B1A1E] text-[#E6F6F4] flex flex-col shrink-0 select-text">
        {/* Console Header Bar */}
        <div className="px-4 py-2 bg-[#081519] border-b border-[#2B5D6B]/50 flex items-center justify-between text-xs font-mono select-none">
          <div className="flex items-center gap-2">
            <Terminal size={14} className="text-[#34A99D]" />
            <span className="font-bold text-[#FFF3C8]">Terminal Output (stdout)</span>
            {consoleOutput && (
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.2 rounded border border-emerald-500/30 font-bold">
                {consoleOutput.executionTime} • Exit {consoleOutput.exitCode}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {consoleOutput?.aiAnalysis && (
              <div className="hidden md:flex items-center gap-1.5 text-[11px] font-sans font-bold text-[#FFF3C8] bg-[#142B31] px-2.5 py-0.5 rounded-full border border-[#34A99D]/40">
                <Sparkles size={12} className="text-[#34A99D]" />
                <span>{consoleOutput.aiAnalysis}</span>
              </div>
            )}

            {consoleOutput && (
              <button
                onClick={() => setConsoleOutput(null)}
                title="Clear console output"
                className="p-1 rounded text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <Trash2 size={13} />
              </button>
            )}
          </div>
        </div>

        {/* Console Stdout Body */}
        <div className="flex-1 p-3 font-mono text-xs overflow-y-auto leading-relaxed">
          {isRunning ? (
            <div className="flex items-center gap-2 text-[#34A99D] animate-pulse">
              <Zap size={14} />
              <span>Compiling and executing snippet in isolated sandbox...</span>
            </div>
          ) : consoleOutput ? (
            <pre className="whitespace-pre-wrap text-emerald-300 font-medium">
              {consoleOutput.stdout}
            </pre>
          ) : (
            <div className="text-slate-500 text-xs italic">
              Terminal idle. Click "Run Code ▶" or press Ctrl+Enter to execute.
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

