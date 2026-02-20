'use client';

import { NavRail } from '@/components/layout/NavRail';
import { TopBar } from '@/components/layout/TopBar';
import { DotGrid } from '@/components/shared/DotGrid';
import { mockCreatorCourses } from '@/lib/data/creator';
import { PlusIcon, ChalkboardTeacherIcon, GearIcon, PencilSimpleIcon, EyeIcon, UploadSimpleIcon } from '@phosphor-icons/react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export function CreatorView() {
  return (
    <div className="min-h-screen bg-bg-base relative">
      <DotGrid opacity={0.3} />

      <div className="grid grid-cols-1 lg:grid-cols-[60px_1fr] lg:grid-rows-[48px_1fr] min-h-screen relative z-10">
        <div className="col-span-1 lg:col-span-2">
          <TopBar />
        </div>

        <NavRail />

        <main className="p-4 lg:p-8 flex flex-col gap-10 max-w-7xl mx-auto w-full">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-ink-secondary/20 dark:border-border pb-6">
            <div>
              <span className="bg-[#14F195] text-bg-base px-2 py-1 text-[10px] uppercase tracking-widest inline-block mb-2 font-bold">
                Instructor Console
              </span>
              <h1 className="font-display text-4xl lg:text-5xl leading-none -tracking-wider text-ink-primary">
                CONTENT STUDIO
              </h1>
              <p className="text-ink-secondary mt-2 max-w-xl text-sm">
                Create courses, build challenges, and publish content to Arweave.
              </p>
            </div>
            
            <Button className="bg-ink-primary hover:bg-ink-primary/90 text-bg-base font-bold uppercase tracking-widest rounded-none flex items-center gap-2">
               <PlusIcon weight="bold" />
               New Module
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
             
             {/* Main Content Area */}
             <div className="lg:col-span-3 flex flex-col gap-6">
                 <div className="flex items-center justify-between mb-2">
                     <h2 className="font-display text-xl uppercase tracking-widest text-ink-primary flex items-center gap-2">
                        <ChalkboardTeacherIcon weight="duotone" className="w-6 h-6" /> My Courses
                     </h2>
                 </div>

                 <div className="space-y-4">
                     {mockCreatorCourses.map(course => (
                         <div key={course.id} className="border border-border bg-surface/50 p-4 transition-colors hover:border-ink-secondary/50 group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <div className="flex-1">
                               <div className="flex items-center gap-3 mb-1">
                                  <h3 className="font-bold text-lg">{course.title}</h3>
                                  <span className={cn(
                                     "text-[10px] uppercase tracking-widest px-2 py-0.5",
                                     course.status === 'ACTIVE' ? "bg-[#14F195]/10 text-[#14F195]" : 
                                     course.status === 'ARCHIVED' ? "bg-ink-secondary/10 text-ink-secondary" :
                                     "bg-[#FFB020]/10 text-[#FFB020]"
                                  )}>
                                     {course.status}
                                  </span>
                               </div>
                               <div className="flex items-center gap-4 text-xs text-ink-secondary">
                                  <span>{course.modules} Modules</span>
                                  <span className="w-1 h-1 bg-border rounded-full" />
                                  <span>{course.enrolledCount.toLocaleString()} Enrolled</span>
                                  <span className="w-1 h-1 bg-border rounded-full" />
                                  <span>Earns {course.xpReward} XP</span>
                               </div>
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                               <Button variant="outline" size="icon" className="h-8 w-8 rounded-none border-border" title="Edit Content">
                                  <PencilSimpleIcon className="w-4 h-4 text-ink-secondary hover:text-ink-primary" />
                               </Button>
                               <Button variant="outline" size="icon" className="h-8 w-8 rounded-none border-border" title="Preview">
                                  <EyeIcon className="w-4 h-4 text-ink-secondary hover:text-ink-primary" />
                               </Button>
                               <Button variant="outline" size="icon" className="h-8 w-8 rounded-none border-border" title="Settings">
                                  <GearIcon className="w-4 h-4 text-ink-secondary hover:text-ink-primary" />
                               </Button>
                            </div>
                         </div>
                     ))}
                 </div>
             </div>

             {/* Sidebar Actions */}
             <div className="flex flex-col gap-6">
                 
                 <div className="border border-border bg-surface p-4">
                     <h3 className="font-bold uppercase tracking-widest text-[11px] mb-4 text-ink-secondary border-b border-border pb-2">Creator Hub</h3>
                     <div className="space-y-3">
                         <Button variant="ghost" className="w-full justify-start text-xs rounded-none h-8 px-2 hover:bg-fg-base/5">
                            <UploadSimpleIcon className="w-4 h-4 mr-2" /> Asset Library
                         </Button>
                         <Button variant="ghost" className="w-full justify-start text-xs rounded-none h-8 px-2 hover:bg-fg-base/5">
                            <GearIcon className="w-4 h-4 mr-2" /> Publisher Settings
                         </Button>
                     </div>
                 </div>

                 <div className="border border-[#9945FF]/30 bg-[#9945FF]/5 p-4">
                     <h3 className="font-bold uppercase tracking-widest text-[#9945FF] text-[11px] mb-2">Notice</h3>
                     <p className="text-xs text-ink-secondary leading-relaxed">
                        To publish a course on-chain, your wallet must hold the `CREATOR` Role NFT issued by the Multisig Authority.
                     </p>
                 </div>
                 
             </div>

          </div>
        </main>
      </div>
    </div>
  );
}
