import { Lesson } from '@/lib/data/lesson';
import { CodeEditor } from '@/components/lesson/CodeEditor';
import { LessonNavigation } from '@/components/lesson/LessonNavigation';
import { ModuleOverview } from '@/components/lesson/ModuleOverview';
import { NavRail } from '@/components/layout/NavRail';
import { TopBar } from '@/components/layout/TopBar';
import { ChallengeView } from '@/components/challenge/ChallengeView';
import { client } from '@/sanity/client';
import { PortableText } from '@portabletext/react';
import { notFound } from 'next/navigation';

export default async function LessonViewPage({ params }: { params: Promise<{ slug: string; id: string }> }) {
  const { id, slug } = await params;

  // 1. Fetch Course with modules and lessons to find current module/lesson and neighbors
  const courseQuery = `*[_type == "course" && slug.current == $slug][0] {
    _id,
    title,
    xp_per_lesson,
    modules[]->{
      _id,
      title,
      order,
      lessons[]->{
        _id,
        title,
        type,
        content
      }
    }
  }`;
  
  const course = await client.fetch(courseQuery, { slug });

  if (!course) {
    notFound();
  }

  // 2. Locate the specific lesson and its context
  let currentLesson = null;
  let prevLessonId = undefined;
  let nextLessonId = undefined;
  
  interface SanityLesson {
      _id: string;
      title: string;
      type: string;
      content: unknown;
  }
  
  interface SanityModule {
      _id: string;
      title: string;
      order: number;
      lessons: SanityLesson[];
  }
  
  const flatLessons: (SanityLesson & { moduleId: string, moduleTitle: string, moduleOrder: number })[] = [];
  
  if (course.modules) {
     course.modules.forEach((mod: SanityModule) => {
        if (mod.lessons) {
           mod.lessons.forEach((les: SanityLesson) => {
              flatLessons.push({
                 ...les,
                 moduleId: mod._id,
                 moduleTitle: mod.title,
                 moduleOrder: mod.order
              });
           });
        }
     });
  }

  const lessonIndex = flatLessons.findIndex(l => l._id === id);
  if (lessonIndex === -1) {
     notFound(); // Lesson not found in this course
  }

  currentLesson = flatLessons[lessonIndex];
  if (lessonIndex > 0) prevLessonId = flatLessons[lessonIndex - 1]._id;
  if (lessonIndex < flatLessons.length - 1) nextLessonId = flatLessons[lessonIndex + 1]._id;

  const moduleLessons = flatLessons
    .filter(l => l.moduleId === currentLesson.moduleId)
    .map((l, index) => ({
      id: l._id,
      title: l.title,
      number: `${currentLesson.moduleOrder}.${index + 1}`,
      completed: false, // We'll hook this up to on-chain state later
      locked: false,
      active: l._id === id 
    }));

  if (currentLesson.type === 'challenge') {
    // Map the Sanity Lesson loosely to the internal Lesson type for ChallengeView backwards compatibility
    const mappedLesson: Lesson = {
       id: currentLesson._id,
       moduleId: currentLesson.moduleId,
       moduleNumber: currentLesson.moduleOrder,
       moduleTitle: currentLesson.moduleTitle,
       title: currentLesson.title,
       number: `${currentLesson.moduleOrder}.${lessonIndex + 1}`,
       ref: currentLesson._id,
       type: 'challenge',
       duration: '00:00:00',
       content: currentLesson.content as unknown as string,
       completed: false,
       prevLessonId,
       nextLessonId,
    };
    
    return (
      <ChallengeView 
        lesson={mappedLesson} 
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
            moduleNumber={currentLesson.moduleOrder}
            moduleTitle={currentLesson.moduleTitle}
            lessons={moduleLessons}
            courseSlug={slug}
            />
        </div>

        {/* Main Content Area - Split View */}
        <main className="flex flex-col lg:grid lg:grid-cols-2 h-auto lg:h-full overflow-visible lg:overflow-hidden relative">
          {/* Resizer Divider */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-border z-10 cursor-col-resize" />

          {/* Left: Lesson Content */}
          <div className="overflow-visible lg:overflow-hidden flex flex-col h-auto lg:h-full">
            <div className="flex-1 px-4 lg:px-12 py-8 overflow-y-auto">
               <h1 className="text-3xl font-display font-bold mb-8 uppercase tracking-wider">{currentLesson.title}</h1>
               <div className="prose prose-invert prose-p:text-ink-secondary prose-a:text-[#14F195] max-w-none">
                 {currentLesson.content ? (
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    <PortableText value={currentLesson.content as any} />
                 ) : (
                    <p>No content provided for this lesson.</p>
                 )}
               </div>
            </div>
            <div className="px-4 lg:px-12 pb-12 pt-4 border-t border-border">
              <LessonNavigation
                courseSlug={slug}
                prevLessonId={prevLessonId}
                nextLessonId={nextLessonId}
              />
            </div>
          </div>

          {/* Right: Code Editor (Hidden for explicit reading lessons, or we can use generic template) */}
          <div className="overflow-hidden h-[500px] lg:h-auto border-t lg:border-t-0 border-border">
            <CodeEditor
              initialCode={`// Sandbox Environment\n\nconsole.log("Welcome to ${currentLesson.title}");`}
              solution={``}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
