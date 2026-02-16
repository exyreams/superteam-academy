import { mockModuleLessons, getLesson } from '@/lib/data/lesson';
import { LessonContent } from '@/components/lesson/LessonContent';
import { CodeEditor } from '@/components/lesson/CodeEditor';
import { LessonNavigation } from '@/components/lesson/LessonNavigation';
import { ModuleOverview } from '@/components/lesson/ModuleOverview';
import { NavRail } from '@/components/layout/NavRail';
import { TopBar } from '@/components/layout/TopBar';
import { ChallengeView } from '@/components/challenge/ChallengeView';

export default async function LessonViewPage({ params }: { params: Promise<{ slug: string; id: string }> }) {
  const { id, slug } = await params;
  const lesson = getLesson(id);
  const moduleLessons = mockModuleLessons;

  if (lesson.type === 'challenge') {
    return (
      <ChallengeView 
        lesson={lesson} 
        courseSlug={slug || 'solana-fundamentals'} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-bg-base">
      {/* App Shell Grid */}
      <div className="grid grid-cols-[60px_280px_1fr] grid-rows-[48px_1fr] h-screen max-w-full">
        {/* Top Bar - spans all columns */}
        <div className="col-span-3">
          <TopBar />
        </div>

        {/* Nav Rail */}
        <NavRail />

        {/* Module Sidebar */}
        <ModuleOverview
          moduleNumber={lesson.moduleNumber}
          moduleTitle={lesson.moduleTitle}
          lessons={moduleLessons}
          courseSlug={slug || 'solana-fundamentals'}
        />

        {/* Main Content Area - Split View */}
        <main className="grid grid-cols-2 h-full overflow-hidden relative">
          {/* Resizer Divider */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-ink-secondary z-10 cursor-col-resize" />

          {/* Left: Lesson Content */}
          <div className="overflow-hidden flex flex-col">
            <div className="flex-1 overflow-y-auto">
              <LessonContent
                reference={lesson.ref}
                title={lesson.title}
                content={lesson.content}
                hints={lesson.hints}
              />
              <div className="px-12 pb-12">
                <LessonNavigation
                  courseSlug={slug || 'solana-fundamentals'}
                  prevLessonId={lesson.prevLessonId}
                  nextLessonId={lesson.nextLessonId}
                  nextLessonType={lesson.nextLessonId ? getLesson(lesson.nextLessonId)?.type : undefined}
                />
              </div>
            </div>
          </div>

          {/* Right: Code Editor */}
          <div className="overflow-hidden">
            <CodeEditor
              initialCode={lesson.codeTemplate}
              solution={lesson.solution}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
