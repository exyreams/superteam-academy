'use client';

import { NavRail } from '@/components/layout/NavRail';
import { TopBar } from '@/components/layout/TopBar';
import { DotGrid } from '@/components/shared/DotGrid';
import { Button } from '@/components/ui/button';
import { UsersThreeIcon, CalendarBlankIcon, DiscordLogoIcon, ChatCircleTextIcon, ArrowRightIcon } from '@phosphor-icons/react';
import { mockEvents, mockDiscussions } from '@/lib/data/community';

export function CommunityView() {
  return (
    <div className="min-h-screen bg-bg-base relative">
      <DotGrid opacity={0.3} />

      <div className="grid grid-cols-1 lg:grid-cols-[60px_1fr] lg:grid-rows-[48px_1fr] min-h-screen relative z-10">
        {/* Top Bar */}
        <div className="col-span-1 lg:col-span-2">
          <TopBar />
        </div>

        {/* Nav Rail */}
        <NavRail />

        {/* Main Stage */}
        <main className="p-4 lg:p-8 flex flex-col gap-10 max-w-7xl mx-auto w-full">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-ink-secondary/20 dark:border-border pb-6">
            <div>
              <span className="bg-ink-primary text-bg-base px-2 py-1 text-[10px] uppercase tracking-widest inline-block mb-2">
                Network
              </span>
              <h1 className="font-display text-4xl lg:text-5xl leading-none -tracking-wider">
                COMMUNITY HUB
              </h1>
              <p className="text-ink-secondary mt-2 max-w-xl text-sm">
                Connect with other builders, attend exclusive events, and get help from experts.
              </p>
            </div>
            <Button className="bg-[#5865F2] hover:bg-[#4752C4] text-white rounded-none uppercase text-[11px] font-bold px-6 tracking-widest flex items-center gap-2 shrink-0">
              <DiscordLogoIcon weight="fill" className="w-4 h-4" />
              Join Discord
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column (2/3) */}
            <div className="lg:col-span-2 flex flex-col gap-8">
              
              {/* Discussions */}
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <ChatCircleTextIcon weight="duotone" className="w-5 h-5 text-ink-primary" />
                  <h2 className="font-bold uppercase tracking-widest text-[13px]">Active Transmissions</h2>
                </div>
                
                <div className="border border-ink-secondary/20 dark:border-border bg-surface/50 backdrop-blur-sm divide-y divide-ink-secondary/20 dark:divide-border">
                  {mockDiscussions.map(disc => (
                    <div key={disc.id} className="p-4 hover:bg-fg-base/5 transition-colors group cursor-pointer">
                      <div className="flex justify-between gap-4">
                        <div>
                          <span className="text-[10px] uppercase tracking-widest text-[#14F195] mb-1 block">
                            [{disc.category}]
                          </span>
                          <h3 className="font-bold group-hover:text-ink-primary transition-colors">{disc.title}</h3>
                          <p className="text-xs text-ink-secondary mt-1">Initiated by {disc.author}</p>
                        </div>
                        <div className="text-right shrink-0">
                          <div className="text-xs font-bold">{disc.replies} RESP</div>
                          <div className="text-[10px] text-ink-tertiary mt-1">{disc.lastActive}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="p-3 bg-fg-base/5 flex justify-center border-t border-ink-secondary/20 dark:border-border">
                    <Button variant="ghost" className="text-[11px] uppercase tracking-widest h-auto py-1 hover:text-ink-primary">
                      View All Threads <ArrowRightIcon className="w-3 h-3 ml-1" />
                    </Button>
                  </div>
                </div>
              </section>

              {/* Top Contributors */}
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <UsersThreeIcon weight="duotone" className="w-5 h-5 text-ink-primary" />
                  <h2 className="font-bold uppercase tracking-widest text-[13px]">Top Operatives This Week</h2>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                   {[1,2,3,4].map(i => (
                     <div key={i} className="border border-ink-secondary/20 dark:border-border bg-surface p-4 text-center">
                        <div className="w-12 h-12 bg-fg-base/10 mx-auto rounded-none mb-3 border border-border" />
                        <div className="font-bold text-sm">User_{100+i}</div>
                        <div className="text-[10px] text-[#14F195] uppercase tracking-widest mt-1">Helpful</div>
                     </div>
                   ))}
                </div>
              </section>

            </div>

            {/* Right Column (1/3) */}
            <div className="flex flex-col gap-8">
              
              {/* Events Radar */}
               <section>
                <div className="flex items-center gap-2 mb-4">
                  <CalendarBlankIcon weight="duotone" className="w-5 h-5 text-ink-primary" />
                  <h2 className="font-bold uppercase tracking-widest text-[13px]">Events Radar</h2>
                </div>

                <div className="space-y-4">
                  {mockEvents.map(event => (
                    <div key={event.id} className="border border-ink-secondary/20 dark:border-border bg-surface/50 p-4 border-l-2 border-l-[#9945FF]">
                        <div className="flex justify-between items-start mb-2">
                           <span className="text-[10px] uppercase tracking-widest text-ink-secondary">{event.type}</span>
                           <span className="text-[10px] font-bold bg-fg-base/10 px-1">{event.attendees} Attending</span>
                        </div>
                        <h3 className="font-bold mb-1 leading-tight">{event.title}</h3>
                        <div className="text-xs text-ink-secondary mb-3">{event.date} • {event.location}</div>
                        <Button variant="outline" className="w-full uppercase text-[10px] h-7 rounded-none tracking-widest">
                            RSVP
                        </Button>
                    </div>
                  ))}
                </div>
               </section>

            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
