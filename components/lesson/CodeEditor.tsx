'use client';

import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import { CloudCheckIcon, PlayIcon } from '@phosphor-icons/react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Button } from '@/components/ui/button';

interface CodeEditorProps {
  initialCode?: string;
  solution?: string;
}

export function CodeEditor({ initialCode = '', solution }: CodeEditorProps) {
  const t = useTranslations('Lesson');
  const [code, setCode] = useState(initialCode);
  const [lastSaved, setLastSaved] = useState<Date>(new Date());

  // Auto-save simulation
  useEffect(() => {
    const timer = setTimeout(() => {
      setLastSaved(new Date());
    }, 2000);
    return () => clearTimeout(timer);
  }, [code]);

  const handleShowSolution = () => {
    if (solution) {
      setCode(solution);
    }
  };

  const getTimeSinceLastSave = () => {
    const seconds = Math.floor((new Date().getTime() - lastSaved.getTime()) / 1000);
    if (seconds < 60) return `${seconds}s ${t('ago')}`;
    const minutes = Math.floor(seconds / 60);
    return `${minutes}m ${t('ago')}`;
  };

  return (
    <div className="flex flex-col h-full border-l border-ink-secondary">
      {/* Editor Header */}
      <div className="bg-ink-primary text-bg-base px-4 py-2 flex justify-between items-center">
        <span className="text-[10px] font-bold uppercase tracking-widest">SRC/LIB.RS</span>
        <div className="flex gap-3 items-center">
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest">
            <CloudCheckIcon size={14} weight="fill" />
            <span>{t('autosaved')} {getTimeSinceLastSave()}</span>
          </div>
          {solution && (
            <button
              onClick={handleShowSolution}
              className="border border-bg-base text-bg-base px-2 py-0.5 text-[9px] uppercase tracking-widest hover:bg-bg-base hover:text-ink-primary transition-colors"
            >
              {t('solution')}
            </button>
          )}
        </div>
      </div>

      {/* Editor Body */}
      <div className="flex-1 bg-[#1e1e1e] relative overflow-hidden">
        {/* Syntax Highlighter Layer (Visual) */}
        <div className="absolute inset-0 pointer-events-none p-6">
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
            wrapLines={true}
            wrapLongLines={true}
          >
            {code}
          </SyntaxHighlighter>
        </div>

        {/* Textarea Layer (Input) */}
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="absolute inset-0 w-full h-full p-6 font-mono text-[13px] leading-normal bg-transparent border-none outline-none resize-none text-transparent caret-white"
          spellCheck={false}
          style={{
             fontFamily: 'monospace', // Ensure exact match
          }}
        />
      </div>

      {/* Editor Footer */}
      <div className="px-6 py-4 border-t border-ink-secondary bg-bg-base flex justify-between items-center">
        <div className="text-[10px] uppercase tracking-widest text-ink-secondary">
          {t('output')}: SYSTEM READY
        </div>
        <Button
          variant="landingPrimary"
          className="rounded-none uppercase text-[10px] font-bold px-4 py-2 h-auto tracking-widest flex items-center gap-2"
        >
          {t('runTests')} <PlayIcon size={12} weight="fill" />
        </Button>
      </div>
    </div>
  );
}
