'use client';

import { Link, usePathname } from '@/i18n/routing';
import { SquaresFourIcon, BookIcon, TrophyIcon, UsersIcon, GearIcon, UserIcon, ShieldCheckIcon, ChalkboardTeacherIcon } from '@phosphor-icons/react';
import { cn } from '@/lib/utils';

export function NavRail() {
  const pathname = usePathname();

  const navItems = [
    { icon: SquaresFourIcon, label: 'Dashboard', href: '/dashboard', active: pathname === '/dashboard' },
    { icon: BookIcon, label: 'Courses', href: '/courses', active: pathname?.includes('/courses') },
    { icon: TrophyIcon, label: 'Leaderboard', href: '/leaderboard', active: pathname === '/leaderboard' },
    { icon: UsersIcon, label: 'Community', href: '/community', active: pathname === '/community' },
  ];

  return (
    <aside className="border-r border-ink-secondary/20 dark:border-border hidden lg:flex flex-col items-center pt-6 bg-bg-struct gap-5 sticky top-12 h-[calc(100vh-48px)]">
      {/* Navigation Items */}
      <div className="flex flex-col gap-5">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                'w-8 h-8 flex items-center justify-center relative transition-all border border-transparent hover:bg-ink-primary/5',
                item.active && 'border-ink-secondary/20 bg-ink-primary/5'
              )}
              title={item.label}
            >
              <Icon
                size={18}
                className="text-ink-primary"
                weight={item.active ? "duotone" : "regular"}
              />
            </Link>
          );
        })}
      </div>

      {/* Profile Icon - above settings */}
      <Link
        href="/profile"
        className={cn(
          'w-8 h-8 flex items-center justify-center relative transition-all border border-transparent hover:bg-ink-primary/5 mt-auto',
          pathname?.includes('/profile') && 'border-ink-secondary/20 bg-ink-primary/5'
        )}
        title="Profile"
      >
        <UserIcon
          size={18}
          className="text-ink-primary"
          weight={pathname?.includes('/profile') ? "duotone" : "regular"}
        />
      </Link>

      {/* Creator Icon */}
      <Link
        href="/creator"
        className={cn(
          'w-8 h-8 flex items-center justify-center relative transition-all border border-transparent hover:bg-ink-primary/5 mb-2',
          pathname === '/creator' && 'border-ink-secondary/20 bg-ink-primary/5'
        )}
        title="Creator Studio"
      >
        <ChalkboardTeacherIcon
          size={18}
          className="text-ink-primary"
          weight={pathname === '/creator' ? "duotone" : "regular"}
        />
      </Link>

      {/* Admin Icon - above settings */}
      <Link
        href="/admin"
        className={cn(
          'w-8 h-8 flex items-center justify-center relative transition-all border border-transparent hover:bg-ink-primary/5 mb-2',
          pathname === '/admin' && 'border-ink-secondary/20 bg-ink-primary/5'
        )}
        title="Admin Dashboard"
      >
        <ShieldCheckIcon
          size={18}
          className="text-ink-primary"
          weight={pathname === '/admin' ? "duotone" : "regular"}
        />
      </Link>

      {/* Settings at bottom */}
      <Link
        href="/settings"
        className={cn(
          'w-8 h-8 flex items-center justify-center relative transition-all border border-transparent hover:bg-ink-primary/5 mb-6',
          pathname === '/settings' && 'border-ink-secondary/20 bg-ink-primary/5'
        )}
        title="Settings"
      >
        <GearIcon
          size={18}
          className="text-ink-primary"
          weight={pathname === '/settings' ? "duotone" : "regular"}
        />
      </Link>
    </aside>
  );
}
