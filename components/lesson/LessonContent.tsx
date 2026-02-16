'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { CaretDownIcon } from '@phosphor-icons/react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface LessonContentProps {
  reference: string;
  title: string;
  content: string;
  hints?: string[];
}

export function LessonContent({ reference, title, content, hints }: LessonContentProps) {
  const t = useTranslations('Lesson');
  const [showHints, setShowHints] = useState(false);

  return (
    <div className="px-12 pt-12 text-ink-primary">
      {/* Header */}
      <div className="mb-2 text-[10px] uppercase tracking-widest text-ink-secondary">
        {t('reference')}: {reference}
      </div>
      <h1 className="font-display font-bold text-[48px] leading-[0.9] -tracking-[0.02em] mb-6">
        {title}
      </h1>

      {/* Markdown Content */}
      <div className="prose prose-sm max-w-none">
        <ReactMarkdown
          components={{
            h1: ({ children }) => (
              <h2 className="font-display text-[32px] font-bold mb-4 mt-6">{children}</h2>
            ),
            h2: ({ children }) => (
              <h3 className="font-bold text-[18px] uppercase mb-3 mt-6 border-b border-ink-primary pb-1">
                {children}
              </h3>
            ),
            h3: ({ children }) => (
              <h4 className="font-bold text-[14px] uppercase mb-2 mt-4">{children}</h4>
            ),
            p: ({ children }) => (
              <p className="mb-4 text-[14px] leading-relaxed text-ink-primary">{children}</p>
            ),
            code: ({ inline, className, children, ...props }: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & { inline?: boolean }) => {
              const match = /language-(\w+)/.exec(className || '');
              // Destructure ref to avoid passing it to SyntaxHighlighter where types mismatch
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              const { ref: _ref, ...rest } = props;
              
              return !inline && match ? (
                <SyntaxHighlighter
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  style={vscDarkPlus as any}
                  language={match[1]}
                  PreTag="div"
                  className="rounded-none my-4"
                  {...rest}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              ) : (
                <code
                  className="bg-[rgba(13,20,18,0.08)] px-1 py-0.5 text-[12px] font-mono"
                  {...props}
                >
                  {children}
                </code>
              );
            },
            ul: ({ children }) => <ul className="list-disc list-inside mb-4 space-y-1">{children}</ul>,
            ol: ({ children }) => <ol className="list-decimal list-inside mb-4 space-y-1">{children}</ol>,
            li: ({ children }) => <li className="text-[14px] text-ink-primary">{children}</li>,
          }}
        >
          {content}
        </ReactMarkdown>
      </div>

      {/* Hints Section */}
      {hints && hints.length > 0 && (
        <div className="mt-10 border border-dashed border-ink-secondary p-4">
          <button
            onClick={() => setShowHints(!showHints)}
            className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest cursor-pointer w-full"
          >
            <CaretDownIcon
              size={12}
              className={`transition-transform ${showHints ? 'rotate-0' : '-rotate-90'}`}
            />
            {t('needHint')}
          </button>
          {showHints && (
            <div className="mt-3 space-y-2">
              {hints.map((hint, index) => (
                <div key={index} className="flex flex-row items-baseline gap-2 text-[12px] text-ink-secondary leading-relaxed">
                  <span className="font-mono min-w-[12px]">{index + 1}.</span>
                  <div className="flex-1">
                    <ReactMarkdown
                      components={{
                        p: ({ children }) => <span className="m-0">{children}</span>,
                        code: ({ children }) => (
                          <span className="bg-ink-secondary/15 px-1 py-0.5 rounded text-[11px] font-mono text-ink-primary mx-0.5">
                            {children}
                          </span>
                        ),
                      }}
                    >
                      {hint}
                    </ReactMarkdown>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
