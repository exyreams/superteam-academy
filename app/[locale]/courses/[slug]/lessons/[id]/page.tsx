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
      <div className="grid grid-cols-1 lg:grid-cols-[60px_280px_1fr] lg:grid-rows-[48px_1fr] min-h-screen lg:h-screen lg:overflow-hidden max-w-full">
        {/* Top Bar - spans all columns */}
        <div className="col-span-1 lg:col-span-3">
          <TopBar />
        </div>

        {/* Nav Rail */}
        <NavRail />

        {/* Module Sidebar */}
        <div className="hidden lg:block h-full overflow-hidden border-r border-border bg-bg-base">
            <ModuleOverview
            moduleNumber={lesson.moduleNumber}
            moduleTitle={lesson.moduleTitle}
            lessons={moduleLessons}
            courseSlug={slug || 'solana-fundamentals'}
            />
        </div>

        {/* Main Content Area - Split View */}
        <main className="flex flex-col lg:grid lg:grid-cols-2 h-auto lg:h-full overflow-visible lg:overflow-hidden relative">
          {/* Resizer Divider */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-border z-10 cursor-col-resize" />

          {/* Left: Lesson Content */}
          <div className="overflow-visible lg:overflow-hidden flex flex-col h-auto lg:h-full">
            <div className="flex-1 overflow-visible lg:overflow-y-auto">
              <LessonContent
                reference={lesson.ref}
                title={lesson.title}
                content={lesson.content}
                hints={lesson.hints}
              />
              <div className="px-4 lg:px-12 pb-12">
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
          <div className="overflow-hidden h-[500px] lg:h-auto border-t lg:border-t-0 border-border">
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
