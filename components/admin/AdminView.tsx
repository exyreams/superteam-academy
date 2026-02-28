'use client';

import { useEffect, useState } from 'react';
import { NavRail } from '@/components/layout/NavRail';
import { TopBar } from '@/components/layout/TopBar';
import { DotGrid } from '@/components/shared/DotGrid';
import { mockAdminStats, mockActionLogs, mockMinters } from '@/lib/data/admin';
import { UsersIcon, ChartBarIcon, CoinsIcon, CheckCircleIcon, ShieldWarningIcon, ClockIcon, KeyIcon, ShieldCheckIcon, ShieldIcon, Icon, BookOpenIcon, PaperPlaneRightIcon } from '@phosphor-icons/react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { client, PENDING_REVIEW_COURSES_QUERY } from '@/sanity/client';
import { toast } from 'sonner';

interface PendingCourse {
  _id: string;
  title: string;
  slug: string;
  difficulty: number;
  xp_per_lesson: number;
  moduleCount: number;
  creatorWallet?: string;
  _updatedAt: string;
}

export function AdminView() {
  const [pendingCourses, setPendingCourses] = useState<PendingCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [publishing, setPublishing] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPending() {
      try {
        const data = await client.fetch(PENDING_REVIEW_COURSES_QUERY);
        setPendingCourses(data);
      } catch (e) {
        console.error("Error fetching pending courses", e);
      } finally {
        setLoading(false);
      }
    }
    fetchPending();
  }, []);

  const handleApprove = async (course: PendingCourse) => {
    if (!course.creatorWallet) {
      toast.error("Error: Course is missing creator wallet address");
      return;
    }

    setPublishing(course._id);
    toast("Approving course, please wait...");
    
    try {
      const response = await fetch('/api/course/publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          courseSlug: course.slug,
          courseId: course._id, // Will use this to update Sanity status
          creatorAddress: course.creatorWallet
        }),
      });

      if (response.ok) {
        setPendingCourses(prev => prev.filter(c => c._id !== course._id));
        toast.success("Course approved and published!");
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || "Failed to publish course");
      }
    } catch (error) {
       console.error("Error publishing course", error);
       toast.error("Failed to publish course");
    } finally {
      setPublishing(null);
    }
  };

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
              <span className="bg-[#9945FF] text-white px-2 py-1 text-[10px] uppercase tracking-widest inline-block mb-2 font-bold">
                Admin Privileges
              </span>
              <h1 className="font-display text-4xl lg:text-5xl leading-none -tracking-wider text-ink-primary">
                COMMAND CENTER
              </h1>
              <p className="text-ink-secondary mt-2 max-w-xl text-sm">
                System overview and platform governance controls.
              </p>
            </div>
            
            <div className="flex items-center gap-3 border border-border bg-surface px-4 py-2">
               <ShieldCheckIcon weight="duotone" className="w-5 h-5 text-[#14F195]" />
               <div className="text-xs">
                 <div className="text-ink-secondary text-[10px] uppercase tracking-widest">Active Authority</div>
                 <div className="font-mono font-bold">ACAd...hgqY</div>
               </div>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatBox icon={UsersIcon} label="Total Operatives" value={mockAdminStats.totalUsers.toLocaleString()} />
            <StatBox icon={ChartBarIcon} label="Active Enrollments" value={mockAdminStats.activeEnrollments.toLocaleString()} />
            <StatBox icon={CoinsIcon} label="XP Minted" value={mockAdminStats.xpMinted.toLocaleString()} />
            <StatBox icon={CheckCircleIcon} label="Completion Rate" value={`${mockAdminStats.completionRate}%`} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
             {/* Left Column */}
             <div className="lg:col-span-2 flex flex-col gap-10">
                {/* Course Review Queue */}
                <div>
                   <h2 className="font-display text-xl uppercase tracking-widest text-ink-primary border-b border-border pb-2 mb-4 flex items-center gap-2">
                     <BookOpenIcon weight="duotone" className="text-[#9945FF]" />
                     Review Queue
                   </h2>
                   
                   {loading ? (
                     <div className="p-8 text-center border border-border bg-surface/50">
                       <p className="text-ink-secondary text-sm">Loading pending courses...</p>
                     </div>
                   ) : pendingCourses.length === 0 ? (
                     <div className="p-8 text-center border border-border bg-surface/50">
                       <p className="text-ink-secondary text-sm">No courses currently pending review.</p>
                     </div>
                   ) : (
                     <div className="space-y-4">
                       {pendingCourses.map(course => (
                         <div key={course._id} className="border border-border bg-surface/80 p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-ink-secondary/30 transition-colors">
                           <div>
                             <h3 className="font-bold text-lg text-ink-primary">{course.title}</h3>
                             <p className="text-sm font-mono text-ink-secondary mb-2">/{course.slug}</p>
                             <div className="flex items-center gap-4 text-xs text-ink-tertiary">
                               <span>Difficulty: {course.difficulty}</span>
                               <span>Modules: {course.moduleCount}</span>
                               <span>{course.xp_per_lesson} XP / lesson</span>
                             </div>
                           </div>
                           <Button 
                             onClick={() => handleApprove(course)}
                             disabled={publishing === course._id}
                             className="shrink-0 bg-[#9945FF] hover:bg-[#9945FF]/90 text-white border-none rounded-none w-full md:w-auto font-bold uppercase tracking-widest text-xs h-10 px-6 flex items-center gap-2"
                           >
                             {publishing === course._id ? 'Publishing...' : 'Approve & Publish'}
                             {!publishing && <PaperPlaneRightIcon weight="fill" />}
                           </Button>
                         </div>
                       ))}
                     </div>
                   )}
                </div>

                {/* System Logs */}
                <div>
                   <h2 className="font-display text-xl uppercase tracking-widest text-ink-primary border-b border-border pb-2 mb-4">
                     System Logs
                   </h2>
                   
                   <div className="border border-border bg-surface/50 divide-y divide-border font-mono text-sm shadow-sm backdrop-blur-sm">
                      {mockActionLogs.map(log => (
                        <div key={log.id} className="p-3 flex items-start gap-4 hover:bg-fg-base/5 transition-colors">
                           <div className="pt-1">
                             {log.status === 'SUCCESS' && <CheckCircleIcon className="w-4 h-4 text-[#14F195]" />}
                             {log.status === 'FAILED' && <ShieldWarningIcon className="w-4 h-4 text-[#F92424]" />}
                             {log.status === 'PENDING' && <ClockIcon className="w-4 h-4 text-[#FFB020]" />}
                           </div>
                           <div className="flex-1">
                             <div className="flex justify-between items-center mb-1">
                                <span className={cn(
                                  "font-bold uppercase text-xs tracking-wider",
                                  log.status === 'FAILED' ? 'text-[#F92424]' : 'text-ink-primary'
                                )}>
                                  {log.action}
                                </span>
                                <span className="text-[10px] text-ink-tertiary">{log.timestamp}</span>
                             </div>
                             <div className="text-ink-secondary text-xs">Wallet: {log.wallet}</div>
                             {log.details && <div className="text-ink-tertiary text-xs mt-1 border-l border-border pl-2 border-l-ink-secondary/50">{log.details}</div>}
                           </div>
                        </div>
                      ))}
                      <div className="p-2 text-center border-t border-border">
                         <Button variant="ghost" className="text-xs uppercase hover:text-ink-primary h-auto py-1">View Full Log</Button>
                      </div>
                   </div>
                </div>
             </div>

             {/* Sidebar Controls */}
             <div className="flex flex-col gap-6">
                 <div>
                   <h2 className="font-display text-xl uppercase tracking-widest text-ink-primary border-b border-border pb-2 mb-4">
                     Minter Roles
                   </h2>
                   
                   <div className="space-y-3">
                      {mockMinters.map(minter => (
                         <div key={minter.pubkey} className={cn(
                           "border border-border bg-surface p-3",
                           !minter.isActive && "opacity-50"
                         )}>
                            <div className="flex justify-between items-center mb-2">
                               <div className="flex items-center gap-2">
                                  <KeyIcon className={cn("w-4 h-4", minter.isActive ? "text-[#14F195]" : "text-ink-secondary")} weight="fill" />
                                  <span className="font-bold text-xs uppercase">{minter.label}</span>
                               </div>
                               {!minter.isActive && <span className="text-[9px] uppercase tracking-widest text-[#F92424] bg-[#F92424]/10 px-1">Revoked</span>}
                            </div>
                            <div className="text-[10px] font-mono text-ink-secondary break-all mb-2">{minter.pubkey}</div>
                            <div className="text-xs text-ink-tertiary">Total Minted: <span className="text-ink-primary font-bold">{minter.totalXpMinted.toLocaleString()} XP</span></div>
                         </div>
                      ))}
                      <Button variant="outline" className="w-full text-xs uppercase rounded-none mt-2 border-dashed">
                        + Register New Minter
                      </Button>
                   </div>
                 </div>

                 <div className="border border-[#F92424]/30 bg-[#F92424]/5 p-4 relative overflow-hidden">
                    <ShieldIcon className="absolute -right-4 -bottom-4 w-24 h-24 text-[#F92424]/10" weight="fill" />
                    <h3 className="text-[#F92424] font-bold uppercase tracking-widest text-xs mb-2 relative z-10 flex items-center gap-2">
                       <ShieldWarningIcon className="w-4 h-4" /> Danger Zone
                    </h3>
                    <p className="text-xs text-ink-secondary mb-4 relative z-10">
                      Emergency controls require multi-sig approval.
                    </p>
                    <Button variant="outline" className="w-full text-xs uppercase text-[#F92424] border-[#F92424]/30 hover:bg-[#F92424] hover:text-white rounded-none relative z-10">
                       Pause Program
                    </Button>
                 </div>
             </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function StatBox({ icon: Icon, label, value }: { icon: Icon, label: string, value: string }) {
  return (
    <div className="border border-border bg-surface/50 p-4 transition-all hover:border-ink-secondary/30">
      <div className="flex items-center gap-2 mb-2 text-ink-secondary">
        <Icon className="w-4 h-4" weight="duotone" />
        <span className="text-[10px] uppercase tracking-widest font-bold">{label}</span>
      </div>
      <div className="font-display text-2xl lg:text-3xl text-ink-primary">{value}</div>
    </div>
  )
}
