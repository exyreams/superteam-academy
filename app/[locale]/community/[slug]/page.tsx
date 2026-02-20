import { TopicView } from '@/components/community/TopicView';
import { mockDiscussions } from '@/lib/data/community';
import { notFound } from 'next/navigation';

export default async function TopicPage({ params }: { params: Promise<{ slug: string, locale: string }> }) {
  const resolvedParams = await params;
  const topic = mockDiscussions.find((d) => d.slug === resolvedParams.slug);

  if (!topic) {
    notFound();
  }

  return <TopicView topic={topic} />;
}
