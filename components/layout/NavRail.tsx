'use client';

import { SquaresFourIcon, BookIcon, TrophyIcon, UsersIcon, GearIcon } from '@phosphor-icons/react';
import { Link } from '@/i18n/routing';
import { usePathname } from '@/i18n/routing';
import { cn } from '@/lib/utils';

export function NavRail() {
  const pathname = usePathname();

  const navItems = [
    { href: '/dashboard', icon: SquaresFourIcon, label: 'Dashboard' },
    { href: '/courses', icon: BookIcon, label: 'Courses' },
    { href: '/leaderboard', icon: TrophyIcon, label: 'Achievements' },
    { href: '/community', icon: UsersIcon, label: 'Community' },
  ];

  return (
    <aside className="border-r border-ink-secondary flex flex-col items-center pt-6 bg-bg-base gap-8 w-[60px]">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;
        
        return (
          <Link
            key={item.href}
            href={item.href}
            title={item.label}
            className={cn(
              'w-8 h-8 border border-transparent flex items-center justify-center cursor-pointer relative transition-all',
              isActive
                ? 'border-ink-primary text-ink-primary bg-[rgba(13,20,18,0.05)]'
                : 'text-ink-secondary hover:border-ink-primary hover:text-ink-primary hover:bg-[rgba(13,20,18,0.05)]'
            )}
          >
            <Icon size={18} weight={isActive ? 'fill' : 'regular'} />
            {isActive && (
              <div className="absolute -right-px -top-px w-1 h-1 bg-ink-primary" />
            )}
          </Link>
        );
      })}

      {/* Settings at bottom */}
      <Link
        href="/settings"
        title="Settings"
        className={cn(
          'w-8 h-8 border border-transparent flex items-center justify-center cursor-pointer relative transition-all mt-auto mb-6',
          pathname === '/settings'
            ? 'border-ink-primary text-ink-primary bg-[rgba(13,20,18,0.05)]'
            : 'text-ink-secondary hover:border-ink-primary hover:text-ink-primary hover:bg-[rgba(13,20,18,0.05)]'
        )}
      >
        <GearIcon size={18} />
      </Link>
    </aside>
  );
}
