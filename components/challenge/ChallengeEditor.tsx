'use client';

import { useState, useRef, useEffect } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface ChallengeEditorProps {
  initialCode?: string;
  onChange?: (code: string) => void;
  fileName?: string;
}

export function ChallengeEditor({ initialCode = '', onChange, fileName = 'src/lib.rs' }: ChallengeEditorProps) {
  const [code, setCode] = useState(initialCode);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  // Sync state with prop if it changes (e.g. reset)
  useEffect(() => {
    setCode(initialCode);
  }, [initialCode]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newCode = e.target.value;
    setCode(newCode);
    if (onChange) onChange(newCode);
  };

  const lines = code.split('\n');

  return (
    <div className="flex flex-col h-full bg-[#1e1e1e] relative overflow-hidden">
      {/* Editor Header */}
      <div className="bg-ink-primary text-bg-base px-4 py-2 flex justify-between items-center text-[11px] font-mono border-b border-ink-secondary/20">
        <span className="font-bold">{fileName}</span>
        <span className="text-ink-secondary uppercase tracking-widest text-[9px]">Auto-saving...</span>
      </div>

      {/* Editor Body */}
      <div className="flex-1 relative overflow-auto custom-scrollbar cursor-text" onClick={() => textareaRef.current?.focus()}>
        <div className="absolute min-h-full min-w-full">
          {/* Line Numbers */}
          <div className="absolute left-0 top-6 w-10 text-right pr-3 text-ink-tertiary select-none font-mono text-[13px] leading-normal pointer-events-none z-10">
            {lines.map((_, i) => (
              <div key={i}>{i + 1}</div>
            ))}
          </div>

          {/* Syntax Highlighter Layer (Visual) */}
          <div className="absolute left-0 top-0 right-0 bottom-0 pointer-events-none pl-10 pt-6 pr-6 pb-6">
            <SyntaxHighlighter
              language="rust"
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              style={vscDarkPlus as any}
              customStyle={{
                margin: 0,
                padding: 0,
                background: 'transparent',
                fontSize: '13px',
                fontFamily: 'monospace',
                lineHeight: '1.5',
              }}
              codeTagProps={{
                style: {
                  fontFamily: 'monospace',
                }
              }}
              wrapLines={false} // Match textarea
            >
              {code}
            </SyntaxHighlighter>
          </div>

          {/* Textarea Layer (Input) */}
          <textarea
            ref={textareaRef}
            value={code}
            onChange={handleChange}
            className="absolute left-0 top-0 w-full h-full pl-10 pt-6 pr-6 pb-6 font-mono text-[13px] leading-normal bg-transparent border-none outline-none resize-none text-transparent caret-white overflow-hidden whitespace-pre"
            spellCheck={false}
            style={{
               fontFamily: 'monospace',
               minHeight: `${lines.length * 1.5 * 13 + 48}px`, // Ensure scroll height
            }}
          />
        </div>
      </div>
    </div>
  );
}
