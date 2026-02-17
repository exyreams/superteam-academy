'use client';

import { Link, usePathname } from '@/i18n/routing';
import { SquaresFour, Book, Trophy, Users, Gear, User } from '@phosphor-icons/react';
import { cn } from '@/lib/utils';

export function NavRail() {
  const pathname = usePathname();

  const navItems = [
    { icon: SquaresFour, label: 'Dashboard', href: '/dashboard', active: pathname === '/dashboard' },
    { icon: Book, label: 'Courses', href: '/courses', active: pathname?.includes('/courses') },
    { icon: Trophy, label: 'Leaderboard', href: '/leaderboard', active: pathname === '/leaderboard' },
    { icon: Users, label: 'Community', href: '/community', active: pathname === '/community' },
  ];

  return (
    <aside className="border-r border-border flex flex-col items-center pt-6 bg-bg-base gap-8">
      {/* Navigation Items */}
      <div className="flex flex-col gap-8">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                'w-8 h-8 border border-transparent flex items-center justify-center relative transition-all hover:border-ink-primary hover:bg-[rgba(13,20,18,0.05)]',
                item.active && 'border-ink-primary bg-[rgba(13,20,18,0.05)]'
              )}
              title={item.label}
            >
              <Icon
                size={18}
                className="text-ink-primary"
                weight={item.active ? 'fill' : 'regular'}
              />
              {item.active && (
                <div className="absolute -right-px -top-px w-1 h-1 bg-ink-primary" />
              )}
            </Link>
          );
        })}
      </div>

      {/* Profile Icon - above settings */}
      <Link
        href="/profile"
        className={cn(
          'w-8 h-8 border border-transparent flex items-center justify-center relative transition-all hover:border-ink-primary hover:bg-[rgba(13,20,18,0.05)] mt-auto',
          pathname?.includes('/profile') && 'border-ink-primary bg-[rgba(13,20,18,0.05)]'
        )}
        title="Profile"
      >
        <User
          size={18}
          className="text-ink-primary"
          weight={pathname?.includes('/profile') ? 'fill' : 'regular'}
        />
        {pathname?.includes('/profile') && (
          <div className="absolute -right-px -top-px w-1 h-1 bg-ink-primary" />
        )}
      </Link>

      {/* Settings at bottom */}
      <Link
        href="/settings"
        className={cn(
          'w-8 h-8 border border-transparent flex items-center justify-center relative transition-all hover:border-ink-primary hover:bg-[rgba(13,20,18,0.05)] mb-6',
          pathname === '/settings' && 'border-ink-primary bg-[rgba(13,20,18,0.05)]'
        )}
        title="Settings"
      >
        <Gear
          size={18}
          className="text-ink-primary"
          weight={pathname === '/settings' ? 'fill' : 'regular'}
        />
        {pathname === '/settings' && (
          <div className="absolute -right-px -top-px w-1 h-1 bg-ink-primary" />
        )}
      </Link>
    </aside>
  );
}
