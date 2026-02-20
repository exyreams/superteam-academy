export interface CommunityEvent {
  id: string;
  title: string;
  date: string; // ISO string or human readable
  type: 'IRL' | 'ONLINE';
  location: string;
  attendees: number;
}

export interface DiscussionThread {
  id: string;
  title: string;
  author: string;
  replies: number;
  lastActive: string;
  category: string;
}

export const mockEvents: CommunityEvent[] = [
  {
    id: 'ev-1',
    title: 'Solana Hacker House: Mumbai',
    date: 'Oct 15 - 18, 2026',
    type: 'IRL',
    location: 'Mumbai, India',
    attendees: 420,
  },
  {
    id: 'ev-2',
    title: 'Anchor 0.30 Deep Dive',
    date: 'Next Tuesday, 18:00 UTC',
    type: 'ONLINE',
    location: 'Discord Stage',
    attendees: 156,
  },
  {
    id: 'ev-3',
    title: 'Superteam UK Meetup',
    date: 'Nov 5, 2026',
    type: 'IRL',
    location: 'London, UK',
    attendees: 85,
  }
];

export const mockDiscussions: DiscussionThread[] = [
  {
    id: 'disc-1',
    title: 'How to handle PDA collisions dynamically?',
    author: '0xKONRAD',
    replies: 12,
    lastActive: '2h ago',
    category: 'Architecture',
  },
  {
    id: 'disc-2',
    title: 'Metaplex Core vs Token-2022 for XP?',
    author: 'sol_dev_99',
    replies: 45,
    lastActive: '5m ago',
    category: 'Discussion',
  },
  {
    id: 'disc-3',
    title: 'Looking for teammates for the next hackathon',
    author: 'builder_jo',
    replies: 3,
    lastActive: '1d ago',
    category: 'Networking',
  }
];
