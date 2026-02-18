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
        <User
          size={18}
          className="text-ink-primary"
          weight={pathname?.includes('/profile') ? "duotone" : "regular"}
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
        <Gear
          size={18}
          className="text-ink-primary"
          weight={pathname === '/settings' ? "duotone" : "regular"}
        />
      </Link>
    </aside>
  );
}
