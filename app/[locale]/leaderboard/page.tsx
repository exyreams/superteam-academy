import { LeaderboardView } from '@/components/leaderboard/LeaderboardView';
import { getLeaderboard, getUserStanding } from '@/lib/data/leaderboard';

export default function LeaderboardPage() {
  const entries = getLeaderboard();
  const userStanding = getUserStanding();

  return (
    <LeaderboardView
      initialEntries={entries}
      userStanding={userStanding}
    />
  );
}
