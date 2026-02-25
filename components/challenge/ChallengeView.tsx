'use client';

import { useState } from 'react';
import { Lesson } from '@/lib/data/lesson';
import { TopBar } from '@/components/layout/TopBar';
import { ChallengeEditor } from './ChallengeEditor';
import { ChallengeSidebar } from './ChallengeSidebar';
import { Play as PlayIcon, ArrowsClockwise as RefreshCwIcon, Trophy as TrophyIcon } from '@phosphor-icons/react';
import { Button } from '@/components/ui/button';
import { NavRail } from '@/components/layout/NavRail';
import { useWallet } from "@solana/wallet-adapter-react";
import { toast } from "sonner";

interface ChallengeViewProps {
  lesson: Lesson;
  courseSlug: string;
}

export function ChallengeView({ lesson: initialLesson, courseSlug }: ChallengeViewProps) {
  const wallet = useWallet();
  const [lesson, setLesson] = useState(initialLesson);
  const [code, setCode] = useState(initialLesson.codeTemplate || '');
  const [isRunning, setIsRunning] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);

  /* 
   * Note: We rely on the parent component to remount ChallengeView (via key prop) when the lesson changes.
   * This avoids the need for a useEffect to reset state.
   */

  const handleRunTests = () => {
    setIsRunning(true);
    
    // Simulate test run
    setTimeout(() => {
      // Mock logic: If code contains "user_key", pass the test
      const passed = code.includes('user_key') && code.includes('vault');
      
      const newTestCases = lesson.testCases?.map(test => ({
        ...test,
        status: passed ? 'pass' : 'fail'
      })) || [];

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setLesson((prev: any) => ({
        ...prev,
        testCases: newTestCases,
        consoleOutput: passed 
          ? '> cargo test-bpf...\n> Compiling pda_module v0.1.0\n> Test result: ok. 3 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out'
          : '> cargo test-bpf...\n> Compiling pda_module v0.1.0\n> Error: assertion failed: `(left == right)`\n> left: `(Pubkey, u8)`\n> right: `()`'
      }));
      
      setIsRunning(false);
    }, 1500);
  };
  
  const handleReset = () => {
    setCode(initialLesson.codeTemplate || '');
    setLesson(initialLesson);
  };

  const handleComplete = async () => {
    if (!wallet.publicKey) {
      toast.error("Please connect your wallet to save progress.");
      return;
    }
    
    setIsCompleting(true);
    try {
      // 1. Send the completion request to the backend signer
      const res = await fetch('/api/lesson/complete', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({
             courseSlug: courseSlug,
             learnerAddress: wallet.publicKey.toBase58(),
             // For dynamic lookup we use the ordered index from earlier, but here we can mock lessonIndex temporarily 
             // Ideally this index is passed in as a prop from page.tsx 
             lessonIndex: 0 
         })
      });
      
      if (!res.ok) {
         const errorData = await res.json();
         throw new Error(errorData.error || "Failed to mark complete");
      }
      
      setShowSuccessToast(true);
      toast.success("Progress saved on-chain!");
    } catch (error) {
        console.error(error);
        toast.error(`Error saving progress: ${error instanceof Error ? error.message : "Unknown error"}`);
    } finally {
        setIsCompleting(false);
    }
  };

  return (
    <div className="flex h-auto min-h-screen lg:h-screen bg-bg-base font-mono text-ink-primary overflow-visible lg:overflow-hidden">
      {/* Grid Layout: NavRail (60px) | Main Stage (1fr) | Sidebar (400px) */}
      <div className="grid grid-cols-1 lg:grid-cols-[60px_1fr_400px] lg:grid-rows-[48px_1fr] h-auto min-h-screen lg:h-full w-full">
        
        {/* Top Bar (Header) - Spans all columns */}
        <div className="col-span-1 lg:col-span-3 pb-px bg-border/50"> {/* Replaced ChallengeHeader with TopBar */}
           <TopBar />
        </div>

        {/* Nav Rail */}
        <div className="hidden lg:block row-start-2 border-r border-border bg-bg-base">
          <NavRail />
        </div>

        {/* Main Stage (Middle Column) */}
        <div className="row-start-auto lg:row-start-2 flex flex-col min-w-0 border-r border-border bg-bg-base relative h-[600px] lg:h-full">
            {/* Challenge Meta */}
            <div className="p-6 bg-bg-surface border-b border-border">
              <span className="text-[10px] uppercase font-bold tracking-widest text-ink-secondary block mb-1">Challenge // Hard</span>
              <h1 className="font-display font-bold text-2xl lg:text-[24px] uppercase leading-none tracking-tight truncate">
                {lesson.title}
              </h1>
            </div>

            {/* Editor Container */}
            <div className="flex-1 relative min-h-0">
               <ChallengeEditor 
                 initialCode={code} 
                 onChange={setCode} 
                 fileName="src/lib.rs"
               />
            </div>

            {/* Control Bar */}
            <div className="h-14 bg-bg-base border-t border-border flex items-center justify-between px-6 z-10 relative shrink-0">
               <div className="text-[10px] uppercase tracking-widest text-ink-secondary">
                 Last Compiled: {isRunning ? 'Running...' : 'Just now'}
               </div>
               
               <div className="flex items-center gap-3">
                 <Button 
                   variant="outline" 
                   size="sm" 
                   onClick={handleReset}
                   className="h-8 text-[11px] font-mono uppercase tracking-wider border-ink-primary text-ink-primary hover:bg-ink-primary hover:text-bg-base transition-colors rounded-none"
                 >
                   <RefreshCwIcon className="w-3 h-3 mr-2" />
                   Reset Code
                 </Button>
                 
                 <Button 
                   size="sm" 
                   onClick={handleRunTests}
                   disabled={isRunning}
                   className="h-8 text-[11px] font-mono uppercase tracking-wider bg-ink-primary text-bg-base hover:bg-ink-primary/90 transition-colors rounded-none"
                 >
                   <PlayIcon className="w-3 h-3 mr-2" />
                   Run Tests
                 </Button>
               </div>
            </div>
        </div>

        {/* Sidebar (Right Column) */}
        <div className="row-start-auto lg:row-start-2 border-t lg:border-t-0 lg:border-l border-border bg-bg-base overflow-visible lg:overflow-hidden flex flex-col h-auto lg:h-full">
          <ChallengeSidebar 
            lesson={lesson} 
            onComplete={handleComplete}
            isRunningTests={isRunning || isCompleting}
          />
        </div>

      </div>

      {/* Success Toast */}
      {showSuccessToast && (
        <div className="fixed bottom-8 right-8 bg-ink-primary text-bg-base p-0 flex shadow-[8px_8px_0_rgba(0,0,0,0.1)] z-50 animate-in slide-in-from-bottom-10 fade-in duration-300">
           <div className="bg-[#2D5A27] p-4 flex items-center justify-center">
             <TrophyIcon className="w-6 h-6 text-white" />
           </div>
           <div className="px-6 py-3 min-w-[200px]">
             <div className="text-[10px] uppercase tracking-widest text-white/70">Achievement Unlocked</div>
             <div className="font-bold text-[14px] mt-1">SEED MASTER [+250 XP]</div>
           </div>
        </div>
      )}
    </div>
  );
}
