'use client';

import { CheckIcon, XIcon, CheckCircleIcon } from 'lucide-react';
import { Lesson } from '@/lib/data/lesson';
import ReactMarkdown from 'react-markdown';
// import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface ChallengeSidebarProps {
  lesson: Lesson;
  onComplete: () => void;
  isRunningTests: boolean;
}

export function ChallengeSidebar({ lesson, onComplete, isRunningTests }: ChallengeSidebarProps) {
  return (
    <aside className="w-[400px] flex flex-col border-l border-ink-secondary bg-bg-base overflow-hidden">
      {/* Objective Section */}
      <div className="p-6 border-b border-ink-secondary bg-bg-base overflow-y-auto max-h-[40%] custom-scrollbar">
        <span className="block text-[10px] uppercase font-bold tracking-widest mb-3">Objective</span>
        <div className="bg-bg-base border border-ink-primary p-4 relative">
          {/* Card Accent */}
          <div className="absolute -top-1.5 -left-1.5 w-2.5 h-2.5 bg-bg-base border-t border-l border-ink-primary" />
          
          <div className="text-[12px] leading-relaxed text-ink-primary prose prose-sm max-w-none">
             <ReactMarkdown
              components={{
                p: ({ children }) => <span className="m-0 block mb-2">{children}</span>,
                code: ({ children }) => (
                  <span className="bg-ink-secondary/10 px-1 py-0.5 rounded text-[11px] font-mono text-ink-primary mx-0.5 border border-ink-secondary/20">
                    {children}
                  </span>
                ),
              }}
            >
              {lesson.content}
            </ReactMarkdown>
          </div>
        </div>
      </div>

      {/* Test Cases Section */}
      <div className="flex-1 p-6 border-b border-ink-secondary bg-ink-primary/5 overflow-y-auto custom-scrollbar">
         <span className="block text-[10px] uppercase font-bold tracking-widest mb-3">Test Cases</span>
         <div className="space-y-3">
            {lesson.testCases?.map((test, i) => (
              <div 
                key={i} 
                className={`flex items-center gap-3 p-3 border-l-2 bg-bg-base/50 ${
                  test.status === 'pass' ? 'border-green-600' : 
                  test.status === 'fail' ? 'border-red-600' : 'border-ink-tertiary'
                }`}
              >
                {/* Status Dot */}
                 <div className={`w-2 h-2 rounded-full shrink-0 ${
                    test.status === 'pass' ? 'bg-green-600' : 
                    test.status === 'fail' ? 'bg-red-600' : 'bg-ink-tertiary'
                 }`} />
                 
                 <div className="flex-1 min-w-0">
                   <div className="text-[11px] font-bold truncate">{test.name}</div>
                   <div className="text-[10px] text-ink-secondary truncate">{test.description}</div>
                 </div>

                 {test.status === 'fail' && (
                   <XIcon className="w-4 h-4 text-red-600" />
                 )}
                 {test.status === 'pass' && (
                   <CheckIcon className="w-4 h-4 text-green-600" />
                 )}
              </div>
            ))}
         </div>
      </div>

      {/* Output Panel & Actions */}
      <div className="flex flex-col border-t border-ink-secondary bg-ink-primary text-ink-secondary h-[40%]">
        <div className="flex-1 p-6 font-mono text-[11px] overflow-y-auto custom-scrollbar">
          <span className="block text-[10px] uppercase font-bold tracking-widest mb-2 text-ink-tertiary">Console Output</span>
          <pre className="whitespace-pre-wrap leading-relaxed text-[#A8B5B2]">
            {lesson.consoleOutput || '> Ready...'}
          </pre>
        </div>

        <div className="p-0">
          <button 
            onClick={onComplete}
            disabled={isRunningTests}
            className="w-full h-14 bg-[#2D5A27] hover:bg-[#23461F] text-white text-[12px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isRunningTests ? (
              <span>Running Checks...</span>
            ) : (
              <>
                <CheckCircleIcon className="w-4 h-4" />
                Mark as Complete
              </>
            )}
          </button>
        </div>
      </div>
    </aside>
  );
}
